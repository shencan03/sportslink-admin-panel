"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Mail,
  MapPin,
  Plus,
  Users,
  Clock,
  AlertCircle,
  User,
  UserCircle2,
  Filter,
  Activity,
} from "lucide-react";
import {
  UserDetailsModal,
  type UserProfile,
} from "@/components/modals/UserDetailsModal";
import { useRouter, useSearchParams } from "next/navigation";
import { type SportType, SportBadge, sportIcons } from "@/lib/sport-icons";
import { EventCardSkeleton } from "@/components/skeletons/EventCardSkeleton";
import React from "react";

interface Event {
  id: string;
  title: string;
  location: string;
  dateTime: string;
  sportType: SportType;
  requirements: string[];
  maxParticipants: number;
  currentParticipants: number;
  pendingRequests: number;
  status: "upcoming" | "past";
  organizer: {
    type: "user" | "admin";
    name: string;
    id: string;
  };
}

// Dummy users data (in real app, this would be fetched from API)
const dummyUsers: UserProfile[] = [
  {
    id: "user123",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@example.com",
    phone: "+90 532 123 4567",
    location: "İstanbul, Beşiktaş",
    joinDate: "2024-01-15",
    role: "user",
    status: "active",
    organizedEvents: 5,
    participatedEvents: 12,
    interests: ["Futbol", "Basketbol", "Voleybol"],
  },
  {
    id: "admin456",
    name: "Mehmet Demir",
    email: "mehmet.demir@sportlink.com",
    phone: "+90 533 765 4321",
    location: "İstanbul, Kadıköy",
    joinDate: "2023-11-01",
    role: "admin",
    status: "active",
    organizedEvents: 25,
    participatedEvents: 8,
    interests: ["Futbol", "Basketbol", "Tenis", "Yüzme"],
  },
  {
    id: "user789",
    name: "Zeynep Kaya",
    email: "zeynep.kaya@example.com",
    phone: "+90 535 987 6543",
    location: "İstanbul, Şişli",
    joinDate: "2024-02-01",
    role: "user",
    status: "active",
    organizedEvents: 3,
    participatedEvents: 15,
    interests: ["Tenis", "Yüzme", "Voleybol"],
  },
  {
    id: "user234",
    name: "Can Özkan",
    email: "can.ozkan@example.com",
    phone: "+90 536 234 5678",
    location: "İstanbul, Sarıyer",
    joinDate: "2024-01-20",
    role: "user",
    status: "active",
    organizedEvents: 8,
    participatedEvents: 20,
    interests: ["Basketbol", "Futbol"],
  },
];

// Dummy events data
const dummyEvents: Event[] = [
  {
    id: "1",
    title: "Halı Saha Maçı",
    location: "Bosna Hersek Spor Tesisleri",
    dateTime: "2024-03-25T18:00:00",
    sportType: "Futbol",
    requirements: ["18 yaş üstü", "Halı saha ayakkabısı zorunlu"],
    maxParticipants: 14,
    currentParticipants: 8,
    pendingRequests: 3,
    status: "upcoming",
    organizer: {
      type: "user",
      name: "Ahmet Yılmaz",
      id: "user123",
    },
  },
  {
    id: "2",
    title: "Basketbol Turnuvası",
    location: "Selçuk Üniversitesi Spor Salonu",
    dateTime: "2024-03-20T15:30:00",
    sportType: "Basketbol",
    requirements: ["16 yaş üstü"],
    maxParticipants: 20,
    currentParticipants: 12,
    pendingRequests: 5,
    status: "upcoming",
    organizer: {
      type: "admin",
      name: "Mehmet Demir",
      id: "admin456",
    },
  },
  {
    id: "3",
    title: "Tenis Dersi",
    location: "Yazır Tenis Kulübü",
    dateTime: "2024-03-18T10:00:00",
    sportType: "Tenis",
    requirements: ["Tenis raketi gerekli", "Her seviye"],
    maxParticipants: 8,
    currentParticipants: 6,
    pendingRequests: 2,
    status: "upcoming",
    organizer: {
      type: "user",
      name: "Zeynep Kaya",
      id: "user789",
    },
  },
  {
    id: "4",
    title: "3x3 Basketbol Turnuvası",
    location: "Feritpaşa Gençlik Merkezi",
    dateTime: "2024-03-30T14:00:00",
    sportType: "Basketbol",
    requirements: ["18 yaş üstü", "Takım olarak katılım"],
    maxParticipants: 24,
    currentParticipants: 16,
    pendingRequests: 4,
    status: "upcoming",
    organizer: {
      type: "user",
      name: "Can Özkan",
      id: "user234",
    },
  },
  {
    id: "5",
    title: "Yüzme Yarışması",
    location: "Selçuklu Olimpik Yüzme Havuzu",
    dateTime: "2024-04-05T09:00:00",
    sportType: "Yüzme",
    requirements: ["Lisanslı yüzücüler", "Sağlık raporu zorunlu"],
    maxParticipants: 32,
    currentParticipants: 24,
    pendingRequests: 8,
    status: "upcoming",
    organizer: {
      type: "admin",
      name: "Mehmet Demir",
      id: "admin456",
    },
  },
];

