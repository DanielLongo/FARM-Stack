import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../components/SideMenu";
import Dashboard from "../views/Dashboard";
import Account from "../views/Account";
import useAuth from "../utils/useAuth";

function Home() {
  const navigate = useNavigate();
  const [view, setView] = React.useState("dashboard");
  const { isAuthed, signOut } = useAuth();

  useEffect(() => {
    if (!isAuthed) {
      // navigate('/');
      console.log("not authed");
    }
  }, []);

  return (
    <div className="flex flex-1 flex-row">
      <SideMenu signOutWrapper={signOut} view={view} setView={setView} />
      {view === "dashboard" ? (
        <Dashboard />
      ) : view === "account" ? (
        <Account />
      ) : null}
    </div>
  );
}

export default Home;
