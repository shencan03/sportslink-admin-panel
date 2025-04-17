// src/app/events/page.tsx
"use client";

import { useState } from "react";
import MainLayout from "@/components/templates/MainLayout";
import {
  RiSearchLine,
  RiFilterLine,
  RiMore2Line,
  RiCalendarEventLine,
} from "react-icons/ri";
import { formatDate } from "@/utils/dateUtils";

// Mock data
const mockEvents = [
  {
    id: 1,
    name: "Basketball Tournament",
    sport: "Basketball",
    location: "Central Park, Konya",
    organizer: "John Doe",
    date: "2025-04-25",
    time: "14:00",
    status: "Upcoming",
    participants: 12,
  },
  {
    id: 2,
    name: "Sunday Morning Run",
    sport: "Running",
    location: "Riverside Park, Konya",
    organizer: "Sarah Davis",
    date: "2025-04-20",
    time: "08:00",
    status: "Upcoming",
    participants: 8,
  },
  {
    id: 3,
    name: "Volleyball Meetup",
    sport: "Volleyball",
    location: "Beach Volleyball Court, Konya",
    organizer: "Michael Brown",
    date: "2025-04-18",
    time: "16:30",
    status: "Upcoming",
    participants: 14,
  },
  {
    id: 4,
    name: "Cycling Adventure",
    sport: "Cycling",
    location: "Mountain Trail, Konya",
    organizer: "Emily Williams",
    date: "2025-04-15",
    time: "09:00",
    status: "Completed",
    participants: 22,
  },
  {
    id: 5,
    name: "Football Match",
    sport: "Football",
    location: "City Stadium, Konya",
    organizer: "Robert Johnson",
    date: "2025-04-12",
    time: "18:00",
    status: "Completed",
    participants: 24,
  },
  {
    id: 6,
    name: "Tennis Tournament",
    sport: "Tennis",
    location: "Tennis Club, Konya",
    organizer: "Jane Smith",
    date: "2025-04-10",
    time: "10:00",
    status: "Completed",
    participants: 16,
  },
  {
    id: 7,
    name: "Swimming Competition",
    sport: "Swimming",
    location: "Olympic Pool, Konya",
    organizer: "David Miller",
    date: "2025-04-05",
    time: "15:00",
    status: "Cancelled",
    participants: 0,
  },
  {
    id: 8,
    name: "Yoga in the Park",
    sport: "Yoga",
    location: "Meditation Garden, Konya",
    organizer: "Lisa Wilson",
    date: "2025-04-02",
    time: "07:30",
    status: "Completed",
    participants: 18,
  },
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const statusOptions = ["All", "Upcoming", "Completed", "Cancelled"];
  const sportOptions = [
    "All",
    "Basketball",
    "Running",
    "Volleyball",
    "Cycling",
    "Football",
    "Tennis",
    "Swimming",
    "Yoga",
  ];

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || event.status === selectedStatus;
    const matchesSport =
      selectedSport === "All" || event.sport === selectedSport;

    return matchesSearch && matchesStatus && matchesSport;
  });

  return (
    <MainLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Events
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage SportsLink app events
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <RiSearchLine className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            placeholder="Search events by name or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <RiFilterLine className="h-5 w-5 text-gray-400" />
            <select
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <select
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
            >
              {sportOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Sport
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Participants
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {filteredEvents.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                          <RiCalendarEventLine className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {event.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Organized by {event.organizer}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {event.sport}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {event.location}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatDate(event.date)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {event.time}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        event.status === "Upcoming"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : event.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {event.participants}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setSelectedEvent(
                            selectedEvent === event.id ? null : event.id
                          )
                        }
                        className="inline-flex items-center rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700"
                      >
                        <RiMore2Line className="h-5 w-5" />
                      </button>

                      {selectedEvent === event.id && (
                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            View Details
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                          >
                            Edit
                          </a>
                          {event.status === "Upcoming" && (
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                            >
                              Cancel Event
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">8</span> of{" "}
              <span className="font-medium">8</span> results
            </p>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center border border-blue-500 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 dark:border-blue-500 dark:bg-blue-900/30 dark:text-blue-400"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
