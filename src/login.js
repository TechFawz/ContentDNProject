import { faEye, faEyeSlash, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./login.css";





function Login() {
    const navigate =useNavigate();
    const IdRef = useRef();
    const PasswordRef = useRef();
    const location = useLocation();

    useEffect(()=>{
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },[])
    return (
        <div className="ContaintContainer">
            <div>
                <div className="HeadingLogin">
                    <Outlet />
                    <FontAwesomeIcon icon={faUser} />
                </div>

                <div className="LoginContainer">
                    <div className="input-group flex-nowrap LoginDivInsideDiv">
                        <span className="input-group-text" id="addon-wrapping">
                            @
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="addon-wrapping"
                            ref={IdRef}
                        />
                    </div>
                    <div className="input-group flex-nowrap LoginDivInsideDiv">
                        <span className="input-group-text" id="addon-wrapping">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            aria-label="Username"
                            aria-describedby="addon-wrapping"
                            id="LoginDivInputPassword"
                            ref={PasswordRef}

                        />
                        <span
                            className="input-group-text"
                            id="LoginDivShowPassword"
                            onClick={LoginDivShowPassword}
                        >
                            <FontAwesomeIcon icon={faEyeSlash} id="LoginDivShowPasswordIcon" />
                            <FontAwesomeIcon icon={faEye} id="LoginDivClosePasswordIcon" />
                        </span>
                    </div>
                    <div id="LoginDivBUttonsDiv">
                        <button
                            type="button"
                            id="LoginDivLoginButton"
                            className="btn btn-secondary LoginDivInsideDiv"
                            onClick={(e)=>{e.preventDefault(); CheckLogin(IdRef.current.value,PasswordRef.current.value,location.pathname,navigate);}}
                           
                        >
                            Login

                        </button>


                       <p className="WrongPasword">Your Username or Password is Wrong. Please try again</p>


                    </div>
                </div>
            </div>

        </div>
    )


}

function CheckLogin(id,password,path,navigate)
{
    const login_details = {
        id:id,
        password:password
    }
    
    if(path=="/login/user")
    {
        axios.get('http://localhost:9080/user_login',{params: login_details}).then( res => {
           
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("name",res.data.name);
                localStorage.setItem("user","User")
                navigate(`/containt/user`);               
        },err=>{
            document.getElementsByClassName("WrongPasword")[0].style.display="block";
        });
    }
    else if(path=="/login/admin")
    {
        axios.get('http://localhost:9080/admin_login',{params: login_details}).then( res => {
           
                localStorage.setItem("token",res.data.token);
                localStorage.setItem("name",res.data.name);
                localStorage.setItem("user","Admin");
                navigate(`/containt/admin`);            
         
            
                

            
        },err=>{
            document.getElementsByClassName("WrongPasword")[0].style.display="block";
        });
    }
 
}

function LoginDivShowPassword() {
    let Icon = document.getElementById("LoginDivShowPasswordIcon").style.display;
    console.log(Icon);
    if (Icon === "none") {
      document.getElementById("LoginDivShowPasswordIcon").style.display = "block";
      document.getElementById("LoginDivClosePasswordIcon").style.display = "none";
      document.getElementById("LoginDivInputPassword").type = "password";
    } else {
      document.getElementById("LoginDivShowPasswordIcon").style.display = "none";
      document.getElementById("LoginDivClosePasswordIcon").style.display =
        "block";
      document.getElementById("LoginDivInputPassword").type = "text";
    }
  }
export default Login;