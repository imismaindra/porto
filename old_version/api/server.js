const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'portfolio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// --- API ENDPOINTS ---

// Get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single project
app.get('/api/projects/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create project
app.post('/api/projects', async (req, res) => {
    const { title, category, badge, sub_title, description, tags, impact_value_1, impact_label_1 } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO projects (title, category, badge, sub_title, description, tags, impact_value_1, impact_label_1) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [title, category, badge, sub_title, description, JSON.stringify(tags), impact_value_1, impact_label_1]
        );
        res.json({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update project
app.put('/api/projects/:id', async (req, res) => {
    const { title, category, badge, sub_title, description, tags, impact_value_1, impact_label_1 } = req.body;
    try {
        await pool.query(
            'UPDATE projects SET title=?, category=?, badge=?, sub_title=?, description=?, tags=?, impact_value_1=?, impact_label_1=? WHERE id=?',
            [title, category, badge, sub_title, description, JSON.stringify(tags), impact_value_1, impact_label_1, req.params.id]
        );
        res.json({ id: req.params.id, ...req.body });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
