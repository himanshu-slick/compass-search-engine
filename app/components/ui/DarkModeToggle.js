// app/components/ui/DarkModeToggle.js
"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "dark");
    }
  };

  // Initialize dark mode based on local storage or system preference
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode");
    if (
      darkMode === "dark" ||
      (!darkMode && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      <Sun className="h-5 w-5 hidden dark:block text-gray-200" />
      <Moon className="h-5 w-5 block dark:hidden text-gray-600" />
    </button>
  );
}
