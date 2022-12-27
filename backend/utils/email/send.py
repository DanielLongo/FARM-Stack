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
print("email sender: ", EMAIL_SENDER)
SES_ID = os.getenv("SES_ID")
SES_SECRET = os.getenv("SES_SECRET")
AWS_REGION = os.getenv("AWS_REGION")

client = boto3.client('ses', AWS_REGION, aws_access_key_id=SES_ID, aws_secret_access_key=SES_SECRET)
def send_email(recipient, subject, body):
    try:
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    recipient,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': 'UTF-8',
                        'Data': body,
                    },
                    'Text': {
                        'Charset': 'UTF-8',
                        'Data': body,
                    },
                },
                'Subject': {
                    'Charset': 'UTF-8',
                    'Data': subject,
                },
            },
            Source=EMAIL_SENDER,
        )
    except ClientError as e:
        return e.response['Error']['Message']
    return "success"



SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
# EMAIL_SENDER = os.getenv("SENDER")

if SENDGRID_API_KEY is None:
    # need api key? https://docs.sendgrid.com/for-developers/sending-email/api-getting-started
    raise ValueError("SENDGRID_API_KEY not set")
sg = SendGridAPIClient(SENDGRID_API_KEY)


def send_password_reset_email(
    email: str, action_url: str
):
    # loads email from html template
    with open("templates/password_reset.html", "r") as f:
        html_content = f.read()

    # Replace placeholders in the HTML with the actual values
    html_content = html_content.replace("{{action_url}}", action_url)
    res = send_email(email, "Password Reset", html_content)
    print(res)


def test_mail_works():
    # send_email("danieldominiclongo@gmail.com", "test email from daniel", "test")
    send_password_reset_email("danieldominiclongo@gmail.com", "/reset-password")
    # message = Mail(
    #     from_email="danieldominiclongo@gmail.com",
    #     to_emails="danieldominiclongo@gmail.com",
    #     subject="Sending with Twilio SendGrid is Fun",
    #     html_content="<strong>and easy to do anywhere, even with Python</strong>",
    # )
    # try:
    #     response = sg.send(message)
    #     print(response.status_code)
    #     print(response.body)
    #     print(response.headers)
    # except Exception as e:
    #     print("error", e.message)


if __name__ == "__main__":
    test_mail_works()
