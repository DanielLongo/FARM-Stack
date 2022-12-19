import React from "react";
import AppBar from "../components/AppBar";
import SignUpForm from "../views/SignUp";

function Home() {
    return (
        <div>
            <AppBar/>
            <div>
                <h1 className="mt-20 text-3xl font-bold underline">Home</h1>
            </div>
        </div>
    );
}

export default Home;