import requests
import hashlib
import re

def has_uppercase(string):
    return any(char.isupper() for char in string)

def has_lowercase(string):
    return any(char.islower() for char in string)

def has_number(string):
    return any(char.isdigit() for char in string)

def has_special(string):
    return any(not char.isalnum() for char in string)

def password_compromised(password):
    # gets first 5 characters of password sha-1 hash
    hash = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    url = 'https://api.pwnedpasswords.com/range/' + hash[:5]
    response = [x.strip("\r").split(":")[0] for x in requests.get(url).text.split("\n")]
    return hash[5:] in response


def validate_password(password):
    if len(password) < 10:
        return "pasword too weak: must be at least 10 characters"

    if len(password) > 128:
        return "password too long: cannot be more than 128 characters"
    
    complexity_score = has_lowercase(password) + has_number(password) + has_special(password) + has_uppercase(password)
    if complexity_score < 3:
        return "password too weak: must contain at least 3 of the following: uppercase, lowercase, number, special character"

    if password_compromised(password):
        return "this password is compromised: please choose a different password"

    return "success"

def validate_email(email):
    if len(email) > 128:
        return "email too long: cannot be more than 254 characters"
    # use regex to check if email
    email_regex = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"
    if (re.match(email_regex, email)):
        return "success"
    return "invalid email: please enter a valid email address"
    

if __name__ == "__main__":
    password_compromised("hello")
    validate_email("dd@stanford.edu")
    validate_email("notreal@stanford")