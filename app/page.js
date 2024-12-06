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
    setError(null);

    if (!query?.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      if (data.results.length === 0) {
        setError("No results found");
        setResults([]);
      } else {
        setError(null);
        setResults(data.results);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setError("An error occurred while searching");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilterChange = (filters) => {
    // Your existing filter logic
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 transition-colors duration-200">
            Compass
          </h1>
          <p className="text-lg text-indigo-400 dark:text-indigo-300 transition-colors duration-200">
            Navigate Your Knowledge
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />
        <SearchFilters onFilterChange={handleFilterChange} />

        {error && (
          <div className="text-center text-rose-600 dark:text-rose-400 my-4 transition-colors duration-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-indigo-600 dark:text-indigo-400 transition-colors duration-200">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mx-auto"></div>
          </div>
        ) : (
          !error && <SearchResults results={results} />
        )}
      </div>
    </main>
  );
}
