import { API_ENDPOINT } from "../constants";
import * as SecureStore from 'expo-secure-store';


export const login = async (username, password) => {
    try {
        let formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);

        let requestOptions = {
            method: 'POST',
            body: formdata
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
        } else {
            let tokens = await res.json()
            await SecureStore.setItemAsync("access_token_", tokens.access_token)
            await SecureStore.setItemAsync("refresh_token_", tokens.refresh_token)
            return "success"
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
        } else {
            let tokens = await res.json()
            await SecureStore.setItemAsync("access_token_", tokens.access_token)
            await SecureStore.setItemAsync("refresh_token_", tokens.refresh_token)
            return "success"
        }
    } catch (error) {
        throw error
    }
}

export const signOut = async () => {
    let requestOptions = {
        method: 'POST',
    };

    let request = new Request(`${API_ENDPOINT}/users/logout`, requestOptions)
    const response = await fetch(request, requestOptions);

    await SecureStore.deleteItemAsync("access_token_")
    await SecureStore.deleteItemAsync("refresh_token_")
}

export const logOutOfAllDevices = async () => {
    let requestOptions = {
        method: 'POST',
    };
    let request = new Request(`${API_ENDPOINT}/users/revoke_all_refresh_tokens`, requestOptions)
    const response = await fetch(request, requestOptions);
    await SecureStore.deleteItemAsync("access_token_")
    await SecureStore.deleteItemAsync("refresh_token_")
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
    let res = await fetch(request)
    let tokens = await res.json()
    await SecureStore.setItemAsync("access_token_", tokens.access_token)
    await SecureStore.setItemAsync("refresh_token_", tokens.refresh_token)
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
    let tokens = await fetch(request)
    tokens = await tokens.json()
    await SecureStore.setItemAsync("access_token_", tokens.access_token)
    await SecureStore.setItemAsync("refresh_token_", tokens.refresh_token)
    return "success"
}


export const forgotPassword = async (username) => {
    console.log("forgetPassword")
}

export const changePassword = async (code, password) => {
    console.log("setPassword")
}
