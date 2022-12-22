import React, {useState} from 'react';
import {XIcon, Heros} from "@heroicons/react/solid";
import Modal from '../components/Modal';
import { googleAuth, singUp } from '../utils/auth';

function SignUpForm({onClose, showLogin, showConfirm}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignUp = async () => {
        // no addtional attributes so empty {}
        const user = await singUp(email, password, {})
        console.log('user', user)
        showConfirm()
      }

  return (
    <Modal onClose={onClose}>
        <div
        className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-6/12 md:w-4/12">
            <div className="px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={onClose} className="p-2 rounded-lg bg-white hover:bg-slate-100">
            <XIcon className="w-5 text-gray h-5 font-bold " aria-hidden="true"/>
            </button>
            </div>
            <div className='flex flex-row items-center justify-around mb-16'>
                <div className='px-12'>
                    <h1 className="text-2xl text-center font-bold text-left mb-8">Sign Up</h1>
                    <button onClick={googleAuth} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 focus:bg-white rounded-lg w-full focus:border-slate-500 flex-row justify-around items-center flex">
                    <div className="flex flex-row">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="w-6 h-6 mr-2" />
                        <p className="font-semibold text-slate-500">Sign up with Google</p>
                    </div>
                    </button>
                    <hr class="mt-8 mb-6 h-0.5 bg-gray-100 rounded border-0 dark:bg-gray-300"/>
                        <label className='text-xs font-semibold' for="email">Email</label> 
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 mb-4 px-4 py-2 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                        <label className='text-xs font-semibold' for="password">Password</label> 
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 px-4 py-2 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500"
                            id="password"
                            type="password"
                            placeholder="Set your password"
                        />
                        <p className="text-xs mt-4 mb-1">By signing up you agree to our <a href="/terms" className='text-blue-800 hover:underline'>
                            Terms of Service</a> and <a href="/terms" className='text-blue-800 hover:underline'>Privacy Policy</a></p>
                        <button onClick={handleSignUp} className="p-2 mb-4 w-full text-white font-semibold bg-blue-800 rounded-lg hover:bg-blue-300 hover:text-gray-800 mt-4">
                            Sign Up
                        </button>
                        <div className='flex flex-row justify-center'>
                        <p className="text-xs mb-2">Already have an account? <a onClick={showLogin} className='text-blue-800 cursor-pointer hover:underline'>Login</a></p>
                        </div>

                </div>
            </div>
        </div>
    </Modal>
  )
}

export default SignUpForm;
