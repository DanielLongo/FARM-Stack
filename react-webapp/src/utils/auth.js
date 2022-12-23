import React from "react";
import { API_ENDPOINT } from "../constants";
import decodeJwt from 'jwt-decode';
import { TokenStorage } from "./token_storage";

export const login = async (username, password) => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    
    let requestOptions = {
        method: 'POST',
        body: formdata
    };

    let request = new Request(`${API_ENDPOINT}/users/login`, requestOptions)
    const tokens = await fetch(request)
    TokenStorage.setItem("access_token_", tokens.access_token)
    TokenStorage.setItem("refresh_token_", tokens.refresh_token)
    return "success"
}

export const signUp = async (username, password) => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    let requestOptions = {
        method: 'POST',
        body: formdata
    };

    let request = new Request(`${API_ENDPOINT}/users/signup`, requestOptions)

    const tokens = await fetch(request)
    TokenStorage.setItem("access_token_", tokens.access_token)
    TokenStorage.setItem("refresh_token_", tokens.refresh_token)
    return "success"
}

export const signOut = async () => {
    let requestOptions = {
        method: 'POST',
    };

    let request = new Request(`${API_ENDPOINT}/users/logout`, requestOptions)
    const response = await fetch(request, requestOptions);

    TokenStorage.removeItem("access_token_")
    TokenStorage.removeItem("refresh_token_")
}

export const logOutOfAllDevices = async () => {
    let requestOptions = {
        method: 'POST',
    };
    let request = new Request(`${API_ENDPOINT}/users/revoke_all_refresh_tokens`, requestOptions)
    const response = await fetch(request, requestOptions);
    TokenStorage.removeItem("access_token_")
    TokenStorage.removeItem("refresh_token_")
}

export const googleAuth = async () => {
    console.log('google auth')
}

export const forgotPassword = async (username) => {
    console.log("forgetPassword")
}

export const changePassword = async (code, password) => {
    console.log("setPassword")
}

// import React from "react";
// import { API_ENDPOINT } from "../constants";
// import decodeJwt from 'jwt-decode';
// import Cookies from 'universal-cookie';
// import { Auth } from 'aws-amplify';
// import { toast } from 'react-toastify';
// import { useHistory } from "react-router-dom";
// import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

// export const isLoggedIn = async () => {
//     try {
//         const user = await Auth.currentAuthenticatedUser()
//         console.log("user -", user)
//         return true
//     } catch (error) {
//         console.log("error", error)
//         return false;
//     }
// }

// export const authToken = async () => {
//     const user = await Auth.currentAuthenticatedUser()
//     if (user) {
//         const token = user.signInUserSession.idToken.jwtToken;
//         console.log("token", token)
//         return token;
//     }
// }


// export const resendConfirmationCode = async(username) => {
//     try {
//         await Auth.resendSignUp(username);
//         toast.info('code resent successfully');
//     } catch (err) {
//         toast.error('error resending code: ', err);
//     }
// }

// export const confirmSignUp = async(username, confirmationCode) => {
//     try {
//       await Auth.confirmSignUp(username, confirmationCode);
//     } catch (error) {
//         console.log('error confirming sign up', error);
//         toast.error("Error: ", error.message);
//     }
//     toast.success("Success: Account confirmed");
//     return "success"
// }


// export const login = async (email, password) => {
//     try {
//         const user = await Auth.signIn(email, password);
//         return "success"
//     } catch (error) {
//         if (error.code === 'UserNotConfirmedException') {
//             return "UserNotConfirmedException"
//         }
//         toast('error signing in', error);
//         console.log('error signing in', error, error.code);
//         return "failed"
//     }
//     // console.log("Auth", Auth.currentUserInfo())
// }

// export const signOut = async () => {
//     try {
//         await Auth.signOut();
//         window.location.reload();
//         return "successs"

//     } catch (error) {
//         toast.error('error signing out: ', error);
//     }
// }

// // async function gloablSignOut() {
// //     // signs out of all devices
// //     try {
// //         await Auth.signOut({ global: true });
// //     } catch (error) {
// //         console.log('error signing out: ', error);
// //     }
// // }

// export const forgotPassword = async (email) => {
//     await Auth.forgotPassword(email)
// }

// export const changePassword = async (email, code, password) => {
//     try {
//         await Auth.forgotPasswordSubmit(email, code, password)
//         return "success"
//     } catch (error) {
//         toast.error("Error", error.message)
//     }
//     return "failed"
// }


// export const signUp = async (email, password, attributes, onSuccess) => {
//     console.log("email", email, "password", password, "attributes", attributes)
//     try {
//         const { user } = await Auth.signUp({
//             username: email, // username
//             password: password,
//             attributes: attributes,
//             autoSignIn: { // optional - enables auto sign in after user is confirmed
//                 enabled: true,
//             }
//         });
//         console.log(user);
//         onSuccess();
//     } catch (error) {
//         if (error.message === "PreSignUp failed with error A user with this email already exists. Perhaps Social Sign was used in addition to a standard account..") {
//             toast.error("Social Sign in or a standard account already exists with this email. Please login into existing account or use a new email address.")
//         }
//         // if (error.message === "")
//         toast.error("Error", getErrorMessage(error))
//     }
// }

// const getErrorMessage = (error) => {
//     const errorMessage = error.message.split(":")
//     return errorMessage[errorMessage.length - 1]
// }
// export const googleAuth = async () => {
//     let user;
//     try {
//         console.log("A")
//         user = await Auth.federatedSignIn({
//             provider: CognitoHostedUIIdentityProvider.Google
//           });
//           console.log("B")
//     } catch (error) {
//         console.log("Error", error)
//     }

//     console.log("USER", user)
//     // try {
//     //     console.log("googleAuth")
//     //     const user = await Auth.federatedSignIn({
//     //         provider: CognitoHostedUIIdentityProvider.Google
//     //       });
//     //       console.log("user", user)
//     // } catch (error) {
//     //     console.log("Error", error)
//     //     if (error.message === "PreSignUp failed with error A user with this email already exists. Perhaps Social Sign was used in addition to a standard account..") {
//     //         toast.error("Social Sign in or a standard account already exists with this email. Please login into existing account or use a new email address.")
//     //     }
//     // }
// }
