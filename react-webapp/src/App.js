import logo from './logo.svg';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Landing from './pages/Landing';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Amplify } from 'aws-amplify'
import aws_exports from './aws-exports';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from './constants';
try {
  Amplify.configure(aws_exports);
} catch (e) {
  console.log("error", e);
}

function App() {
  


  return (
    <>
    <ToastContainer />
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  )
}

export default App;