export default function EventsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | SportType>("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "upcoming" | "ongoing" | "past"
  >("all");
  const [organizerFilter, setOrganizerFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [highlightedEventId, setHighlightedEventId] = useState<string | null>(
    null
  );
  const eventRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const searchParams = useSearchParams();
  const router = useRouter();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate API call delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const highlightId = searchParams.get("highlight");
    if (highlightId) {
      setHighlightedEventId(highlightId);
      // Clear the URL parameter after getting it
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);

      // Scroll to the highlighted event
      setTimeout(() => {
        const eventElement = eventRefs.current[highlightId];
        if (eventElement) {
          eventElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);

      // Clear the highlight after animation
      setTimeout(() => {
        setHighlightedEventId(null);
      }, 2000);
    }
  }, [searchParams]);

  const handleOrganizerClick = (organizerId: string) => {
    const user = dummyUsers.find((u) => u.id === organizerId);
    if (user) {
      setSelectedUser(user);
    }
  };

  const getUserEvents = (userId: string) => {
    return dummyEvents
      .filter((event) => event.organizer.id === userId)
      .map((event) => ({
        id: event.id,
        title: event.title,
        location: event.location,
        dateTime: event.dateTime,
        sportType: event.sportType,
        currentParticipants: event.currentParticipants,
        maxParticipants: event.maxParticipants,
        status: event.status,
        organizerId: event.organizer.id,
      }));
  };

  const handleViewAllEvents = () => {
    if (selectedUser) {
      router.push(`/dashboard/events?organizer=${selectedUser.id}`);
    }
  };

  const filteredEvents = dummyEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.sportType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || event.sportType === typeFilter;
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter;
    const matchesOrganizer =
      organizerFilter === "all" || event.organizer.id === organizerFilter;
    return matchesSearch && matchesType && matchesStatus && matchesOrganizer;
  });

  return (
    <>
      <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex w-full max-w-3xl items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Etkinlik Yönetimi
            </h2>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Etkinlik Ekle
            </Button>
          </div>

          <div className="w-full max-w-3xl space-y-4">
            <Input
              placeholder="Etkinlik ara..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex gap-2">
              <Select
                value={typeFilter}
                onValueChange={(value: "all" | SportType) =>
                  setTypeFilter(value)
                }
              >
                <SelectTrigger className="w-[200px] gap-2 cursor-pointer">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Tür: </span>
                  <span className="font-medium">
                    {typeFilter === "all" ? "Tümü" : typeFilter}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="Futbol">Futbol</SelectItem>
                  <SelectItem value="Basketbol">Basketbol</SelectItem>
                  <SelectItem value="Voleybol">Voleybol</SelectItem>
                  <SelectItem value="Tenis">Tenis</SelectItem>
                  <SelectItem value="Yüzme">Yüzme</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={statusFilter}
                onValueChange={(
                  value: "all" | "upcoming" | "ongoing" | "past"
                ) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-[200px] gap-2 cursor-pointer">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Durum: </span>
                  <span className="font-medium">
                    {statusFilter === "all"
                      ? "Tümü"
                      : statusFilter === "upcoming"
                      ? "Yaklaşan"
                      : statusFilter === "ongoing"
                      ? "Devam Eden"
                      : "Geçmiş"}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="upcoming">Yaklaşan</SelectItem>
                  <SelectItem value="ongoing">Devam Eden</SelectItem>
                  <SelectItem value="past">Geçmiş</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={organizerFilter}
                onValueChange={setOrganizerFilter}
              >
                <SelectTrigger className="w-[200px] gap-2 cursor-pointer">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Organizatör: </span>
                  <span className="font-medium">
                    {organizerFilter === "all" ? "Tümü" : "Seçili"}
                  </span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  {dummyUsers.map((user) => (
                    <SelectItem
                      key={user.id}
                      value={user.id}
                      className="cursor-pointer"
                    >
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {isLoading ? (
            // Show multiple skeleton cards while loading
            <>
              <EventCardSkeleton />
              <EventCardSkeleton />
              <EventCardSkeleton />
            </>
          ) : filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-sm text-muted-foreground">
                  Etkinlik bulunamadı.
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredEvents.map((event) => (
              <Card
                key={event.id}
                ref={(el) => {
                  eventRefs.current[event.id] = el;
                }}
                className={`hover:bg-accent/50 transition-colors ${
                  highlightedEventId === event.id
                    ? "bg-accent animate-pulse"
                    : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{event.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">
                              {new Date(event.dateTime).toLocaleTimeString(
                                "tr-TR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <SportBadge sport={event.sportType as SportType} />
                        <Badge
                          variant={
                            event.status === "upcoming"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {event.status === "upcoming" ? "Yaklaşan" : "Geçmiş"}
                        </Badge>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOrganizerClick(event.organizer.id);
                            }}
                            className="group flex items-center gap-2 hover:bg-accent/50 rounded-lg px-3 py-1.5 transition-colors relative border border-transparent hover:border-primary/20 cursor-pointer"
                          >
                            <UserCircle2 className="h-5 w-5 text-primary" />
                            <span className="font-medium text-primary group-hover:text-primary/80 transition-colors">
                              {event.organizer.name}
                            </span>
                            <span className="absolute left-full ml-2 px-2.5 py-1 text-xs bg-popover border rounded-md shadow-sm opacity-0 group-hover:opacity-100 whitespace-nowrap transition-all translate-x-2 group-hover:translate-x-0">
                              Profili görüntüle
                            </span>
                          </button>
                          <Badge variant="secondary" className="h-6">
                            {event.organizer.type === "admin"
                              ? "Yönetici"
                              : "Kullanıcı"}
                          </Badge>
                        </div>

                        {/* Requirements Section */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Gereksinimler
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {event.requirements.map((req, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-background/50"
                              >
                                <AlertCircle className="h-3 w-3 mr-1" />
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Stats Section */}
                      <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg h-fit">
                        <div className="cursor-pointer hover:bg-accent/50 rounded-lg p-2 transition-colors">
                          <div className="text-2xl font-bold text-primary">
                            {event.currentParticipants}/{event.maxParticipants}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Katılımcı
                          </div>
                        </div>
                        <div className="cursor-pointer hover:bg-accent/50 rounded-lg p-2 transition-colors">
                          <div className="text-2xl font-bold text-primary">
                            {event.pendingRequests}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Bekleyen
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        userEvents={selectedUser ? getUserEvents(selectedUser.id) : []}
      />
    </>
  );
}
