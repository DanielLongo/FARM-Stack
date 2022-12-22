import requests
import hashlib


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
        return "pasword too weak"

    if len(password) > 128:
        return "password too long"
    
    complexity_score = has_lowercase(password) + has_number(password) + has_special(password) + has_uppercase(password)
    if complexity_score < 3:
        return "password too weak"

    if password_compromised(password):
        return "password compromised"

    return "valid"

    

    
    

if __name__ == "__main__":
    password_compromised("hello")