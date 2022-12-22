import React from "react";
import { API_ENDPOINT } from "../constants";
import decodeJwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

export const isLoggedIn = async () => {
    try {
        const user = await Auth.currentAuthenticatedUser()
        console.log("user -", user)
        return true
    } catch (error) {
        console.log("error", error)
        return false;
    }
}

export const authToken = async () => {
    const user = await Auth.currentAuthenticatedUser()
    if (user) {
        const token = user.signInUserSession.idToken.jwtToken;
        console.log("token", token)
        return token;
    }
}

export const resendConfirmationCode = async(username) => {
    try {
        await Auth.resendSignUp(username);
        toast.info('code resent successfully');
    } catch (err) {
        toast.error('error resending code: ', err);
    }
}

export const confirmSignUp = async(username, confirmationCode) => {
    try {
      await Auth.confirmSignUp(username, confirmationCode);
    } catch (error) {
        console.log('error confirming sign up', error);
        toast.error("Error: ", error.message);
    }
    toast.success("Success: Account confirmed");
    return "success"
}


export const login = async (email, password) => {
    try {
        const user = await Auth.signIn(email, password);
        return "success"
    } catch (error) {
        if (error.code === 'UserNotConfirmedException') {
            return "UserNotConfirmedException"
        }
        toast('error signing in', error);
        console.log('error signing in', error, error.code);
        return "failed"
    }
    // console.log("Auth", Auth.currentUserInfo())
}

export const signOut = async () => {
    try {
        await Auth.signOut();
        return "successs"

    } catch (error) {
        toast.error('error signing out: ', error);
    }
}

async function gloablSignOut() {
    // signs out of all devices
    try {
        await Auth.signOut({ global: true });
    } catch (error) {
        console.log('error signing out: ', error);
    }
}


export const singUp = async (email, password, attributes) => {
    console.log("email", email, "password", password, "attributes", attributes)
    try {
        const { user } = await Auth.signUp({
            username: email, // username
            password: password,
            attributes: attributes,
            autoSignIn: { // optional - enables auto sign in after user is confirmed
                enabled: true,
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}

export const googleAuth = async () => {
    const user = await Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google
      });
    console.log("user", user)
}
