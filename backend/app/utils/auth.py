import os
from datetime import datetime, timedelta

from dotenv import load_dotenv
from fastapi import HTTPException
from jose import JWTError, jwt
from passlib.context import CryptContext

load_dotenv()


class Auth:
    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        self.secret = os.getenv("JWT_SECRET_KEY")
        self.access_token_expire_minutes = float(
            os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
        )
        self.refresh_token_expire_days = float(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS"))

    def encode_password(self, password):
        return self.pwd_context.hash(password)

    def verify_password(self, password, hash_password):
        return self.pwd_context.verify(password, hash_password)

    def encode_token(self, username, role=None):
        payload = {
            "exp": (
                datetime.utcnow()
                + timedelta(days=0, minutes=self.access_token_expire_minutes)
            ).timestamp(),
            "iat": datetime.utcnow().timestamp(),
            "scope": "access_token",
            "sub": username,
            "role": role,
        }
        return jwt.encode(payload, self.secret, algorithm="HS256")

    def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.secret, algorithms=["HS256"])
            if payload["scope"] == "access_token":
                return payload["sub"]
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
        raise HTTPException(status_code=401, detail="Invalid token")

    def encode_refresh_token(self, username):
        payload = {
            "exp": datetime.utcnow()
            + timedelta(days=self.refresh_token_expire_days, hours=0),
            "iat": datetime.utcnow(),
            "scope": "refresh_token",
            "sub": username,
        }
        return jwt.encode(payload, self.secret, algorithm="HS256")

    def decode_refresh_token(self, refresh_token):
        try:
            payload = jwt.decode(refresh_token, self.secret, algorithms=["HS256"])
            if payload["scope"] == "refresh_token":
                return payload["sub"]
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Refresh token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid refresh token")
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    def refresh_token(self, refresh_token):
        try:
            payload = jwt.decode(refresh_token, self.secret, algorithms=["HS256"])
            if payload["scope"] == "refresh_token":
                username = payload["sub"]
                new_token = self.encode_token(username)
                return new_token
            raise HTTPException(status_code=401, detail="Invalid scope for token")
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Refresh token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid refresh token")

    def generate_passowrd_reset_token(self, username):
        payload = {
            "exp": datetime.utcnow() + timedelta(hours=1),
            "iat": datetime.utcnow(),
            "scope": "password_reset",
            "sub": username,
        }
        return jwt.encode(payload, self.secret, algorithm="HS256")

    def decode_password_reset_token(self, token):
        try:
            payload = jwt.decode(token, self.secret, algorithms=["HS256"])
            if payload["scope"] == "password_reset":
                return payload["sub"]
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail="Invalid token")
        raise HTTPException(status_code=401, detail="Invalid token")
