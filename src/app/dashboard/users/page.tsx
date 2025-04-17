"use client";

import { useState, useEffect, useRef } from "react";
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
import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import {
  UserDetailsModal,
  type UserProfile,
  Event,
} from "@/components/modals/UserDetailsModal";
import { useRouter, useSearchParams } from "next/navigation";
import { type SportType, SportBadge } from "@/lib/sport-icons";
import { UserCardSkeleton } from "@/components/skeletons/UserCardSkeleton";
import { UserDetailsModalSkeleton } from "@/components/skeletons/UserDetailsModalSkeleton";

// Dummy events data - this would come from your API in a real app
const dummyEvents: Event[] = [
  {
    id: "1",
    title: "Soccer Match",
    location: "Sports Complex A",
    dateTime: "2024-03-20T14:00:00",
    sportType: "Soccer",
    currentParticipants: 18,
    maxParticipants: 22,
    status: "upcoming",
    organizerId: "1",
  },
  {
    id: "2",
    title: "Basketball Tournament",
    location: "Indoor Court B",
    dateTime: "2024-03-22T16:00:00",
    sportType: "Basketball",
    currentParticipants: 8,
    maxParticipants: 10,
    status: "upcoming",
    organizerId: "2",
  },
  {
    id: "3",
    title: "Tennis Workshop",
    location: "Tennis Center",
    dateTime: "2024-03-15T10:00:00",
    sportType: "Tennis",
    currentParticipants: 4,
    maxParticipants: 6,
    status: "past",
    organizerId: "1",
  },
  {
    id: "4",
    title: "Swimming Competition",
    location: "Aquatic Center",
    dateTime: "2024-03-25T09:00:00",
    sportType: "Swimming",
    currentParticipants: 15,
    maxParticipants: 20,
    status: "upcoming",
    organizerId: "3",
  },
  {
    id: "5",
    title: "Volleyball Match",
    location: "Beach Court",
    dateTime: "2024-03-18T15:00:00",
    sportType: "Volleyball",
    currentParticipants: 10,
    maxParticipants: 12,
    status: "past",
    organizerId: "2",
  },
];

// Dummy users data - synchronized with events page users
const dummyUsers: UserProfile[] = [
  {
    id: "user123",
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@example.com",
    phone: "+90 532 123 4567",
    location: "Bosna Hersek Mahallesi",
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
    location: "Yazır Mahallesi",
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
    location: "Selçuk Mahallesi",
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
    location: "Feritpaşa Mahallesi",
    joinDate: "2024-01-20",
    role: "user",
    status: "active",
    organizedEvents: 8,
    participatedEvents: 20,
    interests: ["Basketbol", "Futbol"],
  },
];

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "user" | "admin">("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [highlightedUserId, setHighlightedUserId] = useState<string | null>(
    null
  );
  const userRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    const highlightId = searchParams.get("highlight");
    if (highlightId) {
      setHighlightedUserId(highlightId);
      // Clear the URL parameter after getting it
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);

      // Scroll to the highlighted user
      setTimeout(() => {
        const userElement = userRefs.current[highlightId];
        if (userElement) {
          userElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);

      // Clear the highlight after animation
      setTimeout(() => {
        setHighlightedUserId(null);
      }, 2000);
    }
  }, [searchParams]);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Simulate modal loading when a user is selected
  useEffect(() => {
    if (selectedUser) {
      setIsModalLoading(true);
      const timer = setTimeout(() => {
        setIsModalLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedUser]);

  const filteredUsers = dummyUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleViewAllEvents = () => {
    if (selectedUser) {
      // Navigate to events page with filter for the selected user
      router.push(`/dashboard/events?organizer=${selectedUser.id}`);
    }
  };

  const getUserEvents = (userId: string) => {
    return dummyEvents.filter((event) => event.organizerId === userId);
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Kullanıcı Yönetimi
        </h2>

        <div className="w-full max-w-3xl space-y-4">
          <Input
            placeholder="Kullanıcı ara..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <Select
              value={roleFilter}
              onValueChange={(value) =>
                setRoleFilter(value as "all" | "user" | "admin")
              }
              disabled={isLoading}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="admin">Yönetici</SelectItem>
                <SelectItem value="user">Kullanıcı</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as "all" | "active" | "inactive")
              }
              disabled={isLoading}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {isLoading ? (
          <>
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center text-sm text-muted-foreground">
            Kullanıcı bulunamadı.
          </div>
        ) : (
          filteredUsers.map((user) => (
            <Card
              key={user.id}
              ref={(el) => {
                userRefs.current[user.id] = el;
              }}
              className={`hover:bg-accent/50 transition-colors ${
                highlightedUserId === user.id ? "bg-accent animate-pulse" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col space-y-6">
                  {/* Header Section */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-xl font-semibold hover:underline focus:outline-none cursor-pointer"
                        >
                          {user.name}
                        </button>
                      </div>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Mail className="h-4 w-4" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-4 w-4" />
                          <span className="text-sm">{user.phone}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          user.role === "admin" ? "default" : "secondary"
                        }
                      >
                        {user.role === "admin" ? "Yönetici" : "Kullanıcı"}
                      </Badge>
                      <Badge
                        variant={
                          user.status === "active" ? "outline" : "destructive"
                        }
                      >
                        {user.status === "active" ? "Aktif" : "Pasif"}
                      </Badge>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{user.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">
                            Katılım:{" "}
                            {new Date(user.joinDate).toLocaleDateString(
                              "tr-TR"
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">
                          İlgi Alanları
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {user.interests.map((interest) => (
                            <SportBadge
                              key={interest}
                              sport={interest as SportType}
                              variant="outline"
                              className="bg-background/50"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg h-fit">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {user.organizedEvents}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Düzenlenen
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {user.participatedEvents}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Katılınan
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

      {selectedUser && isModalLoading ? (
        <UserDetailsModalSkeleton />
      ) : (
        selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
            userEvents={selectedUser ? getUserEvents(selectedUser.id) : []}
          />
        )
      )}
    </div>
  );
}
