
# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')
EMAIL_SENDER = os.getenv('SENDER')

if SENDGRID_API_KEY is None:
    # need api key? https://docs.sendgrid.com/for-developers/sending-email/api-getting-started
    raise ValueError("SENDGRID_API_KEY not set")
sg = SendGridAPIClient(SENDGRID_API_KEY)

def send_password_reset_email(email: str, action_url: str, name: str, device_description: str):
    # loads email from html template
    with open('templaes/password_reset.html', 'r') as f:
        html_content = f.read()

    # Replace placeholders in the HTML with the actual values
    html_content = html_content.replace('{{action_url}}', action_url)
    html_content = html_content.replace('{{name}}', name)
    html_content = html_content.replace('{{device_description}}', device_description)
    message = Mail(
        from_email = EMAIL_SENDER,
        to_emails = email,
        subject='Password Reset',
        html_content=html_content
    )
    try:
        response = sg.send(message)
    except Exception as e:
        return "failure"
    return "success"

def test_mail_works():
    message = Mail(
        from_email='danieldominiclongo@gmail.com',
        to_emails='danieldominiclongo@gmail.com',
        subject='Sending with Twilio SendGrid is Fun',
        html_content='<strong>and easy to do anywhere, even with Python</strong>'
    )
    try:
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print("error", e.message)

if __name__ == "__main__":
    test_mail_works()
    