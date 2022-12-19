import React from "react";
import { API_ENDPOINT } from "../constants";
import decodeJwt from 'jwt-decode';
import Cookies from 'universal-cookie';


export const isAuthenticated = async () => {
    const request = new Request(`${API_ENDPOINT}/users/me`, {
        method: 'GET',
    })
    const response = await fetch(request);
    return response.status === 200;
}


export const login = async (email, password) => {
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
        // localStorage.setItem('token', data['access_token']);
        // localStorage.setItem('permissions', decodedToken.permissions);
        return "success"
    }

    throw new Error('Failed to login');
};