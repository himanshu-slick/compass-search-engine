"use client";

import { useState, useEffect } from "react";
import { Clock, X } from "lucide-react";

export default function SearchHistory({ onSelect }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToHistory = (query) => {
    const newHistory = [query, ...history.filter((h) => h !== query)].slice(
      0,
      5
    );
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const removeFromHistory = (query) => {
    const newHistory = history.filter((h) => h !== query);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  if (!history.length) return null;

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-500 mb-2">
        Recent Searches
      </h3>
      <div className="space-y-2">
        {history.map((query, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
          >
            <button
              className="flex items-center text-gray-600 hover:text-gray-900"
              onClick={() => onSelect(query)}
            >
              <Clock className="h-4 w-4 mr-2" />
              <span>{query}</span>
            </button>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => removeFromHistory(query)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
