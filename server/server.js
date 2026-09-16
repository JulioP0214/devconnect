const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const questionRoutes = require("./routes/questions");
const answerRoutes = require("./routes/answers");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);

app.get("/", function (req, res) {
  res.json({ message: "DevConnect API is running!" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(function () {
    console.log("Connected to MongoDB");
  })
  .catch(function (error) {
    console.log("MongoDB connection error:", error);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});
