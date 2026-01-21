CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    Name VARCHAR(100),
    Program VARCHAR(100)
);

CREATE TABLE Performance (
    RecordID INT IDENTITY PRIMARY KEY,
    StudentID INT,
    Attendance INT,
    QuizScore INT,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
);

