import React from "react";
import { API_ENDPOINT } from "../constants";
import decodeJwt from 'jwt-decode';
import { TokenStorage } from "./token_storage";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const login = async (username, password) => {
    try {
        let formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            credentials: 'include',
        };

        let request = new Request(`${API_ENDPOINT}/users/login`, requestOptions)
        let res = await fetch(request)
        if (!res.ok) {
            let details = await res.json().then(data => data)
            if (details["detail"]) {
                throw new Error(details["detail"]);
            } else {
                throw new Error(res.statusText);
            }
        }
    } catch (error) {
        throw error
    }
}

export const signUp = async (username, password) => {
    try {
        let formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);

        let requestOptions = {
            method: 'POST',
            body: formdata
        };

        let request = new Request(`${API_ENDPOINT}/users/signup`, requestOptions)

        let res = await fetch(request)
        if (!res.ok) {
            let details = await res.json().then(data => data)
            if (details["detail"]) {
                throw new Error(details["detail"]);
            } else {
                throw new Error(res.statusText);
            }
        } 
    } catch (error) {
        throw error
    }
}

export const signOut = async () => {
    let requestOptions = {
        method: 'POST',
        credentials: 'include',
    };
    try {
        let request = new Request(`${API_ENDPOINT}/users/logout`, requestOptions)
        const response = await fetch(request, requestOptions);
    } catch (error) {
        console.log("error", error)
    }
    await cookies.remove("refresh_token_header_and_payload", { path: '/users' })
    await cookies.remove("access_token_header_and_payload", { path: '/' })
}

export const logOutOfAllDevices = async () => {
    let requestOptions = {
        method: 'POST',
    };
    try {
        let request = new Request(`${API_ENDPOINT}/users/revoke_all_refresh_tokens`, requestOptions)
        const response = await fetch(request, requestOptions);
    } catch (error) {
        console.log("error", error)
    }
    await TokenStorage.removeItem("access_token")
    await TokenStorage.removeItem("refresh_token")
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
    try {
        let res = await fetch(request)
    } catch (error) {
        throw error
    }
    return "success"
}

export const refreshAccessToken = async () => {
    let requestOptions = {
        method: 'POST',
        headers: {
            'credentials': 'include',
        }
    }
    let request = new Request(`${API_ENDPOINT}/users/refresh_token`, requestOptions)
    try {
        let res = await fetch(request)
    } catch (error) {
        throw error
    }
    return "success"
}


export const forgotPassword = async (username) => {
    console.log("forgetPassword")
}

export const changePassword = async (code, password) => {
    console.log("setPassword")
}
