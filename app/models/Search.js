import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    tags: [
      {
        type: String,
        index: true,
      },
    ],
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

// Only create the model if it doesn't exist
const Search = mongoose.models.Search || mongoose.model("Search", searchSchema);

export default Search;
