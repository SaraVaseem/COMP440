const express = require('express');
const mysql = require('mysql2');
const cors = require("cors")
const RegistrationModel = require('./models/signup')

// require('dotenv').config();  // Load environment variables

const app = express();
app.use(express.json())
app.use(cors())

mysql.connect("db://127.0.0.1:3306/registration")

app.post("/login", (req, res) => {
  const {email, password} = req.body;
    RegistrationModel.findOne({email:email})
    .then(suer => {
        if(user) {
            if(user.password === password) {
              res.json("Success")  
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("No record exists")
        }
    }) 
})

app.post('/login', (req, res) => {
    RegistrationModel.create(req.body)
    .then(registration => res.json(registration))
    .catch(err => res.json(err))
})

app.listen(5173, () => {
    console.log("server is running")
})