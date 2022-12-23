from google.oauth2 import id_token
from google.auth.transport import requests
from fastapi import HTTPException
import os
import requests
from dotenv import load_dotenv
load_dotenv()

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

def validate_token(token):
    url = "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + token
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=400, detail="Invalid Token")
    return response.json()


    