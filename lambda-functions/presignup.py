import json
import boto3

client = boto3.client('cognito-idp')


def lambda_handler(event, context):
    email = event['request']['userAttributes']['email']
    print(client.list_users(Filter=f'email=\"{email}\"', UserPoolId=event["userPoolId"]))
    if (len(client.list_users(Filter=f'email=\"{email}\"', UserPoolId=event["userPoolId"])["Users"])) > 0:
        raise Exception("A user with this email already exists. Perhaps Social Sign was used in addition to a standard account.")
    
    event["response"]["autoConfirmUser"] = True    
    # Return to Amazon Cognito
    event["response"]["autoVerifyEmail"] = True
    return event