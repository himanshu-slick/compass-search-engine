export default function SearchResults({ results }) {
  if (!results?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
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
                   transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold mb-2 text-indigo-600 dark:text-indigo-400 tracking-tight">
            {result.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 font-medium">
            {result.content}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
            <span
              className="bg-indigo-100 dark:bg-indigo-900 px-3 py-1 rounded-full
                         text-indigo-700 dark:text-indigo-300"
            >
              {result.category}
            </span>
            {result.author && (
              <span className="text-gray-500 dark:text-gray-400">
                by {result.author}
              </span>
            )}
            {result.tags && result.tags.length > 0 && (
              <div className="flex gap-2">
                {result.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-indigo-400 dark:text-indigo-300"
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
