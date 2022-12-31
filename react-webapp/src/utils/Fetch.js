import { hasAccessToken, hasRefreshToken } from './auth';
import { refreshAccessToken } from './auth';

async function Fetch(url, config) {
    let hasAccess = await hasAccessToken();
    let hasRefresh = await hasRefreshToken();
    if (!hasRefresh) {
        alert("session expired, please sign out and login again")
        // window.location.href = "/"
    }
    if (!hasAccess) {
        console.log("refreshing access token")
        await refreshAccessToken();
    }

    let response = await fetch(url, config);
    return response;
}

export default Fetch;