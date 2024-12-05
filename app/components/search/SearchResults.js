// app/components/search/SearchResults.js
"use client";

export default function SearchResults({ results, loading }) {
  if (!results?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          No results found. Try different search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div
          key={result.id || index}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2 text-indigo-600">
            {result.title}
          </h3>
          <p className="text-gray-600 mb-4">{result.content}</p>
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span className="bg-indigo-100 px-3 py-1 rounded-full">
              {result.category}
            </span>
            {result.author && <span>by {result.author}</span>}
            {result.tags && result.tags.length > 0 && (
              <div className="flex gap-2">
                {result.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="text-indigo-400">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
