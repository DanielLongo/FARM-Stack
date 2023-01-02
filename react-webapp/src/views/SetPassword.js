import React, { useState, useEffect } from "react";
import { XIcon, Heros } from "@heroicons/react/solid";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function SetPasswordForm({ username, onClose }) {
  const { changePassword } = useAuth();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  // initialize code to search param code from url
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const code = searchParams.get("token");
    if (code) {
        setCode(code);
    } else {
      alert("no code from in reset url")
    }
  }, []);

  const handleResetPassword = async () => {
    try {
      await changePassword(code, newPassword);
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    }

  }


  return (
    <div className="flex flex-col items-center justify-center mt-28">
        <div className="flex flex-row items-center justify-around mb-16 max-w-lg">
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
              onClick={handleResetPassword}
              className="mb-4 mt-6 btn-primary w-full"
            >
              Reset Password
            </button>
          </div>
          </div>
    </div>
  );
}
export default SetPasswordForm;
