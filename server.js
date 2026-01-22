// server.js
const express = require('express');
const path = require('path');
const sql = require('mssql');

const app = express();

// Serve static files (HTML, JS, CSS) dari folder public
app.use(express.static(path.join(__dirname, 'public')));

// Route utama untuk dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API untuk tarik data student dari Azure SQL
app.get('/api/students', async (req, res) => {
  try {
    const pool = await sql.connect(process.env.DB_CONNECTION);
    const result = await pool.request().query('SELECT * FROM Students');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database query failed');
  }
});

// Port untuk Azure
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
