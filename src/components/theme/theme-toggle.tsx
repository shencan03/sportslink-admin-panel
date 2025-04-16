"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative
        flex
        h-6
        w-12
        cursor-pointer
        items-center
        rounded-full
        border
        border-transparent
        transition-all
        duration-700
        ease-in-out
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-slate-400
        hover:border-slate-300
        ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}
      `}
      aria-label="Toggle theme"
    >
      <div
        className={`
          absolute
          left-0.5
          flex
          h-5
          w-5
          transform
          items-center
          justify-center
          rounded-full
          bg-white
          shadow-sm
          transition-all
          duration-700
          ease-in-out
          will-change-transform
          ${theme === "dark" ? "translate-x-6" : "translate-x-0"}
        `}
      >
        <div className="relative h-3 w-3">
          <Sun
            className={`
              absolute
              left-0
              top-0
              h-3
              w-3
              transform
              text-amber-500
              transition-all
              duration-700
              ease-in-out
              ${
                theme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }
            `}
          />
          <Moon
            className={`
              absolute
              left-0
              top-0
              h-3
              w-3
              transform
              text-slate-700
              transition-all
              duration-700
              ease-in-out
              ${
                theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"
              }
            `}
          />
        </div>
      </div>
    </button>
  );
}
