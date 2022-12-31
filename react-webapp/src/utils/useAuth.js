import React from "react";
import { useState, useEffect, useContext } from "react";
import { API_ENDPOINT } from "../constants";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";


function useAuth() {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(null);
    const [isAuthed, setIsAuthed] = useState(null);


    useEffect(() => {
        console.log("refreshTokening is authed!", isAuthed);
        if (isAuthed === null) {
            hasRefreshToken();
        }
        else if (isAuthed) {
            navigate('/home');
        } else {
            navigate('/');
        }
    }, [isAuthed]);

    


    const login = async (username, password, reCaptchaToken) => {
        setIsLoading(true);
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
            setIsLoading(false);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.detail);
            }
            throw error
        }
        setIsAuthed(true);
    }

    const signUp = async (username, password, reCaptchaToken) => {
        setIsLoading(true);
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
            setIsLoading(false);
            if (!res.ok) {
                throw new Error(res.statusText);
            } 
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.detail);
            }
            throw error
        }
        setIsAuthed(true);
    }

    const signOut = async () => {
        setIsLoading(true);
        try {
            let requestOptions = {
                method: 'POST',
                credentials: "include"
            }
            let request = new Request(`${API_ENDPOINT}/users/logout`, requestOptions)
            const res = await fetch(request, requestOptions);
            setIsLoading(false);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
        } catch (error) {
            console.log("error so", error)
        }
        await cookies.remove("refresh_token_header_and_payload", { path: '/users' })
        await cookies.remove("access_token_header_and_payload", { path: '/' })
        setIsLoading(false);
        setIsAuthed(false);
    }

    const logOutOfAllDevices = async () => {
        setIsLoading(true);
        try {
            let requestOptions = {
                method: 'POST',
                credentials: "include"
            }
            let request = new Request(`${API_ENDPOINT}/users/revoke_all_refresh_tokens`, requestOptions)
            const res = await fetch(request, requestOptions);
            setIsLoading(false);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
        } catch (error) {
            console.log("error so all", error)
        }
        await cookies.remove("refresh_token_header_and_payload", { path: '/users' })
        await cookies.remove("access_token_header_and_payload", { path: '/' })
        setIsLoading(false);
        setIsAuthed(false);
    }

    const googleAuth = async (access_token) => {
        setIsLoading(true);
        try {
            let requestOptions = {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify({"access_token": access_token})
            }
            let request = new Request(`${API_ENDPOINT}/users/authenticate_with_google`, requestOptions)
            const res = await fetch(request, requestOptions);
            setIsLoading(false);
            if (!res.ok) {
                throw new Error(res.statusText);
            }
        } catch (error) {
            throw error
        }
        setIsAuthed(true);
    }

    const refreshAccessToken = async () => {
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

    const hasAccessToken = async () => {
        let accessToken = await cookies.get("access_token_header_and_payload");
        if (accessToken && accessToken != undefined) {
            return true;
        }
        return false;
    }

    const hasRefreshToken = async () => {
        let refreshToken = await cookies.get("refresh_token_header_and_payload");
        console.log("refreshToken", refreshToken)
        if (refreshToken && refreshToken != undefined) {
            setIsAuthed(true);
            return true;
        }
        setIsAuthed(false);
        return false;
    }

    const forgotPassword = async (username) => {
        console.log("forgetPassword")
    }

    const changePassword = async (code, password) => {
        console.log("setPassword")
    }
    return {login, signUp, signOut, logOutOfAllDevices, googleAuth, refreshAccessToken, hasAccessToken, hasRefreshToken, forgotPassword, changePassword, isAuthed, authIsLoading: isLoading}    
}

export default useAuth;