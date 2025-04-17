// src/components/organisms/Sidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  RiDashboardLine,
  RiUser3Line,
  RiCalendarEventLine,
  RiFlag2Line,
  RiPieChartLine,
  RiNewspaperLine,
  RiFileList3Line,
  RiUserSettingsLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: RiDashboardLine },
  { name: "Users", href: "/users", icon: RiUser3Line },
  { name: "Events", href: "/events", icon: RiCalendarEventLine },
  { name: "Reports", href: "/reports", icon: RiFlag2Line },
  { name: "Analysis", href: "/analysis", icon: RiPieChartLine },
  { name: "News", href: "/news", icon: RiNewspaperLine },
  { name: "Logs", href: "/logs", icon: RiFileList3Line },
  { name: "Profile", href: "/profile", icon: RiUserSettingsLine },
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 transform bg-white px-2 py-4 shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-800 lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="mb-6 flex items-center justify-center">
        <span className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          SportsLink Admin
        </span>
      </div>
      <nav className="mt-10 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-200"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/30"
              )}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
