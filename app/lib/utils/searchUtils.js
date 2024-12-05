export const searchUtils = {
  buildSearchParams: (options = {}) => {
    const params = new URLSearchParams();

    if (options.query) {
      params.append("q", options.query.trim());
    }

    if (options.page) {
      params.append("page", options.page);
    }

    if (options.limit) {
      params.append("limit", options.limit);
    }

    if (options.sortBy) {
      params.append("sortBy", options.sortBy);
    }

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            value.forEach((v) => params.append(key, v));
          } else if (typeof value === "object") {
            params.append(key, JSON.stringify(value));
          } else {
            params.append(key, value);
          }
        }
      });
    }

    return params.toString();
  },

  parseSearchResults: (results) => {
    return results.map((result) => ({
      ...result,
      id: result._id.toString(),
      createdAt: new Date(result.createdAt).toLocaleDateString(),
      highlightedContent: searchUtils.highlightSearchTerms(
        result.content,
        result.searchTerm
      ),
    }));
  },

  highlightSearchTerms: (content, searchTerm) => {
    if (!searchTerm) return content;

    const terms = searchTerm.split(" ").filter(Boolean);
    let highlightedContent = content;

    terms.forEach((term) => {
      const regex = new RegExp(`(${term})`, "gi");
      highlightedContent = highlightedContent.replace(regex, "<mark>$1</mark>");
    });

    return highlightedContent;
  },

  getSearchSuggestions: async (query) => {
    try {
      const response = await fetch(`/api/search/suggestions?q=${query}`);
      if (!response.ok) throw new Error("Failed to get suggestions");
      const data = await response.json();
      return data.suggestions;
    } catch (error) {
      console.error("Error getting search suggestions:", error);
      return [];
    }
  },

  generateSearchAnalytics: (results, query) => {
    return {
      query,
      timestamp: new Date().toISOString(),
      resultCount: results.length,
      categories: [...new Set(results.map((r) => r.category))],
      dateRange: {
        earliest: results.reduce(
          (min, r) => (r.createdAt < min ? r.createdAt : min),
          results[0]?.createdAt
        ),
        latest: results.reduce(
          (max, r) => (r.createdAt > max ? r.createdAt : max),
          results[0]?.createdAt
        ),
      },
    };
  },
};

// lib/utils/formatters.js
export const formatters = {
  date: (date, format = "medium") => {
    const options = {
      short: { month: "short", day: "numeric", year: "numeric" },
      medium: {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      },
      long: {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
    };

    return new Date(date).toLocaleDateString(undefined, options[format]);
  },

  number: (number, options = {}) => {
    return new Intl.NumberFormat(undefined, options).format(number);
  },

  truncate: (text, length = 100) => {
    if (text.length <= length) return text;
    return text.slice(0, length).trim() + "...";
  },

  capitalize: (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  },

  pluralize: (count, singular, plural) => {
    return count === 1 ? singular : plural || `${singular}s`;
  },

  bytesToSize: (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  },
};
