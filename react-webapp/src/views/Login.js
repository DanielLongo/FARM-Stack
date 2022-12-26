import React, { useContext, useState } from "react";
import { XIcon, Heros } from "@heroicons/react/solid";
import Modal from '../components/Modal';
// import {login, resendConfirmationCode, googleAuth} from '../utils/auth';
import { login } from '../utils/auth';
import { useNavigate } from "react-router-dom";
import GoogleAuth from '../components/GoogleAuth';
import { GlobalContext } from "../state/GlobalState";
import { toast } from "react-toastify";

function LoginForm({ onClose, showSignUp, showPasswordReset }) {
    const navigate = useNavigate();
    const { setAuthState } = useContext(GlobalContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await login(email, password)
            setAuthState(true)
            navigate('/home');
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <Modal onClose={onClose}>
            <div
                className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-11/12 max-w-md">
                <div className="px-4 py-4 sm:px-6 flex flex-row-reverse">
                    <button onClick={onClose} className="p-2 rounded-lg bg-white hover:bg-slate-100">
                        <XIcon className="w-5 text-gray h-5 font-bold " aria-hidden="true" />
                    </button>
                </div>
                <div className='flex flex-row items-center justify-around mb-16'>
                    <div className='px-12'>
                        <h1 className="text-2xl text-center font-bold mb-8">Login</h1>
                        <GoogleAuth />
                        <hr class="mt-8 mb-6 h-0.5 bg-gray-100 rounded border-0 dark:bg-gray-100" />
                        {/* <form> */}
                        <label className='text-xs font-semibold' for="email">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 mb-4 input"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                        />
                        <label className='text-xs font-semibold' for="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 px-4 py-2 input"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                        <p className="text-xs mt-4 mb-1"><a onClick={showPasswordReset} className='hover:underline text-blue-800 cursor-pointer'>Reset Password</a></p>
                        <button onClick={handleLogin} className="mb-4 mt-2 btn-primary w-full">
                            Login
                        </button>
                        {/* </form> */}
                        <div className='flex flex-row justify-center'>
                            <p className="text-xs mb-2">Don't have an account? <a onClick={showSignUp} className='text-blue-800 cursor-pointer hover:underline'>Sign Up</a></p>
                        </div>

                    </div>
                </div>
            </div>
        </Modal>
    )

}
export default LoginForm;
