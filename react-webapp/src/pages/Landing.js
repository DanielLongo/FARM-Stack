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
        <div className='pt-40 flex  h-screen'>
            <h1 className="text-3xl font-bold w-full text-center">
                [Landing Page Content]
            </h1>
        </div>
        <Footer/>
    </div>
  );
}

export default Landing;