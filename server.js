const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

// Maak databaseverbinding
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

// Test databaseverbinding
db.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database");
  connection.release();
});

// Functie om de `createdAt` waarde te berekenen
function calculateCreatedAt(timeOption) {
  const now = new Date();
  let targetDate;

  switch (timeOption) {
    case "zojuist":
      targetDate = now;
      break;
    case "1uur":
      targetDate = new Date(now.getTime() - 1 * 60 * 60 * 1000); // 1 uur geleden
      break;
    case "2uur":
      targetDate = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 uur geleden
      break;
    case "vandaag":
      now.setHours(0, 0, 0, 0);
      targetDate = now;
      break;
    case "gister":
      now.setDate(now.getDate() - 1);
      now.setHours(0, 0, 0, 0);
      targetDate = now;
      break;
    default:
      targetDate = now;
  }

  return targetDate.toISOString().slice(0, 19).replace("T", " ");
}

// Registratie endpoint
app.post("/register", async (req, res) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const checkUserQuery = "SELECT * FROM users WHERE name = ?";
  db.query(checkUserQuery, [name], async (err, result) => {
    if (err) {
      console.error("Database error during user check:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Name already registered." });
    }

    // Hash het wachtwoord en sla gebruiker op
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = "INSERT INTO users (name, phone, password) VALUES (?, ?, ?)";
      db.query(insertQuery, [name, phone, hashedPassword], (err) => {
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

// Login endpoint
app.post("/login", (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Please fill out all fields" });
  }

  const userQuery = "SELECT * FROM users WHERE name = ?";
  db.query(userQuery, [name], async (err, result) => {
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

    res.status(200).json({
      message: `Welcome back, ${user.name}!`,
      user: {
        name: user.name,
        phone: user.phone,
      },
    });
  });
});

app.post("/Gedachtes", (req, res) => {
  const { name, selectedValue, timeValue } = req.body;

  if (!name || !selectedValue || !timeValue) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const createdAt = calculateCreatedAt(timeValue);

  const query = "INSERT INTO gedachtes (name, selectedValue, createdAt) VALUES (?, ?, ?)";
  db.query(query, [name, selectedValue, createdAt], (err) => {
    if (err) {
      console.error("Database error during Gedachte insert:", err);
      return res.status(500).json({ message: "Failed to save Gedachte." });
    }
    res.status(201).json({ message: "Gedachte saved successfully.", createdAt });
  });
});

app.post("/Dromen", (req, res) => {
  const { name, selectedValue, timeValue } = req.body;

  if (!name || !selectedValue || !timeValue) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const createdAt = calculateCreatedAt(timeValue);

  const query = "INSERT INTO dromen (name, selectedValue, createdAt) VALUES (?, ?, ?)";
  db.query(query, [name, selectedValue, createdAt], (err) => {
    if (err) {
      console.error("Database error during Droom insert:", err);
      return res.status(500).json({ message: "Failed to save Droom." });
    }
    res.status(201).json({ message: "Droom saved successfully.", createdAt });
  });
});

// Gedachtes ophalen
app.get("/Gedachtes/:name", (req, res) => {
  const { name } = req.params;

  const query = "SELECT selectedValue, createdAt FROM gedachtes WHERE name = ?";
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error("Database error during Gedachtes retrieval:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ gedachtes: results });
  });
});

// Dromen ophalen
app.get("/Dromen/:name", (req, res) => {
  const { name } = req.params;

  const query = "SELECT selectedValue, createdAt FROM dromen WHERE name = ?";
  db.query(query, [name], (err, results) => {
    if (err) {
      console.error("Database error during Dromen retrieval:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ dromen: results });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
