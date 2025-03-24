import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import "dotenv/config.js";

const app = express();
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // Change if needed
    password: process.env.DB_PASS, //type in your password
    database: process.env.DB_NAME
});
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err.message);
    } else {
        console.log("Connected to MySQL Database");
    }
});

// Signup route - create a new user
app.post('/signup', async (req, res) => {
    console.log("Signup request received:", req.body);
    
    const { username, password, firstName, lastName, email, phone } = req.body;

    if (!username || !password || !email || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Check for duplicates
        const checkSql = "SELECT * FROM user WHERE username = ? OR email = ? OR phone = ?";
        const [existingUsers] = await db.promise().execute(checkSql, [username, email, phone]);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const sql = "INSERT INTO user (username, password, firstName, lastName, email, phone) VALUES (?, ?, ?, ?, ?, ?)";
        await db.promise().execute(sql, [username, hashedPassword, firstName, lastName, email, phone]);

        res.json("Success");
    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(400).json({ error: "Duplicate entry", fields: existingUsers.map(user => user.username === username ? "username" : user.email === email ? "email" : "phone") });
    }
});
    
  // Login route - authenticate user
  app.post("/login", async (req, res) => {
    console.log("Login request received:", req.body);
    
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "Missing username or password" });
    }

    try {
        // Fetch user from the database
        const sql = "SELECT * FROM user WHERE username = ?";
        const [users] = await db.promise().execute(sql, [username]);

        if (users.length === 0) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const user = users[0];

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        res.json({ message: "Login successful" });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ error: "Database error", details: err.message });
    }
});

app.listen(3000, () => {
    console.log("server is running")
});