import React, {useState} from "react";
import {XIcon, Heros} from "@heroicons/react/solid";
import Modal from '../components/Modal';
import { forgotPassword } from '../utils/auth';

function RequestPasswordReset({onClose, setUsername, showSetPassword, initialUsername}) {
    const [email, setEmail] = useState(initialUsername);

    const handleResetPassword = async () => {
        setUsername(email)
        const response = await forgotPassword(email)
        showSetPassword()
    }

    
  return (
        <Modal onClose={onClose}>
            <div
            className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-11/12 max-w-md">
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={onClose} className="p-2 rounded-lg bg-white hover:bg-slate-100">
                <XIcon className="w-5 text-gray h-5 font-bold " aria-hidden="true"/>
                </button>
                </div>
                <div className='flex flex-row items-center justify-around mb-12'>
                    <div className='w-10/12 md:w-8/12'>
                        <h1 className="text-2xl font-bold text-left mb-4">Reset Password</h1>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mb-2 px-4 py-2 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                            <button className="btn-primary mt-4" onClick={handleResetPassword}>
                                Reset Password
                            </button>
                    </div>
                </div>
            </div>
        </Modal>
  )

}
export default RequestPasswordReset;