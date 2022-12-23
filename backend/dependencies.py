from fastapi import Request, HTTPException, status
from fastapi import Cookie
from utils.auth import Auth
from utils.database import db
from bson.objectid import ObjectId

auth_handler = Auth()

async def get_user(access_token: str = Cookie(None, alias="access_token_")):
    if access_token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization requred",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user_id = auth_handler.decode_token(access_token)
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization requred",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = await db["users"].find_one({"_id": ObjectId(user_id)})
    return user