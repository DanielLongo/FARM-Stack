import React, {useState} from "react";
import {XIcon, Heros} from "@heroicons/react/solid";
import Modal from '../components/Modal';
import {login} from '../utils/auth';

function LoginForm({onClose, showSignUp, showPasswordReset}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hanldeLogin = async () => {
    const user = await login(email, password)
    console.log('user', user)
  }

  return (
    <Modal onClose={onClose}>
        <div
        className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-6/12 md:w-4/12">
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button onClick={onClose} className="p-2 rounded-lg bg-white hover:bg-slate-100">
            <XIcon className="w-5 text-gray h-5 font-bold " aria-hidden="true"/>
            </button>
            </div>
            <div className='flex flex-row items-center justify-around mb-12'>
                <div className='px-12'>
                    <h1 className="text-2xl text-center font-bold text-left mb-8">Login</h1>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4 px-4 py-2 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500"
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
                        <p className="text-xs mt-4">Forgot Your Password? <a onClick={showPasswordReset} className='text-blue-800 cursor-pointer'>Reset Password</a></p>
                        <p className="text-xs mb-2">Don't have an account? <a onClick={showSignUp} className='text-blue-800 cursor-pointer'>Sign Up</a></p>
                        <button onClick={hanldeLogin} className="p-2 mb-4 w-full bg-transparent border-[1px] border-black rounded-lg hover:bg-gray-200 hover:text-gray-700 mt-4">
                            Login
                        </button>
                </div>
            </div>
        </div>
    </Modal>
  )

}
export default LoginForm;