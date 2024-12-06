export default function SearchResults({ results }) {
  if (!results?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg font-medium">
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
          <h3 className="text-xl font-bold mb-2 text-indigo-600">
            {result.title}
          </h3>
          <p className="text-gray-600 mb-4">{result.content}</p>

          {/* Bottom metadata section with improved mobile layout */}
          <div className="flex flex-col space-y-3">
            {/* Category and author row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex bg-indigo-100 px-3 py-1 rounded-full text-sm font-medium text-indigo-800">
                {result.category}
              </span>
              {result.author && (
                <span className="text-sm text-gray-500">
                  by {result.author}
                </span>
              )}
            </div>

            {/* Tags row with proper wrapping */}
            {result.tags && result.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-sm text-indigo-500 hover:text-indigo-600 transition-colors"
                  >
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
