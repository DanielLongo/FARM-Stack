# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
import boto3
from botocore.exceptions import ClientError

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

EMAIL_SENDER = os.getenv("EMAIL_SENDER")
SES_ID = os.getenv("SES_ID")
SES_SECRET = os.getenv("SES_SECRET")
AWS_REGION = os.getenv("AWS_REGION")

client = boto3.client(
    "ses", AWS_REGION, aws_access_key_id=SES_ID, aws_secret_access_key=SES_SECRET
)


def send_email(recipient, subject, body):
    try:
        response = client.send_email(
            Destination={
                "ToAddresses": [
                    recipient,
                ],
            },
            Message={
                "Body": {
                    "Html": {
                        "Charset": "UTF-8",
                        "Data": body,
                    },
                    "Text": {
                        "Charset": "UTF-8",
                        "Data": body,
                    },
                },
                "Subject": {
                    "Charset": "UTF-8",
                    "Data": subject,
                },
            },
            Source=EMAIL_SENDER,
        )
    except ClientError as e:
        return e.response["Error"]["Message"]
    return "success"


def send_password_reset_email(email: str, action_url: str):
    # loads email from html template
    with open("./app/utils/email/templates/password_reset.html", "r") as f:
        html_content = f.read()

    # Replace placeholders in the HTML with the actual values
    html_content = html_content.replace("{{action_url}}", action_url)
    res = send_email(email, "Password Reset", html_content)
    return res


def test_mail_works():
    send_password_reset_email("danieldominiclongo@gmail.com", "/reset-password")


if __name__ == "__main__":
    test_mail_works()
