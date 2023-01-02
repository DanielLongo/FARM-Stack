import useAuth from "./useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Constants from '../constants';

function useFetch() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);
  const { hasAccessToken, hasRefreshToken, refreshAccessToken } = useAuth();

  const refreshFetch = async (url, config) => {
    setIsLoading(true);
    let hasAccess = await hasAccessToken();
    let hasRefresh = await hasRefreshToken();
    if (!hasRefresh) {
      alert("session expired, please sign out and login again");
      navigate("/");
    }
    if (!hasAccess) {
      console.log("refreshing access token");
      await refreshAccessToken();
    }
    config["credentials"] = "include";
    let response = await fetch(Constants.API_ENDPOINT + url, config);
    setIsLoading(false);
    return response;
  };
  return { refreshFetch, fetchIsLoading: isLoading };
}

export default useFetch;
