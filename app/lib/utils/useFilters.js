import { useState, useCallback } from "react";

export function useFilters(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState([]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      if (!value) {
        delete newFilters[key];
      }
      return newFilters;
    });

    setActiveFilters((prev) => {
      if (!value) {
        return prev.filter((filter) => filter.key !== key);
      }
      const exists = prev.find((filter) => filter.key === key);
      if (exists) {
        return prev.map((filter) =>
          filter.key === key ? { ...filter, value } : filter
        );
      }
      return [...prev, { key, value }];
    });
  }, []);

  const clearFilter = useCallback((key) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
    setActiveFilters((prev) => prev.filter((filter) => filter.key !== key));
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setActiveFilters([]);
  }, []);

  return {
    filters,
    activeFilters,
    updateFilter,
    clearFilter,
    clearAllFilters,
  };
}
