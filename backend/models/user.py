from typing import Optional

from pydantic import BaseModel, EmailStr, Field

class UserModel(BaseModel):
    email: EmailStr
    password: str

class StudentSchema(BaseModel):
    username: str = Field(...)
    email: EmailStr = Field(...)
    # course_of_study: str = Field(...)
    # year: int = Field(..., gt=0, lt=9)
    # gpa: float = Field(..., le=4.0)

    class Config:
        schema_extra = {
            "example": {
                "username": "John Doe",
                "email": "jdoe@x.edu.ng",
            }
        }


class UpdateStudentModel(BaseModel):
    username: str
    email: Optional[EmailStr]

    class Config:
        schema_extra = {
            "example": {
                "fullname": "John Doe",
                "email": "jdoe@x.edu.ng",
            }
        }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}