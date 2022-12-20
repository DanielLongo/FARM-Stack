import React from "react";
import { API_ENDPOINT } from "../constants";
import decodeJwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";


export const isAuthenticated = async () => {
    const request = new Request(`${API_ENDPOINT}/users/me`, {
        method: 'GET',
    })
    const response = await fetch(request);
    return response.status === 200;
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

export const logins = async (email, password) => {
    if (!(email.length > 0) || !(password.length > 0)) {
        throw new Error('Email or password was not provided');
    }

    const formData = new FormData();
    // OAuth2 expects form data, not JSON data
    formData.append('username', email);
    formData.append('password', password);

    const request = new Request(`${API_ENDPOINT}/users/token`, {
        method: 'POST',
        body: formData,
    });

    const response = await fetch(request);

    if (response.status === 500) {
        throw new Error('Internal server error');
    }

    const data = await response.json();

    if (response.status > 400 && response.status < 500) {
        if (data.detail) {
        throw data.detail;
        }
        throw data;
    }

    if ('access_token' in data) {
        const decodedToken = decodeJwt(data['access_token']);
        console.log("decoded token", data['access_token'], decodedToken, decodedToken.permissions);

        const cookies = new Cookies();

        // waring - old browser not compatible with samesite strict vulunrability to csrf
        cookies.set('token', data['access_token'], { path: '/', secure: true, httpOnly: true, sameSite: 'strict' });
        cookies.set('logged_in', decodedToken.exp, { path: '/', secure: true, httpOnly: true, sameSite: 'strict' });
        // localStorage.setItem('token', data['access_token']);
        // localStorage.setItem('permissions', decodedToken.permissions);
        return "success"
    }

    throw new Error('Failed to login');
};