import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import "dotenv/config.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // if using Vite
    credentials: true,
  }),
);

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER, // Change if needed
  password: process.env.DB_PASS, //type in your password
  database: process.env.DB_NAME,
});
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL Database");
  }
});

// Signup route - create a new user
app.post("/signup", async (req, res) => {
  console.log("Signup request received:", req.body);

  const { username, password, firstName, lastName, email, phone } = req.body;

  if (!username || !password || !email || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  let existingUsers = []; // 🔑 Declare in outer scope

  try {
    const checkSql =
      "SELECT * FROM user WHERE username = ? OR email = ? OR phone = ?";
    [existingUsers] = await db
      .promise()
      .execute(checkSql, [username, email, phone]);

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO user (username, password, firstName, lastName, email, phone) VALUES (?, ?, ?, ?, ?, ?)";
    await db
      .promise()
      .execute(sql, [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        phone,
      ]);

    res.json("Success");
  } catch (err) {
    console.error("Signup Error:", err);

    const conflictFields = existingUsers.map((user) => {
      if (user.username === username) return "username";
      if (user.email === email) return "email";
      if (user.phone === phone) return "phone";
      return "unknown";
    });

    return res
      .status(400)
      .json({ error: "Duplicate entry", fields: conflictFields });
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
    return res
      .status(500)
      .json({ error: "Database error", details: err.message });
  }
});

// Insert rental
app.post("/home", async (req, res) => {
  console.log("Insert rental info request received:", req.body);

  const { title, description, feature, price } = req.body;

  if (!title || !description || !feature || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const sql =
      "INSERT INTO listings (title, description, feature, price) VALUES (?, ?, ?, ?)";
    await db.promise().execute(sql, [title, description, feature, price]);

    res.json("Success");
  } catch (err) {
    console.error("Rental Insertion Error:", err);

    const conflictFields = existingUsers.map((rental) => {
      if (rental.title === title) return "title";
      if (rental.description === description) return "description";
      if (rental.feature === feature) return "feature";
      if (rental.price === price) return "price";
      return "unknown";
    });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
