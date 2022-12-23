import React, { useState, useEffect } from 'react';

import AppBar from '../components/AppBar';
import Footer from '../components/Footer';

import Button from "../components/UI/Button"

/**
 * The first page a user sees when they visit the site. This page should be a simple description of the
 * product and a call to action to sign up for the beta.
 */
function Landing(props) {

    const [email, setEmail] = useState('');

    /**
     * Handle the call to action
     */
    const callToAction = () => { }

    return (
        <div>
            <AppBar />
            <div className='p-20 justify-center h-screen'>
                <div className='w-full rounded-md p-16 flex flex-col justify-center items-center'>
                    <h1 className='font-CerealXBd lg:text-5xl text-3xl mb-6 bg-gradient-to-r bg-clip-text text-transparent
                    from-emerald-500 via-indigo-500 to-emerald-500
                    animate-text'>Header goes here
                    </h1>
                    <p className='font-CerealBK text-slate-500 mb-8 lg:text-center lg:text-lg text-md'>
                        Description goes here
                    </p>
                    <Button onClick={callToAction} text={"Call to action"} size={"md"} disabled={false} type="secondary" />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Landing;
