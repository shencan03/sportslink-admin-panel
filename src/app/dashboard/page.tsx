// src/app/dashboard/page.tsx
"use client";

import MainLayout from "@/components/templates/MainLayout";
import {
  RiUser3Line,
  RiCalendarEventLine,
  RiFlag2Line,
  RiNewspaperLine,
} from "react-icons/ri";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const userData = [
  { name: "Jan", users: 400 },
  { name: "Feb", users: 600 },
  { name: "Mar", users: 800 },
  { name: "Apr", users: 1000 },
  { name: "May", users: 1400 },
  { name: "Jun", users: 2000 },
];

const eventsData = [
  { name: "Jan", events: 20 },
  { name: "Feb", events: 35 },
  { name: "Mar", events: 45 },
  { name: "Apr", events: 60 },
  { name: "May", events: 75 },
  { name: "Jun", events: 90 },
];

const statCards = [
  {
    title: "Total Users",
    value: "2,834",
    change: "+12.5%",
    positive: true,
    icon: RiUser3Line,
    color: "bg-blue-500",
  },
  {
    title: "Active Events",
    value: "195",
    change: "+8.2%",
    positive: true,
    icon: RiCalendarEventLine,
    color: "bg-green-500",
  },
  {
    title: "Reports",
    value: "28",
    change: "-5.1%",
    positive: false,
    icon: RiFlag2Line,
    color: "bg-red-500",
  },
  {
    title: "News Articles",
    value: "42",
    change: "+16.4%",
    positive: true,
    icon: RiNewspaperLine,
    color: "bg-purple-500",
  },
];

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to the SportsLink admin panel
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {card.title}
                </p>
                <p className="mt-1 text-3xl font-semibold text-gray-800 dark:text-white">
                  {card.value}
                </p>
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${card.color}`}
              >
                <card.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`inline-flex items-center text-sm font-medium ${
                  card.positive
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {card.change}
                <span className="ml-1">from last month</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
            User Growth
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
            Event Creation
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="events" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
          Recent Activities
        </h2>
        <div className="flow-root">
          <ul className="-mb-8">
            {[1, 2, 3, 4].map((item, index) => (
              <li key={index}>
                <div className="relative pb-8">
                  {index !== 3 ? (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 ring-8 ring-white dark:ring-gray-800">
                        <RiUser3Line className="h-5 w-5 text-white" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-800 dark:text-white">
                          New user registered{" "}
                          <span className="font-medium">John Doe</span>
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                        3 hours ago
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
