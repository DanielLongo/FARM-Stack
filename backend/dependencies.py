import cognitojwt


def check_jwt(id_token):
    try:
        verified_claims = cognitojwt.decode(
            id_token,
            REGION,
            USERPOOL_ID,
            app_client_id=APP_CLIENT_ID,  # Optional
            testmode=True  # Disable token expiration check for testing purposes
        )
        return verified_claims
    except:
        return None