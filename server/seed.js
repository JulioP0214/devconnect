const mongoose = require("mongoose");
require("dotenv").config();

const Category = require("./models/Category");

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await Category.deleteMany({});

    await Category.insertMany([
      { name: "HTML & CSS" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Node.js" },
      { name: "Databases" },
    ]);

    console.log("Categories added successfully");

    await mongoose.connection.close();
  } catch (error) {
    console.log("Error adding categories:", error);
  }
}

seedCategories();
