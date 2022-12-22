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
// import Amplify, { Auth } from 'aws-amplify';
// import awsconfig from './aws-exports';
import { Amplify, API, graphqlOperation } from 'aws-amplify'
// import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// import awsExports from "./aws-exports";
// Amplify.configure(awsExports);

// Amplify.configure(awsconfig);
// Auth.configure(awsconfig);
// import Amplify from 'aws-amplify';
// import aws_exports from './aws-exports';
// import { withAuthenticator } from 'aws-amplify-react';
// Amplify.configure(aws_exports);

function App() {
  


  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
