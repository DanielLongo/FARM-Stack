import React, { useEffect } from "react";
import AppBar from "../components/AppBar";
import { useSearchParams } from "react-router-dom";
import SetPasswordForm from "../views/SetPassword";

function PasswordReset() {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div>
      <AppBar />
      <SetPasswordForm />
    </div>
  );
}

export default PasswordReset;
