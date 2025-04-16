"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Newspaper,
  Shield,
  Settings,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-gray-500 dark:text-gray-400",
  },
  {
    label: "Kullanıcılar",
    icon: Users,
    href: "/dashboard/users",
    color: "text-gray-500 dark:text-gray-400",
  },
  {
    label: "Etkinlikler",
    icon: Calendar,
    href: "/dashboard/events",
    color: "text-gray-500 dark:text-gray-400",
  },
  {
    label: "Haberler",
    icon: Newspaper,
    href: "/dashboard/news",
    color: "text-gray-500 dark:text-gray-400",
  },
  {
    label: "Güvenlik",
    icon: Shield,
    href: "/dashboard/security",
    color: "text-gray-500 dark:text-gray-400",
  },
  {
    label: "Ayarlar",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-gray-500 dark:text-gray-400",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col p-4 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800">
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Admin Panel
          </h1>
          <ThemeToggle />
        </div>
        <nav className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                pathname === route.href
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
