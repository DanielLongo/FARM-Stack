import json
from typing import Union
from utils.auth import Auth
from utils.validate_credentials import validate_email, validate_password
from dependencies import authenticate_user
from fastapi import APIRouter
from fastapi import HTTPException, Security
from fastapi import Depends, FastAPI, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi.responses import Response, JSONResponse
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import time
from utils.database import db
load_dotenv()

router = APIRouter()

from models import Token, UserInDB, User, TokenData
from utils.email import send_password_reset_email

auth_handler = Auth()
security = HTTPBearer()

REFRESH_TOKEN_EXPIRE_DAYS = float(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))

JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if JWT_SECRET_KEY is None:
    # to generate a secret key use "openssl rand -hex 32"
    raise ValueError("JWT_SECRET not set")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def create_new_user():
    print("creating new user")
    pass

def delete_user(username, hashed_password):
    print("deleting user")
    pass

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

# def authenticate_user(fake_db, username: str, password: str):
#     user = get_user(fake_db, username)
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False
#     return user

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# @router.post("/token", response_model=Token)
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
#     user = authenticate_user(fake_users_db, form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user.username}, expires_delta=access_token_expires
#     )
#     return {"access_token": access_token, "token_type": "bearer"}


# @router.get("/me/")
# async def read_users_me(user_claims: dict = Depends(authenticate_user)):
#     print(user_claims)

#     return user_claims
# # async def read_users_me(current_user: User = Depends(get_current_active_user)):
# #     return current_user


# @router.get("/me/items/")
# async def read_own_items(current_user: User = Depends(get_current_active_user)):
#     return [{"item_id": "Foo", "owner": current_user.username}]

# @router.delete("/")
# async def delete_me(current_user: User = Depends(get_current_active_user)):
#     delete_user(current_user.username, current_user.hashed_password)
#     return {"message": "User deleted"}

# @router.post("/reset_password")
# def reset_password():
#     pass

@router.post("/signup")
async def signup(form_data: OAuth2PasswordRequestForm = Depends()):
    email, password = form_data.username, form_data.password

    # check to make sure email and password are valid
    password_validation = validate_password(password)
    hashed_password = get_password_hash(password)

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

    access_token = auth_handler.encode_token(str(user["_id"]))
    refresh_token = auth_handler.encode_refresh_token(str(user["_id"]))

    # add refresh token to db
    db["refresh_tokens"].insert_one(
        {
            "token_id": refresh_token,
            "user_id": str(user["_id"]),
            "expireAt": datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
        }
    )

    return {"access_token": access_token, "refresh_token": refresh_token}

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



