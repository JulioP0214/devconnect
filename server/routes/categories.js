const express = require("express");
const Category = require("../models/Category");

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
