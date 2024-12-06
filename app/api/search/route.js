// app/api/search/route.js
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db/mongodb";
import mongoose from "mongoose";

// Define Search Model
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

export async function GET(request, { params }) {
  try {
    // Get the search parameters using searchParams() method
    const searchParams = new URL(request.url).searchParams;
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    // Connect to MongoDB
    await connectDB();

    // Build search criteria
    let searchCriteria = {};

    if (query) {
      searchCriteria.$or = [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } },
      ];
    }

    if (category) {
      searchCriteria.category = category;
    }

    // Execute search
    const results = await Search.find(searchCriteria)
      .sort({ "metadata.rating": -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Search.countDocuments(searchCriteria);

    // Return response
    return NextResponse.json({
      results,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
      query,
      category,
    });
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { error: "Search failed", message: error.message },
      { status: 500 }
    );
  }
}
