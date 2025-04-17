import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  User,
  Users,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { SportBadge, type SportType } from "@/lib/sport-icons";
import { Event, EventStatus } from "@/types/events";
import { MockEventService } from "@/services/event-service";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  organizedEvents: number;
  participatedEvents: number;
  interests: SportType[];
}

interface UserDetailsModalProps {
  user: UserProfile | null;
  onClose: () => void;
  userEvents?: Event[];
}

export function UserDetailsModal({
  user,
  onClose,
  userEvents = [],
}: UserDetailsModalProps) {
  const router = useRouter();
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [eventStatuses, setEventStatuses] = useState<
    Record<string, EventStatus>
  >({});
  const eventService = useMemo(() => new MockEventService(), []);

  // Sort events once when userEvents changes
  const sortedEvents = useMemo(
    () =>
      [...userEvents].sort((a, b) => {
        if (a.status === "active" && b.status !== "active") return -1;
        if (a.status !== "active" && b.status === "active") return 1;
        if (a.status === "upcoming" && b.status === "past") return -1;
        if (a.status === "past" && b.status === "upcoming") return 1;
        return 0;
      }),
    [userEvents]
  );

  // Update event statuses every second
  useEffect(() => {
    if (sortedEvents.length === 0) return;

    const updateStatuses = () => {
      setEventStatuses((prevStatuses) => {
        const newStatuses = { ...prevStatuses };
        sortedEvents.forEach((event) => {
          newStatuses[event.id] = eventService.getEventStatus(event);
        });
        return newStatuses;
      });
    };

    updateStatuses(); // Initial update
    const interval = setInterval(updateStatuses, 1000);

    return () => clearInterval(interval);
  }, [sortedEvents, eventService]);

  const handleViewInUsersList = () => {
    if (user) {
      router.push(`/dashboard/users?highlight=${user.id}`);
      onClose();
    }
  };

  const handleViewEvent = () => {
    if (sortedEvents[currentEventIndex]) {
      router.push(
        `/dashboard/events?highlight=${sortedEvents[currentEventIndex].id}`
      );
      onClose();
    }
  };

  const handlePrevEvent = () => {
    setCurrentEventIndex((prev) =>
      prev > 0 ? prev - 1 : sortedEvents.length - 1
    );
  };

  const handleNextEvent = () => {
    setCurrentEventIndex((prev) =>
      prev < sortedEvents.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <Dialog open={user !== null} onOpenChange={onClose}>
      {user && (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kullanıcı Detayları</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <div className="space-y-4 py-4 pr-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-primary">
                      {user.name}
                    </span>
                    <button
                      onClick={handleViewInUsersList}
                      className="text-xs px-2 py-1 rounded-md border border-primary/20 text-primary/80 hover:bg-primary/10 transition-all cursor-pointer"
                    >
                      Profili Görüntüle
                    </button>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                    >
                      {user.role === "admin" ? "Yönetici" : "Kullanıcı"}
                    </Badge>
                    <Badge
                      variant={user.status === "active" ? "success" : "warning"}
                    >
                      {user.status === "active" ? "Aktif" : "Pasif"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    Katılım:{" "}
                    {new Date(user.joinDate).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">İlgi Alanları</h4>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest, index) => (
                    <SportBadge
                      key={index}
                      sport={interest}
                      variant="outline"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Etkinlik İstatistikleri</h4>
                <div className="grid grid-cols-2 gap-4 bg-black/5 dark:bg-white/5 p-4 rounded-lg">
                  <div>
                    <div className="text-2xl font-bold text-[#22c55e]">
                      {user.organizedEvents}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Düzenlenen
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#22c55e]">
                      {user.participatedEvents}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Katılınan
                    </div>
                  </div>
                </div>
              </div>

              {sortedEvents.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      {eventStatuses[sortedEvents[currentEventIndex]?.id]
                        ?.isActive
                        ? "Devam Eden Etkinlik"
                        : eventStatuses[sortedEvents[currentEventIndex]?.id]
                            ?.isUpcoming
                        ? "Yaklaşan Etkinlik"
                        : "Geçmiş Etkinlik"}
                    </h4>
                  </div>
                  <div className="relative">
                    <div
                      key={sortedEvents[currentEventIndex].id}
                      className="rounded-lg border p-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={handleViewEvent}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium text-[#22c55e] hover:text-[#22c55e]/90">
                            {sortedEvents[currentEventIndex].title}
                          </h5>
                          <div className="flex items-center text-muted-foreground text-sm mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(
                              sortedEvents[currentEventIndex].startDateTime
                            ).toLocaleString("tr-TR", {
                              dateStyle: "long",
                              timeStyle: "short",
                            })}
                          </div>
                          <div className="flex items-center text-muted-foreground text-sm mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {sortedEvents[currentEventIndex].location}
                          </div>
                          {eventStatuses[sortedEvents[currentEventIndex]?.id]
                            ?.isActive && (
                            <div className="flex items-center text-[#22c55e] text-sm mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {
                                eventStatuses[
                                  sortedEvents[currentEventIndex].id
                                ].formattedElapsedTime
                              }{" "}
                              süredir devam ediyor
                            </div>
                          )}
                          {eventStatuses[sortedEvents[currentEventIndex]?.id]
                            ?.isUpcoming && (
                            <div className="flex items-center text-amber-500 text-sm mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {
                                eventStatuses[
                                  sortedEvents[currentEventIndex].id
                                ].formattedRemainingTime
                              }{" "}
                              sonra başlayacak
                            </div>
                          )}
                        </div>
                        <SportBadge
                          sport={sortedEvents[currentEventIndex].sportType}
                          variant="outline"
                        />
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mt-2">
                        <Users className="h-3 w-3" />
                        {sortedEvents[currentEventIndex].currentParticipants}/
                        {sortedEvents[currentEventIndex].maxParticipants}{" "}
                        Katılımcı
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-center cursor-pointer">
                        (Etkinliğe Git)
                      </div>
                    </div>
                    {sortedEvents.length > 1 && (
                      <div className="flex justify-between items-center mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:text-[#22c55e] cursor-pointer"
                          onClick={handlePrevEvent}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {currentEventIndex + 1} / {sortedEvents.length}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:text-[#22c55e] cursor-pointer"
                          onClick={handleNextEvent}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      )}
    </Dialog>
  );
}
