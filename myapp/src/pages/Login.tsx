import React, { useState } from "react";
import "../App.css";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
//import {useAuth } from '../auth/AuthContext'

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  // const {login} = useAuth()

  // Handle form submission
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    //need to change to get
    axios
      .post("http://localhost:3000/login", { username, password })
      .then((result) => {
        console.log(result);
        localStorage.setItem("username", result.data.username);
        console.log(result.data.username)
        setSuccess(true);
        setError("Logged in successfully!");
      })
      .catch((err) => console.log(err));
    setError("Username and/or password incorrect");
  };

  if (success) {
    return <Navigate to="/home"/>;
  }
// return is pretty stuff what is being returned tp the user
  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" width="20px" height="20 px" />
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
                setUsername(e.target.value)
              }
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" width="20px" height="20 px" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
                setPassword(e.target.value)
              }
            />
          </div>
        </div>
        <br></br>
        <div className="button">
          <Button variant="contained" style={{ backgroundColor: "#4c00b4", color: "white" }} type="submit">
            Sign In
          </Button>
        </div>

        <div className="signup-link" style={{ color: "Black"}}>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>

      </form>
    </div>
  );
}

//window.location.href = "/search";