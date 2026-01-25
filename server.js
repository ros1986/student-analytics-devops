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
      StudentID: 1,
      Name: "Ali",
      Program: "Computer Science",
      AverageScore: 55,
      AverageAttendance: 70,
      RiskLevel: "High Risk"
    },
    {
      StudentID: 2,
      Name: "Aisyah",
      Program: "Information Systems",
      AverageScore: 68,
      AverageAttendance: 82,
      RiskLevel: "Medium Risk"
    },
    {
      StudentID: 3,
      Name: "Daniel",
      Program: "Data Science",
      AverageScore: 81,
      AverageAttendance: 90,
      RiskLevel: "Low Risk"
    },
    {
      StudentID: 4,
      Name: "Siti",
      Program: "Software Engineering",
      AverageScore: 74,
      AverageAttendance: 76,
      RiskLevel: "Medium Risk"
    },
    {
      StudentID: 5,
      Name: "Amir",
      Program: "Computer Science",
      AverageScore: 88,
      AverageAttendance: 95,
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
