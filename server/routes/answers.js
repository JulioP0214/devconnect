const express = require("express");
const Answer = require("../models/Answer");

const router = express.Router();

router.post("/", async function (req, res) {
  try {
    const { body, question, user } = req.body;

    if (!body || !question || !user) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newAnswer = new Answer({
      body: body,
      question: question,
      user: user,
    });

    await newAnswer.save();

    res.status(201).json({
      message: "Answer created successfully",
      answer: newAnswer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/question/:questionId", async function (req, res) {
  try {
    const answers = await Answer.find({
      question: req.params.questionId,
    })
      .populate("user", "username")
      .sort({ createdAt: 1 });

    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
