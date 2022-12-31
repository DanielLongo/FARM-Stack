import React, { useState } from "react";
import { XIcon, Heros } from "@heroicons/react/solid";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";

function SetPasswordForm({ username, onClose }) {
  const { changePassword } = useAuth();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigation = useNavigate();

  const handleSetPassword = async () => {
    const response = await changePassword(username, code, newPassword);
    if (response === "success") {
      onClose();
      navigation("/home");
    }

    // const response = await login(email, password)
    // if (response === 'success') {
    //     onClose();
    //     navigation('/home')
    // } else if (response === 'UserNotConfirmedException') {
    //     resendConfirmationCode(email)
    //     setUsername(email)
    //     showConfirm()
    // }
  };

  return (
    <Modal onClose={onClose}>
      <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-11/12 max-w-md">
        <div className="px-4 py-4 sm:px-6 flex flex-row-reverse">
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white hover:bg-slate-100"
          >
            <XIcon
              className="w-5 text-gray h-5 font-bold "
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="flex flex-row items-center justify-around mb-16">
          <div className="px-12">
            <h1 className="text-2xl text-center font-bold text-left mb-8">
              Set Password
            </h1>
            <label className="text-xs font-semibold" for="email">
              Reset Code
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="mt-1 mb-4 px-4 py-2 placeholder-slate-500 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500"
              id="code"
              type="code"
              placeholder="Enter code (inlcuded in reset email)"
            />
            <label className="text-xs font-semibold" for="password">
              New Password
            </label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 px-4 py-2 placeholder-slate-500 bg-slate-100 focus:bg-white rounded-lg w-full focus:border-slate-500"
              id="password"
              type="password"
              placeholder="New password"
            />
            <button
              onClick={handleSetPassword}
              className="mb-4 mt-6 btn-primary w-full"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
export default SetPasswordForm;
