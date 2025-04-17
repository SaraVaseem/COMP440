import React, { useState } from "react";
import Button from "@mui/material/Button";
import "../App.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [phone, setNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  //  const navigate = useNavigate()

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<boolean>(false);

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement> | any,
  ) => {
    setPassword(e.target.value);
    if (e.target.value !== confirmPassword) {
      setError("Passwords don't match!");
    } else {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement> | any,
  ) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setError("Passwords don't match!");
    } else {
      setError("");
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/signup", {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      })
      .then((result) => {
        console.log("Response from server:", result.data);
        console.log(result.data);
        setSuccess(true);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.error("Signup Error:", err.response.data);
          if (err.response.data.error === "Duplicate entry") {
            setError(
              `Error: ${err.response.data.fields.join(", ")} already in use`,
            );
          } else if (err.response.data.error === "Missing required fields") {
            setError("Missing required fields");
          } else {
            setError("Username, email, or phone number already taken");
          }
        } else {
          setError("An unexpected error occurred.");
        }
      });
  };

  if (success) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
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
              onChange={handlePasswordChange}
            />
          </div>
          <div className="input">
            <img src={password_icon} alt="" width="20px" height="20 px" />
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div className="input">
            <img src={user_icon} alt="" width="20px" height="20 px" />
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
                setFirstName(e.target.value)
              }
            />
          </div>
          <div className="input">
            <img src={user_icon} alt="" width="20px" height="20 px" />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
                setLastName(e.target.value)
              }
            />
          </div>
          <div className="input">
            <img src={email_icon} alt="" width="20px" height="20 px" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <div className="input">
            <img src={user_icon} alt="" width="20px" height="20 px" />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              onChange={(e: React.ChangeEvent<HTMLInputElement> | any) =>
                setNumber(e.target.value)
              }
            />
          </div>
        </div>
        <br></br>
        <div className="button">
          <Button variant="contained" style={{ backgroundColor: "#4c00b4", color: "white" }} type="submit">
            Submit
          </Button>
        </div>

        <div className="login-link" style={{color: "Black" }}>
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </form>
    </div>
  );
}
