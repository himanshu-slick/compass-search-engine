import { useState, useCallback } from "react";
import { searchUtils } from "../utils/searchUtils";

export function useSearch() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const search = useCallback(async (query, options = {}) => {
    if (!query?.trim()) {
      setResults([]);
      setMetadata((prev) => ({ ...prev, total: 0, totalPages: 0 }));
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const searchParams = searchUtils.buildSearchParams({
        query,
        page: options.page || 1,
        limit: options.limit || 10,
        filters: options.filters,
        sortBy: options.sortBy,
      });

      const response = await fetch(`/api/search?${searchParams}`);

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();

      setResults(data.results);
      setMetadata({
        total: data.pagination.total,
        page: data.pagination.page,
        limit: data.pagination.limit,
        totalPages: data.pagination.pages,
      });

      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const nextPage = useCallback(() => {
    if (metadata.page < metadata.totalPages) {
      return search(results[0]?.query, {
        page: metadata.page + 1,
        limit: metadata.limit,
      });
    }
  }, [metadata, results, search]);

  const previousPage = useCallback(() => {
    if (metadata.page > 1) {
      return search(results[0]?.query, {
        page: metadata.page - 1,
        limit: metadata.limit,
      });
    }
  }, [metadata, results, search]);

  return {
    results,
    loading,
    error,
    metadata,
    search,
    nextPage,
    previousPage,
    setResults,
    setMetadata,
  };
}
