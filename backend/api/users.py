from backend.utils.google_auth import validate_token
from utils.auth import Auth
from utils.validate_credentials import validate_email, validate_password
from fastapi import APIRouter
from fastapi import HTTPException, Security
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
from utils.database import db
load_dotenv()

router = APIRouter()

auth_handler = Auth()
security = HTTPBearer()

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

    if (password_validation != "success"):
        raise HTTPException(status_code=400, detail="Invalid Password: " + password_validation)
    email_validation = validate_email(email)
    if (email_validation != "success"):
        raise HTTPException(status_code=400, detail="Invalid Email: " + email_validation)

    # check to make sure email is not already in use
    user = await db["users"].find_one({"email": email})
    if user is not None:
        raise HTTPException(status_code=400, detail="Invalid Email: Email already in use")

    # add new user to db
    new_user = await db["users"].insert_one({"email": email, "hashed_password": hashed_password, "active": True})

    # return tokens to autologin
    tokens = await login(form_data)
    return tokens
    
def grant_user_tokens(user_id):
    access_token = auth_handler.encode_token(str(user_id))
    refresh_token = auth_handler.encode_refresh_token(str(user_id))

    # add refresh token to db
    db["refresh_tokens"].insert_one(
        {
            "token_id": refresh_token,
            "user_id": str(user_id),
            "expireAt": datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
        }
    )

    return {"access_token": access_token, "refresh_token": refresh_token}

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    email, password = form_data.username, form_data.password

    user = await db["users"].find_one({"email": email})
    if (user == None):
        raise HTTPException(status_code=400, detail="Invalid Email and/or Password")
    if not auth_handler.verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid Email and/or Password")
    if (user["active"] == False):
        raise HTTPException(status_code=400, detail="Account not activated")

    return grant_user_tokens(user["_id"])

@router.post("/authenticate_with_google")
async def authenticate_with_google(token: str):
    # validate token
    token_info = validate_token(token)
    email = token_info["email"]

    # check to make sure email is not already in use with non-google account
    user = await db["users"].find_one({"email": email, "account_type": "inhouse"})
    if user is not None:
        raise HTTPException(status_code=400, detail="Invalid Email: Email already in use")
    
    # check to see if user already exists
    user = await db["users"].find_one({"email": email, "account_type": "google", "google_id": token_info["sub"]})
    if user is None:
        # add new user to db
        new_user = await db["users"].insert_one({"email": email, "account_type": "google", "google_id": token_info["sub"], "active": True})
        user = await db["users"].find_one({"email": email, "account_type": "google", "google_id": token_info["sub"]})
        
    return grant_user_tokens(user["_id"])

@router.post("/logout")
async def logout(credentrials: HTTPAuthorizationCredentials = Security(security)):
    refresh_token = credentrials.credentials
    db["refresh_tokens"].delete_one({"token_id": refresh_token})
    return {"message": "Logged out"}

@router.get("/refresh_token")
async def refresh_token(credentrials: HTTPAuthorizationCredentials = Security(security)):
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
            "expireAt": datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
        }
    )
    new_token = auth_handler.refresh_token(refresh_token)
    return {'access_token': new_token, 'refresh_token': refresh_token}


@router.post("/revoke_all_refresh_tokens")
async def revoke_all_refresh_tokens(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    user_id = auth_handler.decode_token(token)
    await db["refresh_tokens"].delete_many({"user_id": user_id})
    return {'message': 'All refresh tokens revoked'}


@router.get('/secret')
def secret_data(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    if(auth_handler.decode_token(token)):
        return 'Top Secret data only authorized users can access this info'

@router.get('/notsecret')
def not_secret_data():
    return 'Not secret data'



