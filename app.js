const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models/Student");

const app = express();
const port = 5000;

// Middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // To serve CSS

// MongoDB
mongoose.connect("mongodb://localhost:27017/studentDB");

// Routes
app.get("/", async (req, res) => {
  const students = await Student.find();
  res.render("index", { students });
});

app.post("/add", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.render("edit", { student });
});

app.post("/update/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// Start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
