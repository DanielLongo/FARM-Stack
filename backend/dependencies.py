import cognitojwt
import os
from dotenv import load_dotenv
from fastapi import Request, HTTPException, status
load_dotenv()

REGION = os.getenv("REGION")
USERPOOL_ID = os.getenv("USERPOOL_ID")
APP_CLIENT_ID = os.getenv("APP_CLIENT_ID")


def authenticate_user(request: Request):
    id_token = request.headers.get("Authorization")
    print("identity token: ", id_token)
    claims = check_jwt(id_token)
    print(REGION, USERPOOL_ID, APP_CLIENT_ID)
    if claims is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization requred",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return claims

def check_jwt(id_token):
    try:
        verified_claims = cognitojwt.decode(
            id_token,
            REGION,
            USERPOOL_ID,
            app_client_id=APP_CLIENT_ID,  # Optional
            testmode=True  # Disable token expiration check for testing purposes
        )
        return verified_claims
    except:
        return None