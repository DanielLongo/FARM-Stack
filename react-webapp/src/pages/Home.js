import React from "react";
import AppBar from "../components/AppBar";
import SignUpForm from "../views/SignUp";
import { API_ENDPOINT } from '../constants';
import { authToken } from "../utils/auth";

function Home() {

    const testSecureEndpoint = async () => {
        const token = await authToken();
        const request = new Request(`${API_ENDPOINT}/users/me`, {
            method: "GET",
            headers: {
                Authorization: token
            }
        });
        const response = await fetch(request);
        console.log("response", response);
    }

    return (
        <div>
            <AppBar/>
            <div>
                <h1 className="mt-20 text-3xl font-bold underline">Home</h1>
                <button onClick={testSecureEndpoint}>
                Secure Endpoint
            </button>
            </div>
        </div>
    );
}

export default Home;