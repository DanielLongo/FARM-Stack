import React, {useState, useEffect} from 'react';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import LoginForm from '../views/Login';
import SignUpForm from '../views/SignUp';
import PasswordResetForm from '../views/RequestPasswordReset';
import ConfirmSignUpForm from '../views/ConfirmSignUp';
import {Auth} from 'aws-amplify';

function Landing(props) {
    // keep track of which auth modal to display (0 = none, 1 = login, 2 = sign up, 3 = password reset)
    const [authModalDisplay, setAuthModalDisplay] = useState(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    // needs to be written (save to a database?)
    const handleRequestDemo = async () => {
    }


    const closeModal = () => {
        setAuthModalDisplay(0);
    }


  return (
    <div>
        { 
            authModalDisplay === 4 ? <ConfirmSignUpForm onClose={closeModal} username={username}/> :
            authModalDisplay === 3 ? <PasswordResetForm onClose={closeModal}/> :
            authModalDisplay === 2 ? <SignUpForm onClose={closeModal} showLogin={() => setAuthModalDisplay(1)} showConfirm={() => setAuthModalDisplay(4)} setUsername={setUsername}/> :
            authModalDisplay === 1 && <LoginForm onClose={closeModal} showSignUp={() => setAuthModalDisplay(2)} showPasswordReset={() => setAuthModalDisplay(3)} setUsername={setUsername} showConfirm={() => setAuthModalDisplay(4)}/>
        }
        <AppBar showSignUp={() => setAuthModalDisplay(2)} showLogin={() =>setAuthModalDisplay(1)}/>
        <div className='pt-40 flex  md:mx-16 lg:mx-32 justify-center h-screen'>
            <div className='flex flex-col md:flex-row justify-center'>
                <div className='flex flex-col px-16 w-full md:w-1/2'>
                    <h1 className="text-7xl font-bold w-full text-left">
                    Insert Large Header Here
                    </h1>
                    <h1 className="text-lg mt-8 w-full text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </h1>
                    <div className='flex flex-col md:flex-row mt-4'>
                    <div className='w-full mr-4 mb-4 md:mb-0'>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 placeholder-slate-500 bg-slate-100 focus:bg-white rounded-lg focus:border-slate-500"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        />
                    </div>
                    <button onClick={handleRequestDemo} className="whitespace-nowrap mb-4 px-4 py-2 text-white font-semibold bg-blue-800 rounded-lg hover:bg-blue-300 hover:text-gray-800">
                        Call to Action
                    </button>                    
                    </div>
                </div>
                <div className='flex flex-col w-full md:w-1/2 mt-8 md:mt-0'>
                    <h1 className="text-3xl font-bold w-full text-center">
                    Insert Prototype Here
                    </h1>
                </div>
            </div>

        </div>
        <Footer/>
    </div>
  );
}

export default Landing;