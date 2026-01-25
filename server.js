const express = require('express');
const path = require('path');
const sql = require('mssql');

const app = express();

// Serve static files dari root folder
app.use(express.static(__dirname));

// Route utama
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ===============================
// AZURE SQL CONFIG
// ===============================
const dbConfig = {
  connectionString: process.env.DB_CONNECTION,
  options: {
    encrypt: true
  }
};

// ===============================
// API: FETCH STUDENTS FROM SQL
// ===============================
app.get('/api/students', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .query('SELECT StudentID, Name, Program, AverageScore, AverageAttendance, RiskLevel FROM dbo.Students');

    res.json(result.recordset);

  } catch (err) {
    console.error("Database query failed:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});

// Azure port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



