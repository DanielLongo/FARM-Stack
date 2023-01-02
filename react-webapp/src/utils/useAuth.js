import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import Constants from '../constants';
const API_ENDPOINT = Constants.API_ENDPOINT;
function useAuth() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [isAuthed, setIsAuthed] = useState(null);
    


  useEffect(() => {
    console.log("refreshTokening is authed!", isAuthed);
    if (isAuthed === null) {
      hasRefreshToken();
    }
    // if not authed and on home page redirect to landing page
    if (isAuthed === false && window.location.pathname === "/home") {
      // navigate("/");
      console.log("redirecting to landing page");
    }
  }, [isAuthed]);


  // check for page change, if not authed, redirect to login page



  const login = async (username, password, reCaptchaToken) => {
    try {
      let formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);
      let requestOptions = {
        method: "POST",
        body: formdata,
        credentials: "include",
        headers: {
          "Recaptcha-Token": reCaptchaToken,
        },
      };
      let request = new Request(`${API_ENDPOINT}/users/login`, requestOptions);
      let res = await fetch(request);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.detail);
      }
      throw error;
    }
    
    setIsAuthed(true);
    navigate("/home");
  };

  const signUp = async (username, password, reCaptchaToken) => {
    try {
      let formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);
      let requestOptions = {
        method: "POST",
        body: formdata,
        credentials: "include",
        headers: {
          "Recaptcha-Token": reCaptchaToken,
        },
      };
      let request = new Request(`${API_ENDPOINT}/users/signup`, requestOptions);
      let res = await fetch(request);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.detail);
      }
      throw error;
    }
    setIsAuthed(true);
    navigate("/home");
  };

  const signOut = async () => {
    try {
      let requestOptions = {
        method: "POST",
        credentials: "include",
      };
      let request = new Request(`${API_ENDPOINT}/users/logout`, requestOptions);
      const res = await fetch(request, requestOptions);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.log("error so", error);
    }
    await cookies.remove("refresh_token_header_and_payload", {path: "/"});
    await cookies.remove("access_token_header_and_payload", { path: "/" });
    setIsAuthed(false);
    navigate("/");
  };

  const logOutOfAllDevices = async () => {
    try {
      let requestOptions = {
        method: "POST",
        credentials: "include",
      };
      let request = new Request(
        `${API_ENDPOINT}/users/revoke_all_refresh_tokens`,
        requestOptions
      );
      const res = await fetch(request, requestOptions);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.log("error so all", error);
    }
    await cookies.remove("refresh_token_header_and_payload", {
      path: "/users",
    });
    await cookies.remove("access_token_header_and_payload", { path: "/" });
    setIsAuthed(false);
    navigate("/");
  };

  const googleAuth = async (access_token) => {
    try {
      let requestOptions = {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ access_token: access_token }),
      };
      let request = new Request(
        `${API_ENDPOINT}/users/authenticate_with_google`,
        requestOptions
      );
      const res = await fetch(request, requestOptions);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      throw error;
    }
    setIsAuthed(true);
    navigate("/home");
  };

  const refreshAccessToken = async () => {
    console.log("refreshAccessToken");
    try {
      let requestOptions = {
        method: "GET",
        credentials: "include",
      };
      let request = new Request(
        `${API_ENDPOINT}/users/refresh_access_token`,
        requestOptions
      );
      const res = await fetch(request, requestOptions);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      throw error;
    }
    return "success";
  };

  const hasAccessToken = async () => {
    let accessToken = await cookies.get("access_token_header_and_payload");
    if (accessToken && accessToken != undefined) {
      return true;
    }
    return false;
  };

  const hasRefreshToken = async () => {
    let refreshToken = await cookies.get("refresh_token_header_and_payload");
    if (refreshToken && refreshToken != undefined) {
      setIsAuthed(true);
      return true;
    } else {
      setIsAuthed(false);
      return false;
    }
  };

  const forgotPassword = async (email) => {
    let requestOptions = {
      method: "POST",
      body: JSON.stringify({ email: email }),
    }
    let request = new Request(`${API_ENDPOINT}/users/request_password_reset`, requestOptions);
    let res = await fetch(request);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  };

  const changePassword = async (token, password) => {
    try {
      let requestOptions = {
        method: "POST",
        body: JSON.stringify({ token: token, password: password }),
      }
      
      let request = new Request(`${API_ENDPOINT}/users/reset_password`, requestOptions);
      let res = await fetch(request);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.detail);
      }
      throw error;
    }
    
  };
  return {
    login,
    signUp,
    signOut,
    logOutOfAllDevices,
    googleAuth,
    refreshAccessToken,
    hasAccessToken,
    hasRefreshToken,
    forgotPassword,
    changePassword,
    isAuthed
  };
}

export default useAuth;
