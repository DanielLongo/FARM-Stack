import { useContext } from 'react';
import { GlobalProvider, GlobalContext } from './state/GlobalState';

import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
  Redirect
} from 'react-router-dom';

import Home from './pages/Home';
import Landing from './pages/Landing';
import PasswordReset from './pages/PasswordReset';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants';


function App() {

  const { isAuthed } = useContext(GlobalContext);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

      <GlobalProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Landing />} />
            <Route path="/password_reset" element={<PasswordReset />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </GoogleOAuthProvider>

  );
}

export default App;
