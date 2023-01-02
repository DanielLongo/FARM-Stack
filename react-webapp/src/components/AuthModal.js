import React, {useState} from "react";

import SetPasswordForm from "../views/SetPassword";
import PasswordResetForm from "../views/RequestPasswordReset";
import SignUpForm from "../views/SignUp";
import LoginForm from "../views/Login";

function AuthModal({ setAuthModalType, type }) {
  const [email, setEmail] = useState("");
  if (type == "login") {
    return (
      <div className="h-screen w-screen">
        <LoginForm
          email={email}
          setEmail={setEmail}
          onClose={() => setAuthModalType(null)}
          showSignUp={() => setAuthModalType("signup")}
          showPasswordReset={() => setAuthModalType("reset_password")}
        />
      </div>
    );
  } else if (type == "signup") {
    return (
      <div className="h-screen w-screen">
        <SignUpForm
          onClose={() => setAuthModalType(null)}
          showLogin={() => setAuthModalType("login")}
        />
      </div>
    );
  } else if (type == "reset_password") {
    return (
      <div className="h-screen w-screen">
        <PasswordResetForm
          initialEmail={email}
          onClose={() => setAuthModalType(null)}
          showLogin={() => setAuthModalType("login")}
        />
      </div>
    );
  }
}

export default AuthModal;
