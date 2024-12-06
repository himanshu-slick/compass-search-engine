"use client";

import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";

export default function SearchFilters({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    rating: "",
    tags: [],
    author: "",
    sortBy: "relevance",
  });

  // Extracted from your mock data
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "programming", name: "Programming" },
    { id: "web-development", name: "Web Development" },
    { id: "data-science", name: "Data Science" },
    { id: "artificial-intelligence", name: "AI & Machine Learning" },
    { id: "database", name: "Databases" },
    { id: "technology", name: "Technology" },
  ];

  const authors = [
    { id: "all", name: "All Authors" },
    { id: "John Doe", name: "John Doe" },
    { id: "Jane Smith", name: "Jane Smith" },
    { id: "Mike Johnson", name: "Mike Johnson" },
    { id: "Sarah Wilson", name: "Sarah Wilson" },
    { id: "Maria Garcia", name: "Maria Garcia" },
  ];

  const ratings = [
    { id: "all", name: "All Ratings" },
    { id: "4.8", name: "4.8 & above" },
    { id: "4.5", name: "4.5 & above" },
    { id: "4.0", name: "4.0 & above" },
  ];

  const sortOptions = [
    { id: "relevance", name: "Most Relevant" },
    { id: "rating-high", name: "Highest Rated" },
    { id: "rating-low", name: "Lowest Rated" },
    { id: "title-asc", name: "Title (A-Z)" },
    { id: "title-desc", name: "Title (Z-A)" },
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      category: "",
      rating: "",
      tags: [],
      author: "",
      sortBy: "relevance",
    };
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  const FilterSection = ({ title, options, currentValue, filterKey }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {title}
      </label>
      <select
        value={currentValue}
        onChange={(e) => handleFilterChange(filterKey, e.target.value)}
        className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 
                 text-gray-900 dark:text-gray-100 border-gray-300 
                 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 
                 hover:text-gray-900 dark:hover:text-gray-100"
      >
        <Filter className="h-5 w-5" />
        <span>Filters</span>
        <ChevronDown
          className={`h-4 w-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="mt-4 p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 
                     border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FilterSection
              title="Category"
              options={categories}
              currentValue={filters.category}
              filterKey="category"
            />

            <FilterSection
              title="Author"
              options={authors}
              currentValue={filters.author}
              filterKey="author"
            />

            <FilterSection
              title="Rating"
              options={ratings}
              currentValue={filters.rating}
              filterKey="rating"
            />

            <FilterSection
              title="Sort By"
              options={sortOptions}
              currentValue={filters.sortBy}
              filterKey="sortBy"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t dark:border-gray-700">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                       hover:text-gray-900 dark:hover:text-gray-100"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white 
                       rounded-md hover:bg-indigo-700 focus:outline-none 
                       focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
