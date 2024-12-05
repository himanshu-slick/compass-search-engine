// app/api/search/route.js
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db/mongodb";
import mongoose from "mongoose";

// Define the Search model if it doesn't exist
const Search =
  mongoose.models.Search ||
  mongoose.model(
    "Search",
    new mongoose.Schema(
      {
        title: String,
        content: String,
        category: String,
        tags: [String],
        author: String,
        metadata: {
          language: String,
          rating: Number,
        },
      },
      { timestamps: true }
    )
  );

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({
        results: [],
        message: "No search query provided",
      });
    }

    // Connect to MongoDB
    await connectDB();

    // Create text search query
    const searchResults = await Search.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(10);

    // Log for debugging
    console.log("Search query:", query);
    console.log("Results found:", searchResults.length);

    return NextResponse.json({
      results: searchResults,
      count: searchResults.length,
      query: query,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Search failed", message: error.message },
      { status: 500 }
    );
  }
}
