import os
from datetime import datetime, timedelta
from app.utils.email.send import send_password_reset_email
from app.dependencies import get_user_from_refresh_token
from app.dependencies import get_user_from_access_token
from dotenv import load_dotenv
from fastapi import APIRouter, Cookie, Depends, HTTPException, Request, Security
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
)
from app.models import User
from passlib.context import CryptContext
from app.utils.auth import Auth
from app.utils.database import db
from app.utils.google_auth import validate_token
from app.utils.validate_credentials import validate_email, validate_password

load_dotenv()

router = APIRouter()

auth_handler = Auth()
security = HTTPBearer()

FRONTEND_URL = os.getenv("FRONTEND_URL")
REFRESH_TOKEN_EXPIRE_DAYS = float(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if JWT_SECRET_KEY is None:
    # to generate a secret key use "openssl rand -hex 32"
    raise ValueError("JWT_SECRET not set")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@router.post("/signup")
async def signup(form_data: OAuth2PasswordRequestForm = Depends()):
    email, password = form_data.username, form_data.password

    # check to make sure email and password are valid
    password_validation = validate_password(password)
    hashed_password = auth_handler.encode_password(password)

    if password_validation != "success":
        raise HTTPException(
            status_code=400, detail="Invalid Password: " + password_validation
        )
    validate_email(email)

    # check to make sure email is not already in use
    user = await db["users"].find_one({"email": email})
    if user is not None:
        raise HTTPException(
            status_code=400, detail="Invalid Email: Email already in use"
        )

    # add new user to db
    new_user = await db["users"].insert_one(
        {"email": email, "hashed_password": hashed_password, "active": True}
    )

    # return tokens to autologin
    return grant_user_tokens(new_user.inserted_id)


def grant_user_tokens(user_id):
    access_token = auth_handler.encode_token(str(user_id))
    refresh_token = auth_handler.encode_refresh_token(str(user_id))

    # add refresh token to db
    db["refresh_tokens"].insert_one(
        {
            "token_id": refresh_token,
            "user_id": str(user_id),
            "expireAt": datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
        }
    )

    return {"access_token": access_token, "refresh_token": refresh_token}


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    email, password = form_data.username, form_data.password

    user = await db["users"].find_one({"email": email})
    if user == None:
        raise HTTPException(status_code=400, detail="Invalid Email and/or Password")
    if not auth_handler.verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid Email and/or Password")
    if user["active"] == False:
        raise HTTPException(status_code=400, detail="Account not activated")

    return grant_user_tokens(user["_id"])


@router.post("/authenticate_with_google")
async def authenticate_with_google(request: Request):
    # validate token
    # TODO: make model for input
    request = await request.json()
    token_info = validate_token(request["access_token"])
    email = token_info["email"]

    # check to make sure email is not already in use with non-google account
    user = await db["users"].find_one({"email": email, "account_type": "inhouse"})
    if user is not None:
        raise HTTPException(
            status_code=400, detail="Invalid Email: Email already in use"
        )

    # check to see if user already exists
    user = await db["users"].find_one(
        {"email": email, "account_type": "google", "google_id": token_info["sub"]}
    )
    if user is None:
        # add new user to db
        new_user = await db["users"].insert_one(
            {
                "email": email,
                "account_type": "google",
                "google_id": token_info["sub"],
                "active": True,
                "password_reset_token": None
            }
        )
        user = await db["users"].find_one(
            {"email": email, "account_type": "google", "google_id": token_info["sub"]}
        )

    return grant_user_tokens(user["_id"])


@router.post("/logout")
async def logout(user: get_user_from_refresh_token = Depends(), refresh_token: str = Cookie(None, alias="refresh_token_")):
    if refresh_token is None:
        raise HTTPException(status_code=400, detail="Invalid Refresh Token")
    if user is None:
        raise HTTPException(status_code=400, detail="Invalid Refresh Token")
    await db["refresh_tokens"].delete_one({"token_id": refresh_token})
    return {"message": "Logged out"}


@router.get("/refresh_token")
async def refresh_token(
    credentrials: HTTPAuthorizationCredentials = Security(security),
):
    refresh_token = credentrials.credentials

    # check if refresh token is in revoked tokens
    db_entry = await db["refresh_tokens"].find_one({"token_id": refresh_token})
    if db_entry is None:
        raise HTTPException(status_code=400, detail="Invalid Refresh Token")

    # Rotate refresh token
    await db["refresh_tokens"].delete_one({"token_id": refresh_token})
    refresh_token = auth_handler.encode_refresh_token(db_entry["user_id"])
    db["refresh_tokens"].insert_one(
        {
            "token_id": refresh_token,
            "user_id": db_entry["user_id"],
            "expireAt": datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS),
        }
    )
    new_token = auth_handler.refresh_token(refresh_token)
    return {"access_token": new_token, "refresh_token": refresh_token}


@router.post("/revoke_all_refresh_tokens")
async def revoke_all_refresh_tokens(
    credentials: HTTPAuthorizationCredentials = Security(security),
):
    token = credentials.credentials
    user_id = auth_handler.decode_token(token)
    await db["refresh_tokens"].delete_many({"user_id": user_id})
    return {"message": "All refresh tokens revoked"}


@router.post("/request_password_reset")
async def request_password_reset(params: Request):
    email = params.json()["email"]
    validate_email(email)
    user = await db["users"].find_one({"email": email})
    if user is None:
        return {"message": "If account exists email sent"}
    if user["account_type"] == "google":
        raise HTTPException(status_code=400, detail="Cannot reset password for google account")
    
    # generate password reset token
    password_reset_token = auth_handler.encode_password_reset_token(user["_id"])
    await db["users"].update_one({"_id": user["_id"]}, {"$set": {"password_reset_token": password_reset_token}})
    password_reset_link = f"{FRONTEND_URL}/reset-password?token={password_reset_token}"
    res = send_password_reset_email(email, password_reset_link)
    if res.status_code != "success":
        raise HTTPException(status_code=500, detail="Error sending email. Please contact support.")
    return {"message": "If account exists email sent"}

@router.post("/reset_password")
async def reset_password(params: Request):
    password_reset_token = params.json()["token"]
    password = params.json()["password"]
    user_id = auth_handler.decode_password_reset_token(password_reset_token)
    hashed_password = auth_handler.get_password_hash(password)
    await db["users"].update_one({"_id": user_id}, {"$set": {"hashed_password": hashed_password, "password_reset_token": None}})
    await db["refresh_tokens"].delete_many({"user_id": user_id})
    return {"message": "Password reset successful"}


@router.get("/secret")
def secret_data(user: User = Depends(get_user_from_access_token)):
    return {"email": user["email"]}


@router.get("/notsecret")
def not_secret_data():
    return "Not secret data"
