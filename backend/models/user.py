from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserModel(BaseModel):
    email: EmailStr
    password: str
