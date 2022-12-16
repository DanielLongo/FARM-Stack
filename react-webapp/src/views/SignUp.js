import React, {useState} from 'react';
import {XIcon, Heros} from "@heroicons/react/solid";
import Modal from '../components/Modal';
function SignUpForm({onClose, showLogin}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const content = (
    <div
    className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-8/12 md:w-6/12">
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button onClick={onClose} className="p-2 rounded-lg bg-white hover:bg-slate-100">
        <XIcon className="w-5 text-gray h-5 font-bold " aria-hidden="true"/>
        </button>
        </div>
        <div className='flex flex-row items-center justify-around mb-12'>
            <div className='w-10/12 md:w-8/12'>
                <h1 className="text-2xl font-bold text-left mb-4">Sign Up</h1>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-2 px-4 py-2 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    <p className="text-xs mt-2 mb-1">By signing up you agree to the <a href="/terms" className='text-blue-800'>terms of service</a> and <a href="/terms" className='text-blue-800'>privacy policy</a></p>
                    <p className="text-xs mb-2">Already have an account? <a onClick={showLogin} className='text-blue-800 cursor-pointer'>Login</a></p>
                    <button className="px-4 py-2 bg-transparent border-[1px] border-black rounded-lg hover:bg-gray-200 hover:text-gray-700 mt-4">
                        Sign Up
                    </button>
            </div>
        </div>
    </div>
  )  
  return (
    <> 
        <Modal content={content} onClose={onClose}/>
    </>
  )
}

export default SignUpForm;
