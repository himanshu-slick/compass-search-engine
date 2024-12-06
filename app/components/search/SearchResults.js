export default function SearchResults({ results }) {
  if (!results?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium transition-colors duration-200">
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
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg 
                   transition-all duration-200 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold mb-2 text-indigo-600 dark:text-indigo-400 transition-colors duration-200">
            {result.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-200">
            {result.content}
          </p>

          <div className="flex flex-col space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex bg-indigo-100 dark:bg-indigo-900/50 px-3 py-1 
                           rounded-full text-sm font-medium text-indigo-800 dark:text-indigo-300 
                           transition-colors duration-200"
              >
                {result.category}
              </span>
              {result.author && (
                <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  by {result.author}
                </span>
              )}
            </div>

            {result.tags && result.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {result.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-sm text-indigo-500 dark:text-indigo-400 
                             hover:text-indigo-600 dark:hover:text-indigo-300 
                             transition-colors duration-200"
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
