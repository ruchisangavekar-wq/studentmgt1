const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Student = require("./models/Student");

const app = express();
app.use(cors());
app.use(express.json());

// Hardcoded configuration (No .env file needed)
const MONGO_URI = "mongodb+srv://sangavekarruchi_db_user:uVo7quYf2gHBN2Vh@cluster0.xm4it3w.mongodb.net/?appName=Cluster0";
const PORT = process.env.PORT || 5000; // Uses Render's dynamic port in production, or 5000 locally

app.get("/", (req, res) => {   // test route
  res.send("MERN Backend is Running");
});

app.post("/api/students", async (req, res) => { // Add student
  try {
    const { username, rollno } = req.body;
    if (!username || !rollno) {
      return res.status(400).json({
        message: "Username and Roll Number are required"
      });
    }
    const student = new Student({ username, rollno });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

app.get("/api/students", async (req, res) => { // Get all students
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Connect MongoDB and Start Server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:");
    console.log(error);
  });