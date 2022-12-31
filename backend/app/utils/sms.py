import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()
# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_TOKEN = os.getenv("TWILIO_TOKEN")
TWILIO_NUMBER = os.getenv("TWILIO_NUMBER")

client = Client(TWILIO_SID, TWILIO_TOKEN)


def send_sms(recipient, body):
    if recipient[0] != "+":
        recipient = "+" + recipient
    if len(recipient) < 12:
        recipient = "+1" + recipient[1:]
    try:
        message = client.messages.create(body=body, from_=TWILIO_NUMBER, to=recipient)

        print(message.sid)
        return "success"
    except Exception as e:
        return "failed: " + str(e)


if __name__ == "__main__":
    send_sms("+16505461126", "Hello from Python 1!")
    send_sms("16505461126", "Hello from Python 2!")
    send_sms("6505461126", "Hello from Python 3!")
