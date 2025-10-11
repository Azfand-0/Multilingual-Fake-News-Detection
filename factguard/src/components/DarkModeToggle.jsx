import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      title="Toggle Dark Mode"
    >
      {isDark ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-gray-700" />
      )}
    </button>
  );
};

export default DarkModeToggle;
