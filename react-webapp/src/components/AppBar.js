import React from "react";

function AppBar(props) {
    return (
        <div className="backdrop-blur-xl bg-slate-0/[.65] p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-9">
        <h1 className="text-xl text-black">[App Name]</h1>
        <div>
          <button onClick={props.showLogin} className="px-4 py-2 mr-2 border-[0px] border-black rounded-lg hover:bg-gray-200 hover:text-gray-700">
            Login
          </button>
          <button onClick={props.showSignUp} className="px-4 py-2 bg-transparent border-[1px] border-black rounded-lg hover:bg-gray-200 hover:text-gray-700">
            Sign Up
          </button>
        </div>
      </div>
    );
}

export default AppBar;
