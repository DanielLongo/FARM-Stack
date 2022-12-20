import React, {useState, useEffect} from "react";
import {XIcon, Heros} from "@heroicons/react/solid";
import Modal from '../components/Modal';
import { confirmSignUp, resendConfirmationCode } from '../utils/auth';
import { Auth } from 'aws-amplify';
import { useNavigate } from "react-router-dom";


function ConfirmSignUpForm({onClose, username}) {
  const [confirmationCode, setConfirmationCode] = useState("");
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const res = await confirmSignUp(username, confirmationCode)
    if (res === "success") {
        navigate('/home')
    }
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
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            className="mb-4 px-4 py-2 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500"
                            id="confirmationCode"
                            type="text"
                            placeholder="Confirmation Code"
                        />
                        <button onClick={handleConfirm} className="p-2 mb-4 w-full bg-transparent border-[1px] border-black rounded-lg hover:bg-gray-200 hover:text-gray-700 mt-4">
                            Confirm
                        </button>
                        <button onClick={() => resendConfirmationCode(username)} className="p-2 mb-4 w-full bg-transparent border-[1px] border-black rounded-lg hover:bg-gray-200 hover:text-gray-700 mt-4">
                            Resend Email
                        </button>
                </div>
            </div>
        </div>
    </Modal>
  )

}
export default ConfirmSignUpForm;