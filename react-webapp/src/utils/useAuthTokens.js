// import { useEffect, useState } from "react";
// import Cookies from "universal-cookie";

// export const useAuthTokens = () => {
//     const cookies = new Cookies();
//     const [refreshToken, setRefreshToken] = useState(
//         cookies.get("refresh_token_header_and_payload")
//     );
//     const [accessToken, setAccessToken] = useState(
//         cookies.get("access_token_header_and_payload")
//     );

//     useEffect(() => {
//         console.log("refreshTokening tokens!");
//         setRefreshToken(cookies.get("refresh_token_header_and_payload"));
//         setAccessToken(cookies.get("access_token_header_and_payload"));
//     }, []);

//     const hasAccess = () => {
//         cookies.get("refresh_token_header_and_payload")
//         if (accessToken) {
//             return true;
//         }
//         return false;
//     };

//     const hasRefresh = () => {
//         if (refreshToken) {
//             return true;
//         }
//         return false;
//     };

//     return {
//         hasAccess, hasRefresh
//     };
// };
