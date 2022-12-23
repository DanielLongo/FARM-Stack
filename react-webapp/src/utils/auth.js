import React from "react";
import { API_ENDPOINT } from "../constants";
import decodeJwt from 'jwt-decode';
import { TokenStorage } from "./token_storage";

export const login = async (username, password) => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    let requestOptions = {
        method: 'POST',
        body: formdata
    };

    let request = new Request(`${API_ENDPOINT}/users/login`, requestOptions)
    const tokens = await fetch(request)
    TokenStorage.setItem("access_token_", tokens.access_token)
    TokenStorage.setItem("refresh_token_", tokens.refresh_token)
    return "success"
}

export const signUp = async (username, password) => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    let requestOptions = {
        method: 'POST',
        body: formdata
    };

    let request = new Request(`${API_ENDPOINT}/users/signup`, requestOptions)

    const tokens = await fetch(request)
    TokenStorage.setItem("access_token_", tokens.access_token)
    TokenStorage.setItem("refresh_token_", tokens.refresh_token)
    return "success"
}

export const signOut = async () => {
    let requestOptions = {
        method: 'POST',
    };

    let request = new Request(`${API_ENDPOINT}/users/logout`, requestOptions)
    const response = await fetch(request, requestOptions);

    TokenStorage.removeItem("access_token_")
    TokenStorage.removeItem("refresh_token_")
}

export const logOutOfAllDevices = async () => {
    let requestOptions = {
        method: 'POST',
    };
    let request = new Request(`${API_ENDPOINT}/users/revoke_all_refresh_tokens`, requestOptions)
    const response = await fetch(request, requestOptions);
    TokenStorage.removeItem("access_token_")
    TokenStorage.removeItem("refresh_token_")
}

export const googleAuth = async (access_token) => {
    let requestOptions = {
        method: 'POST',
        body: JSON.stringify({ "access_token": access_token }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let request = new Request(`${API_ENDPOINT}/users/authenticate_with_google`, requestOptions)
    const tokens = await fetch(request)
    TokenStorage.setItem("access_token_", tokens.access_token)
    TokenStorage.setItem("refresh_token_", tokens.refresh_token)
    return "success"
}

export const forgotPassword = async (username) => {
    console.log("forgetPassword")
}

export const changePassword = async (code, password) => {
    console.log("setPassword")
}
