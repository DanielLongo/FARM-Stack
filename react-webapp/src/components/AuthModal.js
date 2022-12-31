import React from "react";

import SetPasswordForm from "../views/SetPassword";
import PasswordResetForm from "../views/RequestPasswordReset";
import SignUpForm from "../views/SignUp";
import LoginForm from "../views/Login";


function AuthModal({ setAuthModalType, type }) {
    if (type == "login") {
       return (
            <div className="h-screen w-screen">
                <LoginForm onClose={() => setAuthModalType(null)} showSignUp={() => setAuthModalType("signup")} showPasswordReset={() => 9("reset_password")}/>
            </div>
        )
    } else if (type == "signup") {
        return (
            <div className="h-screen w-screen">
                <SignUpForm onClose={() => setAuthModalType(null)} showLogin={() => setAuthModalType("login")} />
            </div>
        )
    }
    else if (type == "reset_password") {
        return (
            <div className="h-screen w-screen">
                <PasswordResetForm onClose={() => setAuthModalType(null)} showLogin={() => setAuthModalType("login")} />
            </div>
        )
    }
}

export default AuthModal;
