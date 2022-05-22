import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, toggleError } from '../../Slices/UserSlice';
import { AppDispatch } from '../../Store';

import "./LoginForm.css"
import logo from "./logo.png"

export const Login: React.FC = () => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const dispatch: AppDispatch = useDispatch();
    
    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.name === "username"){
            setUsername(event.target.value);
        }
        else {
            setPassword(event.target.value);
        }
    }

    const handleLogin = (event:React.MouseEvent<HTMLButtonElement>) => {
        let credentials = {
            username,
            password
        };

        dispatch(loginUser(credentials)).then((response) => {
            localStorage.setItem('userDetails', JSON.stringify(response.payload));
        });
    }

    return(
        <div className="main">
                <img src={logo} className="logo" alt="Employee Reimbursement System"/>
                <form id="login-form" className="login-form">
                    <label className="welcome">Sign in to view account</label>
                    <label htmlFor="username" className="label">Please Enter Username</label>
                    <input autoComplete="off" type="text" id="username" className="input" placeholder="username" name="username" onChange={handleInput}></input>
                    <label htmlFor="password" className="label">Please Enter Password</label>
                    <input type="password" id="password" className="input" name="password" placeholder="password" onChange={handleInput}></input>
                    <button type="submit" id="submit" className="btnSubmit"  onClick={handleLogin}>Login</button>
                </form>
            </div>
    )

}