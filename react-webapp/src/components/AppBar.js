import React from "react";
import { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { signOut } from '../utils/auth';
import { useNavigate } from "react-router-dom";

function AppBar(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setUser(user);
    }).catch((err) => {
      console.log("user not logged in", err)
    })
    }, [])

    const navigate = useNavigate();
    const handleSignOut = async () => {
      const res = await signOut();
      navigate("/");
    }


    const dashboardPages = ["/dashboard", "/home"]

  
    return (
        <div className="backdrop-blur-xl bg-slate-0/[.65] bg-red p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-9  md:mx-16 lg:mx-32">
        <a href="/"><h1 className="text-xl text-black">[App Name]</h1></a>
        <div>
          {user ? 
          <div>
            <button onClick={handleSignOut} className="px-4 py-2 mr-2 border-[0px] border-black rounded-lg hover:bg-gray-200 hover:text-gray-700"> Sign Out </button> 
            {!dashboardPages.includes(window.location.pathname) && <button onClick={() => navigate("/home")} className="px-4 py-2 bg-transparent border-[1px] border-black rounded-lg hover:bg-gray-200 hover:text-gray-700"> To Dashboard </button>}
          </div>
          :
        <div>
          <button onClick={props.showLogin} className="px-4 py-2 mr-2 border-[0px] border-black rounded-lg hover:bg-gray-200 hover:text-gray-700">
            Login
          </button>
          <button onClick={props.showSignUp} className="whitespace-nowrap px-4 py-2 text-white font-semibold bg-blue-800 rounded-lg hover:bg-blue-300 hover:text-gray-800">
            Sign Up
          </button>
          </div>
}
        </div>
      </div>
    );
}

export default AppBar;
