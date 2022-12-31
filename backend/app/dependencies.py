from fastapi import Request, HTTPException, status, Depends, Form
from fastapi import Cookie
from app.utils.auth import Auth
from app.utils.database import db
from bson.objectid import ObjectId
import os
import requests
from dotenv import load_dotenv

load_dotenv()

CAPTCHA_SECRET = os.getenv("CAPTCHA_SECRET")

auth_handler = Auth()


async def validate_captcha(request: Request):
    captcha_token = request.headers.get("Recaptcha-Token")
    url = f"https://www.google.com/recaptcha/api/siteverify?secret={CAPTCHA_SECRET}&response={captcha_token}"
    response = requests.post(url).json()
    if not response["success"] == True:
        raise HTTPException(status_code=400, detail="Invalid reCaptcha Token")
    return response


async def get_access_token(
    access_token_header_and_payload: str = Cookie(
        None, alias="access_token_header_and_payload"
    ),
    access_token_signature: str = Cookie(None, alias="access_token_signature"),
):
    if access_token_header_and_payload is None or access_token_signature is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization requred, no token provided",
        )
    access_token = access_token_header_and_payload + "." + access_token_signature
    return access_token


async def get_user_from_access_token(access_token: str = Depends(get_access_token)):
    user_id = auth_handler.decode_token(access_token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization requred",
        )
    user = await db["users"].find_one({"_id": ObjectId(user_id)})
    return user


async def get_refresh_token(
    refresh_token_header_and_payload: str = Cookie(
        None, alias="refresh_token_header_and_payload"
    ),
    refresh_token_signature: str = Cookie(None, alias="refresh_token_signature"),
):
    if refresh_token_header_and_payload is None or refresh_token_signature is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization requred, no token provided",
        )
    refresh_token = refresh_token_header_and_payload + "." + refresh_token_signature
    return refresh_token


async def get_user_from_refresh_token(refresh_token: str = Depends(get_refresh_token)):
    user_id = auth_handler.decode_refresh_token(refresh_token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization requred",
        )
    user = await db["users"].find_one({"_id": ObjectId(user_id)})
    return user
