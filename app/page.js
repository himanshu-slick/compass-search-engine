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

  const handleFilterChange = (filters) => {
    // Filter the results based on selected filters
    let filteredResults = results.filter((item) => {
      // Category filter
      if (
        filters.category &&
        filters.category !== "all" &&
        item.category !== filters.category
      ) {
        return false;
      }

      // Author filter
      if (
        filters.author &&
        filters.author !== "all" &&
        item.author !== filters.author
      ) {
        return false;
      }

      // Rating filter
      if (filters.rating && filters.rating !== "all") {
        const minRating = parseFloat(filters.rating);
        if (item.metadata.rating < minRating) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting
    if (filters.sortBy) {
      filteredResults = [...filteredResults].sort((a, b) => {
        switch (filters.sortBy) {
          case "rating-high":
            return b.metadata.rating - a.metadata.rating;
          case "rating-low":
            return a.metadata.rating - b.metadata.rating;
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    setResults(filteredResults);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-600 dark:text-indigo-400 tracking-tight">
            Compass
          </h1>
          <p className="text-xl md:text-2xl font-medium text-indigo-400 dark:text-indigo-300">
            Navigate Your Knowledge
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />
        <SearchFilters onFilterChange={handleFilterChange} />

        {error && (
          <div className="text-center text-rose-600 dark:text-rose-400 my-4 font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-indigo-600 dark:text-indigo-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
          </div>
        ) : (
          <SearchResults results={results} />
        )}
      </div>
    </main>
  );
}
