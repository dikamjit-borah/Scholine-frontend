import React from 'react'
import { useHistory, useLocation } from 'react-router';
import './style.scss';

function NavBar() {
    const location = useLocation();
    const history = useHistory();
     const getNavHeader = () => {
        return location.pathname.split("/")[2];  
    }
    const handleLogout = ()=> {
        localStorage.removeItem("token");
        window.location.reload();
    }
  
    return (
        <div className="main_navbar">
            <div className="main_navbar_wrapper">
                <h2>{getNavHeader()}</h2>
                <p onClick={handleLogout}>Log out</p>
            </div>
        </div>
    )
}

export default NavBar
