// app/page.js
"use client";

import { useState, useCallback } from "react";
import SearchBar from "./components/search/SearchBar";
import SearchResults from "./components/search/SearchResults";
import SearchFilters from "./components/search/SearchFilters";

export default function Home() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (query) => {
    // Don't search if query is empty
    if (!query?.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      setResults(data.results);

      if (data.results.length === 0) {
        setError("No results found");
      }
    } catch (error) {
      console.error("Search failed:", error);
      setError("An error occurred while searching");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-2 text-indigo-600">
          Compass
        </h1>
        <p className="text-center mb-8 text-indigo-400">
          Navigate Your Knowledge
        </p>

        <SearchBar onSearch={handleSearch} />
        <SearchFilters onFilterChange={() => {}} />

        {error && <div className="text-center text-rose-600 my-4">{error}</div>}

        {loading ? (
          <div className="text-center text-indigo-600">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : (
          <SearchResults results={results} />
        )}
      </div>
    </main>
  );
}
