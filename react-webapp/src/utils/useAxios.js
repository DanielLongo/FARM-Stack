import axios from "axios";
import jwtDecode from "jwt-decode";
import { API_ENDPOINT } from "../constants";
import { useContext } from "react";
import { useAuthTokens } from "./useAuthTokens";
import { refreshAccessToken } from "./auth";
// import { useNavigate } from "react-router-dom";
import { hasAccessToken, hasRefreshToken } from "./auth";

function customAxios() {
    const axiosInstance = axios.create({
        baseURL: API_ENDPOINT,
        withCredentials: true,
    });

    axiosInstance.interceptors.request.use(async req => {
        console.log("req", req)
        let hasAccess = await hasAccessToken();
        let hasRefresh = await hasRefreshToken();
        if (!hasAccess || !hasRefresh) {
            alert("session expired, please login again")
            window.location.href = "/"
        }

        if (!hasAccess) {
            console.log("refreshing access token")
            await refreshAccessToken();
        }
        return req;
    })
    return axiosInstance
}

export default customAxios;