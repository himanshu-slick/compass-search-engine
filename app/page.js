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
    // Clear previous errors and results when starting a new search
    setError(null);

    // Don't search if query is empty
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

      // Only set error if no results found
      if (data.results.length === 0) {
        setError("No results found");
        setResults([]);
      } else {
        // Clear error and set results if we found something
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
    // Clear error when applying filters
    setError(null);

    // Your existing filter logic here
    let filteredResults = results.filter((item) => {
      if (
        filters.category &&
        filters.category !== "all" &&
        item.category !== filters.category
      ) {
        return false;
      }

      if (
        filters.author &&
        filters.author !== "all" &&
        item.author !== filters.author
      ) {
        return false;
      }

      if (filters.rating && filters.rating !== "all") {
        const minRating = parseFloat(filters.rating);
        if (item.metadata.rating < minRating) {
          return false;
        }
      }

      return true;
    });

    // Sort results if specified
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

    // Set error if filters result in no matches
    if (filteredResults.length === 0) {
      setError("No results match the selected filters");
    }

    setResults(filteredResults);
  };

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
        <SearchFilters onFilterChange={handleFilterChange} />

        {error && <div className="text-center text-rose-600 my-4">{error}</div>}

        {loading ? (
          <div className="text-center text-indigo-600">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : (
          !error && <SearchResults results={results} />
        )}
      </div>
    </main>
  );
}
