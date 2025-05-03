import express from "express";
import cors from "cors";
import mysql from "mysql2";
import bcrypt from "bcrypt";
import "dotenv/config.js";

const users = []; // In-memory user store (use DB in real apps)
const SECRET_KEY = "your_jwt_secret_key";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // if using Vite
    credentials: true,
  })
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
    existingUsers = await db
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

    console.log("Sending back username:", user.username);

    res.json({ message: "Login successful", username: user.username });
  } catch (err) {
    console.error("Login Error:", err);
    return res
      .status(500)
      .json({ error: "Database error", details: err.message });
  }
});

// Insert rental
app.post("/add-rental", async (req, res) => {
  console.log("Insert rental info request received:", req.body);

  const { title, description, feature, price, username } = req.body;

  if (!title || !description || !feature || !price || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const [rowss] = await db
    .promise()
    .execute("SELECT username FROM user WHERE username = ?", [username]);

  if (rowss.length === 0) {
    console.log("❌ User does not exist");
    return res.status(404).json({ message: "User does not exist" });
  } else {
    console.log("✅ User exists:", rowss[0].username);
  }

  try {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    const [rows] = await db
      .promise()
      .execute(
        "Select COUNT(*) AS count FROM listings WHERE username = ? AND date BETWEEN ? and ?",
        [username, startOfDay, endOfDay]
      );

    if (rows[0].count >= 2) {
      return res
        .status(403)
        .json({ message: "You can only post 2 listings per day. " });
    }

    const sql =
      "INSERT INTO listings (title, description, feature, price) VALUES (?, ?, ?, ?)";
    await db
      .promise()
      .execute(sql, [title, description, feature, price, username]);

    for(let i = 0; i < feature.length; i++ ) {
      const sql_features =
      "INSERT INTO features (listing_title, feature) VALUES (?, ?)";
    await db.promise().execute(sql_features, [title, feature[i]]);
}

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
  res.json({ message: "Login successful" });

  console.error("Login Error:", err);
  return res
    .status(500)
    .json({ error: "Database error", details: err.message });
});

app.listen(3000, () => {
  console.log("server is running");
});

<<<<<<< HEAD
//app.listen(3000, () => {
// console.log("server is running")
//});

app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, '../searchbar.html'));
});

/* app.post('/search', (req, res) => {
     const selectedFeatures = req.body.features;
  
     console.log('User selected features:', selectedFeatures);
  
    //For now, just send them back as a response
    res.send(`You selected: ${Array.isArray(selectedFeatures) ? selectedFeatures.join(', ') : selectedFeatures}`);
});*/
=======
    app.get("/getUsers", async (req, res) => {
      try {
        const [rows] = await db.promise().query("SELECT DISTINCT username FROM listings");
        res.json(rows);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        res.status(500).json({ error: "Database error" });
      }
    });

// Insert review
app.post("/add-review", async (req, res) => {
  console.log("Review request received:", req.body);
>>>>>>> 9511411b8a197dd4589c4265e26cce6530a29b34

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.get("/reviews", (req, res) => {
  res.sendFile(path.join(__dirname, "../reviews.html"));
});
<<<<<<< HEAD
=======

//sara's template Week 5 task 1
app.get("/Mostexpensive", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT L.title, L.username, L.description, L.feature, L.price, L.date FROM listings as L INNER JOIN review as r ON r.title = L.title  WHERE ((rating LIKE 'Excellent') or (rating LIKE 'Good')) AND ((rating NOT LIKE 'Bad') or (rating NOT LIKE 'Fair'))");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//sara's template Week 5 task 2
app.get("/TwoFeatureRentals", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT L.title, L.username, L.description, L.feature, L.price, L.date FROM listings as L INNER JOIN review as r ON r.title = L.title  WHERE ((rating LIKE 'Excellent') or (rating LIKE 'Good')) AND ((rating NOT LIKE 'Bad') or (rating NOT LIKE 'Fair'))");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//sara's template Week 5 task 3
app.get("/FetchExcellentReviews", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT L.title, L.username, L.description, L.feature, L.price, L.date FROM listings as L INNER JOIN review as r ON r.title = L.title  WHERE ((rating LIKE 'Excellent') or (rating LIKE 'Good')) AND ((rating NOT LIKE 'Bad') or (rating NOT LIKE 'Fair'))");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch excellent reviews:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//sara's template Week 5 task 4 users
app.get("/mostRentals", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT username FROM review WHERE rating LIKE 'Poor'");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch most rentals:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//sara's template Week 5 task  users
app.get("/badReviews", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT username FROM review WHERE rating LIKE 'Poor'");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch bad reviews:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//sara's template Week 5 task 6 users
app.get("/noBadReviews", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT DISTINCT L.username FROM listings as L, review as R WHERE R.title = L.title AND (R.rating NOT LIKE 'Poor' or R.rating IS NULL)");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch users with no poor reviews:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});
>>>>>>> 9511411b8a197dd4589c4265e26cce6530a29b34
