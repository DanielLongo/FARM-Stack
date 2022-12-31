import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import useAuth from "../utils/useAuth";

function AppBar(props) {
  const navigate = useNavigate();
  const [authModalType, setAuthModalType] = useState(null);
  const { isAuthed, signOut } = useAuth;

  const showLogin = () => {
    setAuthModalType("login");
  };
  const showSignUp = () => {
    setAuthModalType("signup");
  };

  return (
    <>
      {authModalType && (
        <AuthModal setAuthModalType={setAuthModalType} type={authModalType} />
      )}
      <div className="backdrop-blur-xl bg-slate-0/[.65] flex justify-between items-center fixed top-0 left-0 right-0 z-9">
        <div className="md:mx-16 lg:mx-32 flex w-full p-4 justify-between">
          <a href="/">
            <h1 className="text-xl text-black">[App Name]</h1>
          </a>
          <div>
            {isAuthed ? (
              <div>
                <div className="flex flex-row">
                  <button className="btn-secondary" onClick={signOut}>
                    Sign Out
                  </button>
                  {window.location.pathname === "/" && (
                    <button
                      className="btn-primary ml-2"
                      onClick={() => navigate("/home")}
                    >
                      To Dashboard
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-row">
                  <button className="btn-secondary" onClick={showLogin}>
                    Login
                  </button>
                  <span className="w-2"></span>
                  <button className="btn-primary" onClick={showSignUp}>
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AppBar;
