import React, { useContext, useState } from "react";
import { XIcon, Heros } from "@heroicons/react/solid";
import Modal from "../components/Modal";
import useAuth from "../utils/useAuth";
import { toast } from "react-toastify";
import { CAPTHCA_SITE_KEY } from "../constants";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleAuth from "../components/GoogleAuth";

function SignUpForm({ onClose, showLogin }) {
  const reCaptchaRef = React.createRef();
  const { signUp, authIsLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const reCaptchaToken = await reCaptchaRef.current.executeAsync();
      await reCaptchaRef.current.reset();
      await signUp(email, password, reCaptchaToken);
    } catch (e) {
      toast.error(e.message);
    }
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
            <h1 className="text-2xl text-center font-bold mb-8">Sign Up</h1>
            <GoogleAuth mode={"signUp"} />
            <hr class="mt-8 mb-6 h-0.5 bg-gray-100 rounded border-0 dark:bg-gray-300" />
            <ReCAPTCHA
              sitekey={CAPTHCA_SITE_KEY}
              size="invisible"
              ref={reCaptchaRef}
            />
            <label className="text-xs font-semibold" for="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 mb-4 input"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
            <label className="text-xs font-semibold" for="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 input"
              id="password"
              type="password"
              placeholder="Set your password"
            />
            <p className="text-xs mt-4 mb-1">
              By signing up you agree to our{" "}
              <a href="/terms" className="text-blue-800 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-blue-800 hover:underline">
                Privacy Policy
              </a>
            </p>
            <button onClick={handleSignUp} className="my-4 w-full btn-primary">
              Sign Up
            </button>
            <div className="flex flex-row justify-center">
              <p className="text-xs mb-2">
                Already have an account?{" "}
                <a
                  onClick={showLogin}
                  className="text-blue-800 cursor-pointer hover:underline"
                >
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SignUpForm;
