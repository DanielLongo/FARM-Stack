import os
from jose import JWTError, jwt
from fastapi import HTTPException
from datetime import datetime, timedelta
from passlib.context import CryptContext


class Auth():
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    secret = os.getenv("APP_SECRET_STRING")

    def encode_password(self, password):
        return self.pwd_context.hash(password)

    def verify_password(self, password, hash_password):
        return self.pwd_context.verify(password, hash_password)
    
    def encode_token(self, username):
        payload = {
            'exp' : datetime.utcnow() + timedelta(days=0, minutes=30),
            'iat' : datetime.utcnow(),
            'scope': 'access_token',
            'sub' : username
        }
        return jwt.encode(
            payload, 
            self.secret,
            algorithm='HS256'
        )
    
    def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.secret, algorithms=['HS256'])
            if (payload['scope'] == 'access_token'):
                return payload['sub']
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Token expired')
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail='Invalid token')
    
    def encode_refresh_token(self, username):
        payload = {
            'exp' : datetime.utcnow() + timedelta(days=0, hours=10),
            'iat' : datetime.utcnow(),
	    'scope': 'refresh_token',
            'sub' : username
        }
        return jwt.encode(
            payload, 
            self.secret,
            algorithm='HS256'
        )
	    
    def refresh_token(self, refresh_token):
        try:
            payload = jwt.decode(refresh_token, self.secret, algorithms=['HS256'])
            if (payload['scope'] == 'refresh_token'):
                username = payload['sub']
                new_token = self.encode_token(username)
                return new_token
            raise HTTPException(status_code=401, detail='Invalid scope for token')
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Refresh token expired')
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail='Invalid refresh token')