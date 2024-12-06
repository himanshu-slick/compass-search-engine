import DarkModeToggle from "../ui/DarkModeToggle";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            Search Engine
          </div>
          <nav className="flex items-center space-x-4">
            <a
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              About
            </a>
            <DarkModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
