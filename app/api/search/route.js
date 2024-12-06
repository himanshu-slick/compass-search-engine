import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db/mongodb";
import Search from "@/app/models/Search";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    // Build search criteria using regex instead of $text
    let searchCriteria = {};

    if (query) {
      const searchRegex = new RegExp(query, "i");
      searchCriteria.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { tags: searchRegex },
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

    const total = await Search.countDocuments(searchCriteria);

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
