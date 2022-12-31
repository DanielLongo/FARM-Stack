import React, { useEffect, useContext } from "react";
import AppBar from "../components/AppBar";
import SignUpForm from "../views/SignUp";
import { API_ENDPOINT } from '../constants';
import { authToken } from "../utils/auth";
import { TokenStorage } from "../utils/token_storage";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { signOut } from "../utils/auth";
import { GlobalContext } from "../state/GlobalState";
import  customAxios  from "../utils/useAxios";
import SideMenu from "../components/SideMenu";
import Dashboard from '../views/Dashboard';
import Account from '../views/Account';
function Home() {
    const [view, setView] = React.useState('dashboard');
    const navigate = useNavigate();
    const { isAuthed, setAuthState } = useContext(GlobalContext);
    const signOutWrapper = async () => {
        signOut()
        setAuthState(false)
        navigate('/');
      }

    return (
        <div className="flex flex-1 flex-row">
            <SideMenu
                signOutWrapper={signOutWrapper}
                view={view}
                setView={setView}

            />
            {view === 'dashboard' ? 
                <Dashboard/> :
            view === 'account' ?    
                <Account/> :
                null
            }
        </div>
    );
}

export default Home;
