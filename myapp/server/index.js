import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import "dotenv/config.js";

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // if using Vite
    credentials: true
  }));

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

    let existingUsers = []; // 🔑 Declare in outer scope

    try {
        const checkSql = "SELECT * FROM user WHERE username = ? OR email = ? OR phone = ?";
        existingUsers = await db.promise().execute(checkSql, [username, email, phone]);

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO user (username, password, firstName, lastName, email, phone) VALUES (?, ?, ?, ?, ?, ?)";
        await db.promise().execute(sql, [username, hashedPassword, firstName, lastName, email, phone]);

        res.json("Success");
    } catch (err) {
        console.error("Signup Error:", err);
        
        const conflictFields = existingUsers.map(user => {
            if (user.username === username) return "username";
            if (user.email === email) return "email";
            if (user.phone === phone) return "phone";
            return "unknown";
        });

        return res.status(400).json({ error: "Duplicate entry", fields: conflictFields });
    }
});
    
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Missing username or password" });
  }

  try {
    const sql = "SELECT * FROM user WHERE username = ?";
    const [rows] = await db.promise().execute(sql, [username]);
    const user = rows[0];

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    console.log("Sending back username:", user.username);

    res.json({ message: "Login successful", username: user.username });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Database error", details: err.message });
  }
});



// Insert rental
app.post("/add-rental", async (req, res) => {
  console.log("Insert rental info request received:", req.body);

  const { title, description, feature, price, username } = req.body;

  if (!title || !description || !feature || !price || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }
 
  const [rowss] = await db.promise().execute('SELECT username FROM user WHERE username = ?', [username]);

  if (rowss.length === 0) {
    console.log('❌ User does not exist');
    return res.status(404).json({ message: 'User does not exist' });
  } else {
    console.log('✅ User exists:', rowss[0].username);
  }

  try {    

  const now = new Date();
  const startOfDay = new Date(now.setHours(0,0,0,0));
  const endOfDay = new Date(now.setHours(23,59,59,999));

  const [rows] = await db.promise().execute(
    'Select COUNT(*) AS count FROM listings WHERE username = ? AND date BETWEEN ? and ?',
    [username,startOfDay,endOfDay] 
  );

  if(rows[0].count >=2){
    return res.status(403).json({message: "You can only post 2 listings per day. "});
  }

    const sql =
      "INSERT INTO listings (title, description, feature, price, username) VALUES (?, ?, ?, ?, ?)";
    await db.promise().execute(sql, [title, description, feature, price, username]);

    for(let i = 0; i < feature.length; i++ ) {
      const sql_features =
      "INSERT INTO features (listing_title, feature) VALUES (?, ?)";
    await db.promise().execute(sql_features, [title, feature[i]]);
}

    res.json("Success");
  } catch (err) {
    console.error("Rental Insertion Error:", err);

  }
});

    app.get("/listings", async (req, res) => {
      try {
        const [rows] = await db.promise().query("SELECT * FROM listings");
        res.json(rows);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
        res.status(500).json({ error: "Database error" });
      }
    });

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

  const { rating, description, title, username } = req.body;

  if (!rating || !description || !title || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    //Here checking if the listings exist and extract the owner based on the title itself
    const [listingRows] = await db
      .promise()
      .execute("SELECT username FROM listings WHERE title = ?", [title]);

    // IF the listing is not found, return an error
    if (listingRows.length === 0) {
      console.log("No listing found with title:", title);
      return res.status(404).json({ error: "Listing not found" });
    }

    // Fetching the username of the person who owns the listing
    const listingOwner = listingRows[0].username;
    if (listingOwner === username) {
      console.log("User is trying to review their own listing:", username);
      return res
        .status(403)
        .json({ error: "You cannot review your own rental unit" });
    }

    // Checking if user has reviewed the listings in case
    const [existingReview] = await db
      .promise()
      .execute("SELECT * FROM review WHERE username = ? AND title = ?", [
        username,
        title,
      ]);

    // IF this current review from user exists for this listing, just reject the request
    if (existingReview.length > 0) {
      console.log("Duplicate review found for:", title);
      return res
        .status(409)
        .json({ error: "You have already reviewed this listing" });
    }

    // Making sure the user's review limit does not exceed 3 within a day timeframe
    const now = new Date();
    // Here setting the start of the day in (HH, MM, SS) format according to real time on your device end
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    // Setting the end of the day in (HH, MM, SS) format according to real time on your device end
    const [reviewCountRows] = await db
      .promise()
      .execute(
        "SELECT COUNT(*) AS count FROM review WHERE username = ? AND date BETWEEN ? AND ?",
        [username, startOfDay, endOfDay]
      );

    // IF the user already submitted 3 reviews today, just reject the request
    if (reviewCountRows[0].count >= 3) {
      console.log("User has reached review limit");
      return res
        .status(403)
        .json({ error: "You can only post 3 reviews per day" });
    }

    // Inserting review into the database
    const sql =
      "INSERT INTO review (username, rating, description, title) VALUES (?, ?, ?, ?)";
    await db.promise().execute(sql, [username, rating, description, title]);

    // IF everything is successful, respond with success
    res.json({ message: "Review submitted successfully" });
  } catch (err) {
    // IF an error occurs, log it and return a server error response
    console.error("Review submission error:", err);
    res.status(500).json({ error: "Database error", details: err.message });
  }
});

