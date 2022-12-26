import React, { useContext } from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { GlobalContext } from "../state/GlobalState";
import { signOut } from "../utils/auth";
// Components
import AuthModal from "./AuthModal";

// UI Components
import Button from "./UI/Button";

function AppBar(props) {
  const navigate = useNavigate();
  const [authModalType, setAuthModalType] = useState(null);

  const { isAuthed, setAuthState } = useContext(GlobalContext);

  const logIn = async () => { setAuthModalType("login") }
  const signUp = async () => { setAuthModalType("signup") }
  const signOutWrapper = async () => {
    signOut()
    setAuthState(false)
    navigate('/');
  }


  return (
    <>
      {authModalType && <AuthModal setAuthModalType={setAuthModalType} type={authModalType} />}
      <div className="backdrop-blur-xl bg-slate-0/[.65] bg-red p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-9 md:mx-16 lg:mx-32">
        <a href="/"><h1 className="text-xl text-black">[App Name]</h1></a>
        <div>
          {
            JSON.parse(localStorage.getItem("isAuthed")) ? (
              <div>
                <div className="flex flex-row">
                  <Button onClick={signOutWrapper} text={"Sign out"} size={"md"} disabled={false} type="primary" />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-row">
                  <button className="btn-secondary" onClick={logIn}>Login</button>
                  <span className="w-2"></span>
                  <button className="btn-primary" onClick={signUp}>Sign Up</button>
                </div>
              </div>
            )
          }

        </div >
      </div >
    </>
  );
}

export default AppBar;
