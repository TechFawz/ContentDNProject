import React from 'react';
import { useNavigate } from "react-router-dom";
import "./start.css";


function StartWelcome()
{
 
    const navigate = useNavigate();

    return(
        <div  className="WelcomeContainer">
            <div className="WelcomeContainerText">
            <h1 className="WelcomeContainerTextWelcome">Welcome On CDN Project</h1>
            <h4 className="WelcomeContainerTextSubHeading">From- Project owners</h4>
            </div>
             
             <div>
                <div className='LoginButton' onClick={()=>{navigate("/login/admin")}}>Admin Login</div>
                <div className='LoginButton' onClick={()=>{navigate("/login/user")}}>User Login</div>
             </div>
        </div>
    )

}

export default StartWelcome;