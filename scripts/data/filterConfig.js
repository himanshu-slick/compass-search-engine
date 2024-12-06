// app/lib/data/filterConfig.js

// Extract unique categories from mock data
export const categoryFilters = [
  { id: "all", name: "All Categories" },
  { id: "programming", name: "Programming" },
  { id: "web-development", name: "Web Development" },
  { id: "data-science", name: "Data Science" },
  { id: "artificial-intelligence", name: "AI & Machine Learning" },
  { id: "database", name: "Databases" },
  { id: "technology", name: "Technology" },
];

// Topic/Domain filters based on common tags
export const topicFilters = [
  { id: "frontend", name: "Frontend Development" },
  { id: "backend", name: "Backend Development" },
  { id: "ai", name: "AI & ML" },
  { id: "devops", name: "DevOps" },
  { id: "cloud", name: "Cloud Computing" },
  { id: "security", name: "Security" },
  { id: "data", name: "Data & Analytics" },
];

// Technology filters based on popular tags
export const technologyFilters = [
  { id: "javascript", name: "JavaScript" },
  { id: "python", name: "Python" },
  { id: "react", name: "React" },
  { id: "vue", name: "Vue.js" },
  { id: "mongodb", name: "MongoDB" },
  { id: "docker", name: "Docker" },
  { id: "aws", name: "AWS" },
  { id: "graphql", name: "GraphQL" },
  { id: "typescript", name: "TypeScript" },
];

// Rating ranges
export const ratingFilters = [
  { id: "all", name: "All Ratings" },
  { id: "4.8+", name: "4.8 and above", value: 4.8 },
  { id: "4.5+", name: "4.5 and above", value: 4.5 },
  { id: "4.0+", name: "4.0 and above", value: 4.0 },
];

// Sort options
export const sortOptions = [
  { id: "relevance", name: "Most Relevant" },
  { id: "rating-high", name: "Highest Rated" },
  { id: "rating-low", name: "Lowest Rated" },
  { id: "title-asc", name: "Title (A-Z)" },
  { id: "title-desc", name: "Title (Z-A)" },
];

// Content type based on presence of certain tags or categories
export const contentTypeFilters = [
  { id: "all", name: "All Types" },
  { id: "tutorial", name: "Tutorials" },
  { id: "fundamentals", name: "Fundamentals" },
  { id: "advanced", name: "Advanced Concepts" },
  { id: "guide", name: "Guides & Best Practices" },
];

// Author filters based on frequent contributors
export const authorFilters = [
  { id: "all", name: "All Authors" },
  { id: "john-doe", name: "John Doe" },
  { id: "jane-smith", name: "Jane Smith" },
  { id: "maria-garcia", name: "Maria Garcia" },
  { id: "ryan-chen", name: "Ryan Chen" },
];

// Helper function to apply filters
export function applyFilters(data, filters) {
  return data.filter((item) => {
    // Category filter
    if (
      filters.category &&
      filters.category !== "all" &&
      item.category !== filters.category
    ) {
      return false;
    }

    // Topic filter
    if (
      filters.topic &&
      filters.topic !== "all" &&
      !item.tags.some((tag) => tag.toLowerCase().includes(filters.topic))
    ) {
      return false;
    }

    // Technology filter
    if (
      filters.technology &&
      filters.technology !== "all" &&
      !item.tags.some((tag) => tag.toLowerCase() === filters.technology)
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

    // Author filter
    if (
      filters.author &&
      filters.author !== "all" &&
      item.author !== filters.author
    ) {
      return false;
    }

    // Content type filter
    if (filters.contentType && filters.contentType !== "all") {
      // Add logic for content type detection based on tags or content
      return true;
    }

    return true;
  });
}

// Helper function to sort filtered results
export function sortResults(data, sortBy) {
  const sortedData = [...data];

  switch (sortBy) {
    case "rating-high":
      return sortedData.sort((a, b) => b.metadata.rating - a.metadata.rating);
    case "rating-low":
      return sortedData.sort((a, b) => a.metadata.rating - b.metadata.rating);
    case "title-asc":
      return sortedData.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sortedData.sort((a, b) => b.title.localeCompare(a.title));
    default: // relevance - could implement custom relevance scoring
      return sortedData;
  }
}
