import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import useAuth from "../utils/useAuth";

function GoogleAuth({ mode }) {
  const { googleAuth, authIsLoading } = useAuth();
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await googleAuth(tokenResponse.access_token);
      if (res !== "success") {
        alert("Google login failed. Try using email and password instead.");
      }
    },
    onFail: (error) => alert(error),
  });

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        className="px-4 py-2 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500 flex-row justify-around items-center flex"
      >
        <div className="flex flex-row items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google logo"
            className="w-4 h-4 mr-2"
          />
          {mode === "signUp" && (
            <p className="font-semibold text-slate-500">Sign up with Google</p>
          )}
          {mode === "login" && (
            <p className="font-semibold text-slate-500">Login with Google</p>
          )}
        </div>
      </button>
    </div>
  );
}

export default GoogleAuth;