app.get("/reviews", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM review");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//sara's template Week 5 task 1
app.get("/Mostexpensive", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT F.feature, L.title, L.description, L.price, L.username FROM features as F JOIN listings as L on F.listing_title = L.title JOIN (SELECT F.feature, MAX(L.price) as max_price FROM features as F JOIN listings as L on F.listing_title = L.title GROUP BY F.feature) as max_price_table ON F.feature = max_price_table.feature AND L.price = max_price_table.max_price ORDER by F.feature, L.price DESC");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//Week 5 task 2
app.post('/PostTwoFeatureRentals', async (req, res) => {
  console.log("Post features comparison request received:", req.body);
  
  const { feature1, feature2 } = req.body;

  try {
    const sql = `
      SELECT DISTINCT l1.username 
      FROM listings l1 
      JOIN features f1 ON l1.title = f1.listing_title 
      JOIN listings l2 ON l1.username = l2.username AND l1.Date = l2.Date AND l1.id <> l2.id 
      JOIN features f2 ON l2.title = f2.listing_title 
      WHERE LOWER(f1.feature) = ? AND LOWER(f2.feature) = ?
    `;

    const [rows] = await db.promise().execute(sql, [
      feature1.toLowerCase(),
      feature2.toLowerCase()
    ]);

    res.json(rows);
    console.log("Success:", rows);
  } catch (err) {
    console.error("Insertion of two comparative features Error:", err);
    res.status(500).send("Server error");
  }
});


//sara's template Week 5 task 3
app.get("/FetchExcellentReviews", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT l.title, l.description, l.price, l.feature, l.price, l.date, l.username FROM listings l JOIN review r ON r.title = l.title GROUP BY l.id, l.title, l.description, l.price HAVING COUNT(l.title) =  (SUM(CASE  WHEN r.rating NOT IN ('Excellent', 'Good') THEN 1 ELSE 0 END) = 0 )");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch excellent reviews:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//sara's template Week 5 task 4 users
app.get("/mostRentals", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT username FROM (SELECT username, COUNT(*) as total_count FROM listings WHERE Date = '2025-04-15' GROUP BY username) as user_counts WHERE total_count = (SELECT MAX(total_count) FROM (SELECT COUNT(*) as total_count FROM listings WHERE Date = '2025-04-15' GROUP BY username) as all_rental_counts)");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch most rentals:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//sara's template Week 5 task  users
app.get("/badReviews", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT username FROM review GROUP BY username HAVING COUNT(*) = SUM(rating = 'Poor')");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch bad reviews:", err);
    res.status(500).json({ error: "Database error" });
  }
});

//sara's template Week 5 task 6 users
app.get("/noBadReviews", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT L.username FROM listings as L LEFT JOIN review as R ON L.title = R.title AND R.rating = 'Poor' GROUP BY L.username HAVING COUNT(R.title) = 0");
    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch users with no poor reviews:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(3000, () => {
  console.log("server is running");
});