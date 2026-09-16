const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

router.get("/category/:categoryId", async function (req, res) {
  try {
    const questions = await Question.find({
      category: req.params.categoryId,
    })
      .populate("user", "username")
      .sort({ createdAt: 1 });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/", async function (req, res) {
  try {
    const { title, body, category, user } = req.body;

    if (!title || !body || !category || !user) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newQuestion = new Question({
      title: title,
      body: body,
      category: category,
      user: user,
    });

    await newQuestion.save();

    res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
