// server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Save/update contribution rate
app.post('/api/contribution-rate', async (req, res) => {
  const { userId, type, amount } = req.body;
  try {
    await pool.query(
      `INSERT INTO contribution_rates (user_id, type, amount)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id) DO UPDATE SET type = $2, amount = $3`,
      [userId, type, amount]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch contribution rate for user
app.get('/api/contribution-rate', async (req, res) => {
  const { userId } = req.query;
  try {
    const result = await pool.query(
      `SELECT type, amount FROM contribution_rates WHERE user_id = $1`,
      [userId]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.json({ type: 'percentage', amount: 0 });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
