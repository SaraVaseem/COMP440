const express = require('express');
const mysql = require('mysql2');
const cors = require("cors")
const RegistrationModel = require('./models/signup')
const bcrypt = require('bcrypt')

// require('dotenv').config();  // Load environment variables

const app = express();
app.use(express.json())
app.use(cors())

mysql.connect("db://127.0.0.1:3306/registration")

// Signup route - create a new user
app.post('/signup', (req, res) => {
    const { username, password, firstName, lastName, email, phone } = req.body;
    // Check if the email already exists
    RegistrationModel.findOne({ email: email })
      .then(user => {
        if (user) {
          // User already exists
          res.json("Email is already registered.");
        } else {
            bcrypt.hash(password, 10)
            .then(hash => {                    
          // Create a new user
          RegistrationModel.create({ username, password: hash, firstName, lastName, email, phone })
            .then(newUser => res.json(newUser))
            .catch(err => res.json({ error: err.message }));
        })
        }
      })
      .catch(err => res.json({ error: err.message }));
  });
  
  // Login route - authenticate user
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    // Find the user by username
    RegistrationModel.findOne({ username: username })
      .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, response) => {
                if(response) {
                    res.json("Success")
                } else {
                    res.json("the password is incorrect")
                }
            })
          // Check if the passwords match
          if (user.password === password) {
            res.json("Success");
          } else {
            res.json("The password is incorrect");
          }
        } else {
          res.json("No record exists");
        }
      })
      .catch(err => res.json({ error: err.message }));
  });

app.listen(5173, () => {
    console.log("server is running")
})