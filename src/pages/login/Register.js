
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { Password } from 'primereact/password';
import "primereact/resources/themes/lara-light-indigo/theme.css";

function Register(props) {


    const [userName, setuserName] = useState(null)
    const [password, setpassword] = useState(null)
    const [email, setemail] = useState(null)

    const submit = async () => {
        console.log(userName);
        try {
            const token = await fetch('http://localhost:3600/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ userName: userName, password: password, email: email })
            })

            console.log(token);

        }
        catch (e) {
        }
    }


    return (
        <>
            <div className="divlogin">
                <input id="uname" type="text" name="Username" placeholder="Username" onChange={(e) => setuserName(e.target.value)}></input><br></br>
                <div className="card flex justify-content-center">
                <Password password={password} placeholder="Password" onChange={(e) => setpassword(e.target.value)} toggleMask />
                </div>
                <input id="uname" type="email" name="Email" placeholder="Email" onChange={(e) => setemail(e.target.value)}></input><br></br>
                {/* <button class="button" onClick={submit}>SignUp</button> */}
                <Button variant="contained" onClick={submit}>SignUp</Button><br></br>
            </div>
        </>
    )






}

export default Register