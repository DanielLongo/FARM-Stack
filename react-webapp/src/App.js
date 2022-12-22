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
Amplify.configure(aws_exports);

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
