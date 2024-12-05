// app/components/search/SearchBar.js
"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useDebounce } from "@/app/lib/hooks/useDebounce";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebounce((value) => {
    onSearch(String(value));
  }, 300);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Explore your world..."
          className="w-full px-4 py-4 pl-12 text-lg border-2 border-indigo-300 rounded-full 
                   focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                   transition-all bg-white shadow-lg"
        />
        <SearchIcon className="absolute left-4 top-4 h-6 w-6 text-indigo-400" />
      </div>
    </div>
  );
}
