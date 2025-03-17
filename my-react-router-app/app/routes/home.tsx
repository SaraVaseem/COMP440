import type { Route } from "./types/home";
import { LoginSignup } from "../welcome/welcome.tsx";
import React, { useState, useEffect } from "react";

export function meta({}: Route.MetaArgs) {

  return [
    { title: "Login - Sign Up" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  
// usestate for setting a javascript
    // object for storing and using data
    const [data, setdata] = useState({
      name: "",
      age: 0,
      date: "",
      programming: "",
  });

  // Using useEffect for single rendering
  useEffect(() => {
      // Using fetch to fetch the api from 
      // flask server it will be redirected to proxy
      fetch("/data").then((res) =>
          res.json().then((data) => {
              // Setting a data from api
              setdata({
                  name: data.Name,
                  age: data.Age,
                  date: data.Date,
                  programming: data.programming,
              });
          })
      );
  }, []);

  return <div> <LoginSignup/> </div> 
}
