-- Create analytics view for student performance and risk classification
CREATE VIEW StudentAnalyticsView AS
SELECT 
    s.Name,
    s.Program,
    AVG(p.QuizScore) AS AverageScore,
    AVG(p.Attendance) AS AverageAttendance,
    CASE
        WHEN AVG(p.QuizScore) < 60 THEN 'High Risk'
        WHEN AVG(p.QuizScore) < 75 THEN 'Medium Risk'
        ELSE 'Low Risk'
    END AS RiskLevel
FROM Students s
JOIN Performance p ON s.StudentID = p.StudentID
GROUP BY s.Name, s.Program;

