import React, { useEffect } from "react";
import AppBar from "../components/AppBar";
import SignUpForm from "../views/SignUp";
import { API_ENDPOINT } from '../constants';
import { authToken } from "../utils/auth";
import { TokenStorage } from "../utils/token_storage";
import { testSecureEndpoint } from "../utils/api";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <AppBar />
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
