import React, { useEffect } from "react";
import AppBar from "../components/AppBar";
import { useSearchParams } from "react-router-dom";

function PasswordReset() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const

  // useEffect(() => {
  //     const token = searchParams.get("token");
  //     if (token) {

  //     })
  return (
    <div>
      <AppBar />
    </div>
  );
}

export default PasswordReset;
