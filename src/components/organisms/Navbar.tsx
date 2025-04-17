// src/components/organisms/Navbar.tsx
"use client";

import { useState } from "react";
import {
  RiMenu2Line,
  RiNotification3Line,
  RiLogoutBoxRLine,
  RiMoonLine,
  RiSunLine,
} from "react-icons/ri";
import { useTheme } from "next-themes";

interface NavbarProps {
  onMenuButtonClick: () => void;
}

export default function Navbar({ onMenuButtonClick }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-800 dark:shadow-gray-700/20">
      <div className="flex items-center">
        <button
          onClick={onMenuButtonClick}
          className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
        >
          <RiMenu2Line className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
        <div className="ml-4 text-lg font-medium text-gray-800 dark:text-gray-200">
          SportsLink Admin Panel
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
          <RiNotification3Line className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>

        <button
          onClick={toggleTheme}
          className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {theme === "dark" ? (
            <RiSunLine className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          ) : (
            <RiMoonLine className="h-6 w-6 text-gray-500" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center space-x-2 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
              A
            </div>
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
              <a
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Profile
              </a>
              <a
                href="/login"
                className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
              >
                <RiLogoutBoxRLine className="mr-2 h-4 w-4" />
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
