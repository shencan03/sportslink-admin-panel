import { SportType } from "@/lib/sport-icons";

export interface Event {
  id: string;
  title: string;
  location: string;
  startDateTime: string; // ISO string
  endDateTime: string; // ISO string
  sportType: SportType;
  currentParticipants: number;
  maxParticipants: number;
  status: "active" | "upcoming" | "past";
  organizerId: string;
}

export interface EventStatus {
  isActive: boolean;
  isUpcoming: boolean;
  elapsedTime: number; // milliseconds since start
  remainingTime: number; // milliseconds until start/end
  formattedElapsedTime: string; // human readable format
  formattedRemainingTime: string; // human readable format
}

export interface EventService {
  getCurrentEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event>;
  getEventStatus(event: Event): EventStatus;
}
