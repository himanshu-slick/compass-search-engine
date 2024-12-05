// scripts/seedDatabase.js
const mongoose = require("mongoose");

// Define the Search schema here directly to avoid import issues
const searchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      index: true,
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
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    metadata: {
      language: {
        type: String,
        default: "en",
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

searchSchema.index(
  {
    title: "text",
    content: "text",
    tags: "text",
  },
  {
    weights: {
      title: 10,
      content: 5,
      tags: 3,
    },
  }
);

// Create the Search model
const Search = mongoose.model("Search", searchSchema);

// Mock data
const mockData = [
  {
    title: "Introduction to JavaScript Programming",
    content:
      "JavaScript is a versatile programming language used for web development. It allows you to create interactive and dynamic websites.",
    category: "programming",
    tags: ["javascript", "web development", "coding"],
    author: "John Doe",
    metadata: {
      language: "en",
      rating: 4.5,
    },
  },
  {
    title: "React.js Fundamentals",
    content:
      "Learn the core concepts of React.js including components, state, props, and hooks.",
    category: "web-development",
    tags: ["react", "javascript", "frontend"],
    author: "Jane Smith",
    metadata: {
      language: "en",
      rating: 4.8,
    },
  },
  // ... rest of your mock data
];

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect("mongodb://localhost:27017/search-engine");
    console.log("Connected successfully!");

    // Clear existing data
    console.log("Clearing existing data...");
    await Search.deleteMany({});
    console.log("Existing data cleared!");

    // Insert mock data
    console.log("Inserting mock data...");
    const result = await Search.insertMany(mockData);
    console.log(`Successfully inserted ${result.length} documents`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    console.log("Database connection closed");
    await mongoose.disconnect();
  }
}

// Run the seed function
seedDatabase();
