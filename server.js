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

// API untuk tarik data student dari Azure SQL
app.get('/api/students', (req, res) => {
  res.json([
    {
      Name: "Ali",
      Program: "IT",
      AverageScore: 78,
      AverageAttendance: 92,
      RiskLevel: "Medium Risk"
    },
    {
      Name: "Siti",
      Program: "CS",
      AverageScore: 85,
      AverageAttendance: 96,
      RiskLevel: "Low Risk"
    }
  ]);
});

//  try {
   // const pool = await sql.connect(process.env.DB_CONNECTION);
  //  const result = await pool.request().query('SELECT * FROM dbo.Students');
  //  res.json(result.recordset);
 // } catch (err) {
//    console.error("Database query failed:", err);
//    res.status(500).json({
 //     error:"Database query failed"});
//  }
//});

// Port untuk Azure
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
