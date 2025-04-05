import React, { useState } from "react";
import '../App.css';
import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'
import axios from "axios";
import { Navigate } from "react-router-dom";
import Button from '@mui/material/Button'
//import {useAuth } from '../auth/AuthContext'

export default function Login() {

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
 // const {login} = useAuth()

  // Handle form submission
   const handleSubmit = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault()
    //need to change to get
    axios.post('http://localhost:3000/login',{username, password})
    .then(result => {console.log(result)
      setSuccess(true);
      //login(result)  
    })
    .catch(err => console.log(err))
    setError("Username and/or password incorrect");
  };
  
  if (success) {
    return <Navigate to="/home" replace/>;
  }

  return (
    <div className='container'>
      <div className = "header">
      <div className = "text">Login</div>
        <div className= "underline"></div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <div className="inputs">
      <div className="input">
        <img src={user_icon} alt="" width="20px" height= "20 px"/>
        <input type="text" placeholder="Username" name="username"
        onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => setUsername(e.target.value)}/>
      </div>
      <div className="input">
        <img src={password_icon} alt="" width="20px" height= "20 px"/>
        <input type="password" placeholder="Password" name="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement> | any) => setPassword(e.target.value)}/>
      </div>
      </div>
      <br></br>
      <div className="button">
      <Button variant="contained" type="submit">Sign In</Button>
      </div>      
      </form>
    </div>
  );
}

window.location.href = "/search";