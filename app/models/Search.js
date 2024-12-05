// app/models/Search.js
import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    index: true,
    minLength: [3, "Title must be at least 3 characters long"],
    maxLength: [200, "Title cannot exceed 200 characters"],
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
    index: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: [
        "programming",
        "technology",
        "database",
        "data-science",
        "web-development",
        "artificial-intelligence",
      ],
      message: "{VALUE} is not a supported category",
    },
    index: true,
  },
  // ... rest of the schema
});
