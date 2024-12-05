const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");


require("dotenv").config();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const PORT = process.env.PORT || 5000;

const app = express();


// Middleware
app.use(bodyParser.json());
app.use(cors());

db.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to the Hostinger MySQL database");
    connection.release();
  });

// Register Endpoint
app.post("/register", async (req, res) => {
    const { name, phone, password } = req.body;
  
    if (!name || !phone || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }
  
    const checkUserQuery = "SELECT * FROM users WHERE phone = ?";
    db.query(checkUserQuery, [phone], async (err, result) => {
      if (err) {
          console.error("Database error during user check:", err);
          return res.status(500).json({ message: "Database error" });
      }
  
      if (result.length > 0) {
        return res.status(400).json({ message: "Phone number already registered." });
      }
  
      // Hash the password
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const insertQuery = "INSERT INTO users (name, phone, password) VALUES (?, ?, ?)";
        db.query(insertQuery, [name, phone, hashedPassword], (err, result) => {
          if (err) {
            console.error("Error during user registration:", err);
            return res.status(500).json({ message: "Database error during registration." });
          }
          return res.status(201).json({ message: "User registered successfully" });
        });
      } catch (hashError) {
        console.error("Error hashing password:", hashError);
        return res.status(500).json({ message: "Error hashing password" });
      }
    });
  });

// Login Endpoint
app.post("/login", (req, res) => {
    const { phone, password } = req.body;
  
    if (!phone || !password) {
        return res.status(400).json({ message: "Please fill out all fields" });
    }
  
    const findUserQuery = "SELECT * FROM users WHERE phone = ?";
    db.query(findUserQuery, [phone], async (err, result) => {
      if (err) {
        console.error("Database error during login:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const user = result[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      // Send back user details upon successful login
      res.status(200).json({
        message: `Welcome back, ${user.name}!`,
        user: {
          name: user.name,
          phone: user.phone,
        },
      });
    });
  });
  

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
