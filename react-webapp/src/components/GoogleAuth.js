import React from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuth } from '../utils/auth';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../state/GlobalState";


function GoogleAuth() {
    const { setAuthState } = useContext(GlobalContext);
    const navigation = useNavigate();
    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const res = await googleAuth(tokenResponse.access_token);
            if (res === "success") {
                setAuthState(true);
                navigation("/home");
            } else {
                alert("Google login failed. Try using email and password instead.");
            }
        },
        onFail: error => alert(error),
      });

    return (
        <div>
            <button onClick={handleGoogleLogin} className="px-4 py-2 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500 flex-row justify-around items-center flex">
                <div className="flex flex-row items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="w-4 h-4 mr-2" />
                    <p className="font-semibold text-slate-500">Login with Google</p>
                </div>
            </button>
        </div>
    )
}

export default GoogleAuth;