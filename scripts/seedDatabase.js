import mongoose from "mongoose";
import { mockDatabase } from "./data/mockData.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.local";
dotenv.config({ path: join(dirname(__dirname), envFile) });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB...");
    console.log(`Using environment: ${process.env.NODE_ENV || "development"}`);

    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 60000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    // Create the schema with indexes
    const searchSchema = new mongoose.Schema(
      {
        title: { type: String, required: true, index: true },
        content: { type: String, required: true, index: true },
        category: { type: String, required: true, index: true },
        tags: [{ type: String, index: true }],
        author: String,
        metadata: {
          language: String,
          rating: Number,
        },
      },
      { timestamps: true }
    );

    // Create text index
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
        name: "SearchIndex",
      }
    );

    // Remove existing model if it exists to prevent OverwriteModelError
    mongoose.deleteModel(/.*/, "");

    const Search = mongoose.model("Search", searchSchema);

    // Clear existing data
    console.log("Clearing existing data...");
    await Search.deleteMany({});

    // Insert mock data
    console.log("Inserting mock data...");
    const result = await Search.insertMany(mockDatabase);

    // Ensure indexes are created
    await Search.createIndexes();

    console.log(`Successfully inserted ${result.length} documents`);
    console.log("Indexes created successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Database connection closed");
    process.exit(0);
  }
}

seedDatabase();
