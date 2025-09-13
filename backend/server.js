// --- Libraries ---
const path = require('path');         // Helps with file and folder paths
const express = require('express');   // Web framework for HTTP requests
const { Pool } = require('pg');       // PostgreSQL client
const cors = require('cors');         // Enable cross-origin requests
const dotenv = require('dotenv');     // Load environment variables from .env
const bcrypt = require('bcrypt');     // Secure password hashing
const jwt = require('jsonwebtoken');  // Create and verify authentication tokens


dotenv.config(); // Load environment variables (DB credentials, JWT secret)

// --- Express app setup ---
const app = express();
app.use(cors());         // Allow frontend to call backend
app.use(express.json()); // Parse JSON request bodies

// --- PostgreSQL connection pool ---
// Make sure you have a local PostgreSQL server running (pgAdmin) and your DB exists
// .env variables: DB_HOST=localhost, DB_USER=your_pg_user, DB_PASSWORD=your_pg_password, DB_NAME=your_db, DB_PORT=5432
const isRender = process.env.DB_HOST.includes("render.com");

const db = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: isRender ? { rejectUnauthorized: false } : false
});







// --- Middleware ---

// Protect routes that require authentication
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error("JWT verification error:", err);
        res.status(401).json({ error: "Invalid token" });
    }
};


// --- Routes ---

// Register a new user
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: "Missing fields" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // hash password
        const sql = `
            INSERT INTO users (username, email, password_hash)
            VALUES ($1, $2, $3) RETURNING id
        `;
        const result = await db.query(sql, [username, email, hashedPassword]);
        res.json({ success: true, id: result.rows[0].id });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: "Error registering user" });
    }
});

// Login existing user
// Login existing user
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) 
        return res.status(400).json({ error: "Missing fields" });

    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) 
            return res.json({ success: false, message: 'User not found' });

        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password_hash);

        if (match) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid password' });
        }
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Error logging in" });
    }
});



// Get all transactions for authenticated user
app.get('/transactions', authenticate, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC',
            [req.userId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Fetch transactions error:", err);
        res.status(500).json({ error: "Error fetching transactions" });
    }
});

// Add a new transaction
app.post('/transactions', authenticate, async (req, res) => {
    const { amount, type, description, date } = req.body;

    if (!amount || !type || !date) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const sql = `
            INSERT INTO transactions (user_id, amount, type, date, description)
            VALUES ($1, $2, $3, $4, $5) RETURNING id
        `;
        const result = await db.query(sql, [req.userId, amount, type, date, description]);
        res.json({ success: true, id: result.rows[0].id });
    } catch (err) {
        console.error("Add transaction error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete transactions
app.delete('/transactions', authenticate, async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0)
        return res.status(400).json({ success: false, message: "No IDs provided" });

    const placeholders = ids.map((_, i) => `$${i + 1}`).join(',');
    const sql = `DELETE FROM transactions WHERE id IN (${placeholders}) AND user_id = $${ids.length + 1}`;

    try {
        const result = await db.query(sql, [...ids, req.userId]);
        res.json({ success: true, deleted: result.rowCount });
    } catch (err) {
        console.error("Delete transactions error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});



// get transactions totals for specific user, separated by income and expenses
app.get('/transactions/amounts', authenticate, async (req, res) => {
    try {
        const sql = `
            SELECT
                COALESCE(SUM(CASE WHEN type = 'income' THEN amount END), 0) AS income_total,
                COALESCE(SUM(CASE WHEN type = 'expense' THEN amount END), 0) AS expense_total
            FROM transactions
            WHERE user_id = $1
        `;
        const result = await db.query(sql, [req.userId]);
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error fetching totals:", err);
        res.status(500).json({ error: "Error fetching totals" });
    }
});






app.post("/logout", (req, res) => {
  res.clearCookie("token"); // only if you stored JWT in cookies
  res.sendStatus(200);
});



// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
