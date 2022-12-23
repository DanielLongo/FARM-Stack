import cognitojwt
import os
from dotenv import load_dotenv
from fastapi import Request, HTTPException, status
import boto3
from utils.database import db
load_dotenv()

REGION = os.getenv("REGION")
USERPOOL_ID = os.getenv("USERPOOL_ID")
APP_CLIENT_ID = os.getenv("APP_CLIENT_ID")

cognito_client = boto3.client('cognito-idp')

async def authenticate_user(request: Request):
    id_token = request.headers.get("Authorization")
    print("identity token: ", id_token)
    claims = check_jwt(id_token)
    print("CLAIMS",  claims)
    print(REGION, USERPOOL_ID, APP_CLIENT_ID)
    if claims is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization requred",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return claims