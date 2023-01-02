import { useContext } from "react";
import { GlobalProvider, GlobalContext } from "./state/GlobalState";

import "./App.css";

import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Landing from "./pages/Landing";
import PasswordReset from "./pages/PasswordReset";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Constants from "./constants";
import useAuth from './utils/useAuth';

function App() {
  // const { isAuthed } = useContext(GlobalContext);
  // const { isAuthed } = useAuth();

  return (
    <GoogleOAuthProvider clientId={Constants.GOOGLE_CLIENT_ID}>
      <GlobalProvider>
        <ToastContainer
          position="top-center"
          hideProgressBar
          autoClose={3000}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Landing />} />
            <Route path="/reset-password" element={<PasswordReset />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
