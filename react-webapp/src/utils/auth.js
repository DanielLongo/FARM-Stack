import React from "react";
import { API_ENDPOINT } from "../constants";
import decodeJwt from 'jwt-decode';
import { TokenStorage } from "./token_storage";
import Cookies from 'universal-cookie';


const cookies = new Cookies();

export const login = async (username, password, reCaptchaToken) => {
    try {
        let formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            credentials: "include",
            headers: {
                "Recaptcha-Token": reCaptchaToken
            }
        };
        let request = new Request(`${API_ENDPOINT}/users/login`, requestOptions)
        let res = await fetch(request)
        if (!res.ok) {
            throw new Error(res.statusText);
        }
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.detail);
        }
        throw error
    }
}

export const signUp = async (username, password, reCaptchaToken) => {
    try {
        let formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);
        let requestOptions = {
            method: 'POST',
            body: formdata,
            credentials: "include",
            headers: {
                "Recaptcha-Token": reCaptchaToken
            }
        };
        let request = new Request(`${API_ENDPOINT}/users/signup`, requestOptions)
        let res = await fetch(request)
        if (!res.ok) {
            throw new Error(res.statusText);
        } 
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.detail);
        }
        throw error
    }
}

export const signOut = async () => {
    try {
        let requestOptions = {
            method: 'POST',
            credentials: "include"
        }
        let request = new Request(`${API_ENDPOINT}/users/logout`, requestOptions)
        const res = await fetch(request, requestOptions);
        if (!res.ok) {
            throw new Error(res.statusText);
        }
    } catch (error) {
        console.log("error so", error)
    }
    await cookies.remove("refresh_token_header_and_payload", { path: '/users' })
    await cookies.remove("access_token_header_and_payload", { path: '/' })
}

export const logOutOfAllDevices = async () => {
    try {
        let requestOptions = {
            method: 'POST',
            credentials: "include"
        }
        let request = new Request(`${API_ENDPOINT}/users/revoke_all_refresh_tokens`, requestOptions)
        const res = await fetch(request, requestOptions);
        if (!res.ok) {
            throw new Error(res.statusText);
        }
    } catch (error) {
        console.log("error so all", error)
    }
    await cookies.remove("refresh_token_header_and_payload", { path: '/users' })
    await cookies.remove("access_token_header_and_payload", { path: '/' })
}

export const googleAuth = async (access_token) => {
    try {
        let requestOptions = {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({"access_token": access_token})
        }
        let request = new Request(`${API_ENDPOINT}/users/authenticate_with_google`, requestOptions)
        const res = await fetch(request, requestOptions);
        if (!res.ok) {
            throw new Error(res.statusText);
        }
    } catch (error) {
        throw error
    }
}

export const refreshAccessToken = async () => {
    console.log("refreshAccessToken")
    try {
        let requestOptions = {
            method: 'GET',
            credentials: "include"
        }
        let request = new Request(`${API_ENDPOINT}/users/refresh_access_token`, requestOptions)
        const res = await fetch(request, requestOptions);
        if (!res.ok) {
            throw new Error(res.statusText);
        }
    } catch (error) {
        throw error
    }
    return "success"
}

export const hasAccessToken = async () => {
    let accessToken = await cookies.get("access_token_header_and_payload");
    console.log("accessToken", accessToken)
    if (accessToken && accessToken != undefined) {
        return true;
    }
    return false;
}

export const hasRefreshToken = async () => {
    let refreshToken = await cookies.get("refresh_token_header_and_payload");
    console.log("refreshToken", refreshToken)
    if (refreshToken && refreshToken != undefined) {
        console.log("refreshToken!", refreshToken)
        return true;
    }
    return false;
}

export const forgotPassword = async (username) => {
    console.log("forgetPassword")
}

export const changePassword = async (code, password) => {
    console.log("setPassword")
}
