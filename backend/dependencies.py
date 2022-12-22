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

    await add_user_to_db(claims)
    return claims


async def add_user_to_db(claims):
    res = await db["users"].insert_one({
            "_id": claims["sub"],
            "email": claims["email"],
            "disabled": False,
            "creation_timestamp": claims["auth_time"],
        })
    print("res", res)
    # uid = claims["sub"]
    # # check if user exists in db
    # if (db["users"].find({"_id": uid}).count() > 0):
    #     print("user exists")
    # else:
    #     # if not, add user to db
    #     print("user does not exist")
    #     # add user to db
    #     db["users"].insert_one({
    #         "_id": claims["sub"],
    #         "email": claims["email"],
    #         "disabled": False,
    #         "creation_timestamp": claims["auth_time"],
    #     }, upsert=True)




def check_jwt(id_token):

    try:
        # response = cognito_client.get_user(AccessToken=id_token)
        # print(response)
        verified_claims = cognitojwt.decode(
            id_token,
            REGION,
            USERPOOL_ID,
            app_client_id=APP_CLIENT_ID,  # Optional
            testmode=True  # Disable token expiration check for testing purposes
        )
        return verified_claims
    except Exception as e:
        print("error validating token", e)
        return None