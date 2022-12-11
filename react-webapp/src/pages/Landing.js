import React, {useState} from 'react';
import AppBar from '../components/AppBar';
import Footer from '../components/Footer';
import LoginForm from '../views/Login';
import SignUpForm from '../views/SignUp';


function Landing() {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    const showSignUpFromLogin = () => {
        setShowLogin(false);
        setShowSignUp(true);
    }
    const showLoginFromSignUp = () => {
        setShowSignUp(false);
        setShowLogin(true);
    }
  return (
    <div>
        {showLogin && <LoginForm onClose={() => setShowLogin(false)} showSignUp={showSignUpFromLogin}/>}
        {showSignUp && <SignUpForm onClose={() => setShowSignUp(false)} showLogin={showLoginFromSignUp}/>}
        <AppBar showSignUp={() => setShowSignUp(true)} showLogin={() => setShowLogin(true)}/>
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