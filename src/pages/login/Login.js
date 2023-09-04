import React, { useContext, useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Password } from 'primereact/password';
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
//import {handleClose} from "./pop";
function Login(props) { 
 
     const navigate = useNavigate();

    const [userName, setUserName] = useState(null)
    const [password, setPassword] = useState(null)
    const [err, setErr] = useState(null);
   

    const { login } = useContext(AuthContext);
   

    const handleLogin = async () => {
        //e.preventDefault();
        try {
            await login({ userName, password })
             navigate("/home")
        } catch (err) {
            setErr(err.response.data?.message);
        }
        props.close()
    };



    return (
        <>
            <div className="divlogin">
                <input
                    id="uname"
                    type="text"
                    name="Username"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}></input><br></br>
                {/* <div className="card flex justify-content-center">
            <Password password={password} placeholder="Password" onChange={(e)=>setpassword(e.target.value)} toggleMask />
        </div> */}
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {err && err}
                <Button variant="contained" onClick={()=>{handleLogin()}}>Login</Button><br></br>
                <a href="#">Forgot Password<br /> </a>   
        
            </div>
           
        </>
    )
}
export default Login;
