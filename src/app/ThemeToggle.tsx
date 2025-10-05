"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = theme === "dark";

  // Ensure component is only rendered on client after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Avoid hydration mismatch by not rendering until mounted
    return null;
  }


  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-[10px] rounded-full bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FaSun className="text-yellow-400" size={30} />
      ) : (
        <FaMoon className="text-white" size={30} />
      )}
    </button>
  );
}
