import React, {useState} from "react";
import {XIcon, Heros} from "@heroicons/react/solid";
import Modal from '../components/Modal';
import {login, resendConfirmationCode, googleAuth} from '../utils/auth';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";



function LoginForm({onClose, showSignUp, showPasswordReset, showConfirm, setUsername}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const handleLogin = async () => {
    setUsername(email)
    const response = await login(email, password)
    if (response === 'success') {
        onClose();
        navigation('/home')
    } else if (response === 'UserNotConfirmedException') {
        resendConfirmationCode(email)
        setUsername(email)
        showConfirm()
    }
}

  return (
    <Modal onClose={onClose}>
        <div
        className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-11/12 max-w-md">
            <div className="px-4 py-4 sm:px-6 flex flex-row-reverse">
            <button onClick={onClose} className="p-2 rounded-lg bg-white hover:bg-slate-100">
            <XIcon className="w-5 text-gray h-5 font-bold " aria-hidden="true"/>
            </button>
            </div>
            <div className='flex flex-row items-center justify-around mb-16'>
                <div className='px-12'>
                    <h1 className="text-2xl text-center font-bold text-left mb-8">Login</h1>
                    <button onClick={googleAuth} className="px-4 py-2 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500 flex-row justify-around items-center flex">
                    <div className="flex flex-row items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google logo" className="w-4 h-4 mr-2" />
                        <p className="font-semibold text-slate-500">Login with Google</p>
                    </div>
                    </button>
                    <hr class="mt-8 mb-6 h-0.5 bg-gray-100 rounded border-0 dark:bg-gray-100"/>
                    {/* <form> */}
                        <label className='text-xs font-semibold' for="email">Email</label> 
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 mb-4 px-4 py-2 placeholder-slate-500 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                        <label className='text-xs font-semibold' for="password">Password</label> 
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 px-4 py-2 placeholder-slate-500 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                            <p className="text-xs mt-4 mb-1"><a onClick={showPasswordReset} className='hover:underline text-blue-800 cursor-pointer'>Reset Password</a></p>
                        <button onClick={handleLogin} className="mb-4 mt-2 btn-primary w-full">
                            Login
                        </button>
                        {/* </form> */}
                        <div className= 'flex flex-row justify-center'>
                        <p className="text-xs mb-2">Don't have an account? <a onClick={showSignUp} className='text-blue-800 cursor-pointer hover:underline'>Sign Up</a></p>
                        </div>

                </div>
            </div>
        </div>
    </Modal>
  )

}
export default LoginForm;