// --- Libraries ---
const path = require('path');         // Helps work with file/folder paths
const express = require('express');   // Web framework for handling HTTP requests
const mysql = require('mysql2');      // MySQL database library
const cors = require('cors');         // Allows frontend to call backend from another origin
const dotenv = require('dotenv');     // Loads environment variables from .env
const bcrypt = require('bcrypt');     // For hashing passwords securely
const jwt = require('jsonwebtoken');  // For creating and verifying login tokens

dotenv.config(); // Load variables like DB credentials and JWT secret

// --- Express app setup ---
const app = express();
app.use(cors());        // Allow cross-origin requests
app.use(express.json()); // Parse JSON request bodies automatically

// --- MySQL connection pool ---
const db = mysql.createPool({
    host: process.env.DB_HOST,       // Database host
    user: process.env.DB_USER,       // Database username
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME,     // Database name
    waitForConnections: true,
    connectionLimit: 10               // Max simultaneous connections
});
console.log('MySQL pool created');

// --- Auth middleware ---
// Checks login token for protected routes
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Read token from headers
    if(!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.userId = decoded.id; // Save user ID in request for later use
        next(); // Continue to the route handler
    } catch(err){
        console.error("JWT error:", err);
        return res.status(401).json({ error: "Invalid token" });
    }
};

// --- Routes ---

// Register new user
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) return res.status(400).json({ error: "Missing fields" });

    try{
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        const sql = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
        db.query(sql, [username, email, hashedPassword], (err, result) => {
            if(err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: result.insertId }); // Send back new user ID
        });
    } catch(err){
        res.status(500).json({ error: "Error hashing password" });
    }
});

// Login user
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({ error: "Missing fields" });

    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if(err) return res.status(500).json({ error: err.message });
        if(results.length === 0) return res.json({ success: false, message: 'User not found' });

        const user = results[0];
        const match = await bcrypt.compare(password, user.password_hash); // Check password

        if(match){
            // Password correct → create token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid password' });
        }
    });
});

// Get transactions for logged-in user (protected)
app.get('/transactions', authenticate, (req, res) => {
    db.query('SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC', [req.userId], (err, results) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json(results); // Return user's transactions
    });
});

// Add new transaction (protected)
app.post('/transactions', authenticate, (req, res) => {
    const { amount, type, category, description, date } = req.body;
    if(!amount || !type || !category || !date) 
        return res.status(400).json({ success: false, message: "Missing required fields" });

    const sql = 'INSERT INTO transactions (user_id, amount, type, category, date, description) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [req.userId, amount, type, category, date, description], (err, result) => {
        if(err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: result.insertId });
    });
});

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
