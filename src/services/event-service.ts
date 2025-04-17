import { Event, EventService, EventStatus } from "@/types/events";

export class MockEventService implements EventService {
  private formatElapsedTime(milliseconds: number): string {
    if (milliseconds <= 0) return "0s";

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}s ${minutes % 60}d ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}d ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  private formatRemainingTime(milliseconds: number): string {
    if (milliseconds <= 0) return "0s";

    const seconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}s ${minutes % 60}d ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}d ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }

  getEventStatus(event: Event): EventStatus {
    const now = new Date().getTime();
    const startTime = new Date(event.startDateTime).getTime();
    const endTime = new Date(event.endDateTime).getTime();

    const isActive = now >= startTime && now <= endTime;
    const isUpcoming = now < startTime;
    const elapsedTime = isActive ? now - startTime : 0;
    const remainingTime = isUpcoming
      ? startTime - now
      : isActive
      ? endTime - now
      : 0;

    return {
      isActive,
      isUpcoming,
      elapsedTime,
      remainingTime,
      formattedElapsedTime: this.formatElapsedTime(elapsedTime),
      formattedRemainingTime: this.formatRemainingTime(remainingTime),
    };
  }

  async getCurrentEvents(): Promise<Event[]> {
    const now = new Date();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // Create events relative to current time
    const mockEvents: Event[] = [
      {
        id: "1",
        title: "Basketbol Maçı (10sn sonra başlayacak)",
        location: "Ana Saha",
        startDateTime: new Date(now.getTime() + 10000).toISOString(), // Starts in 10 seconds
        endDateTime: new Date(now.getTime() + 3610000).toISOString(), // Lasts 1 hour
        sportType: "Basketbol",
        currentParticipants: 8,
        maxParticipants: 10,
        status: "upcoming",
        organizerId: "user123",
      },
      {
        id: "2",
        title: "Aktif Futbol Maçı",
        location: "Futbol Sahası",
        startDateTime: new Date(now.getTime() - 1800000).toISOString(), // Started 30 mins ago
        endDateTime: new Date(now.getTime() + 1800000).toISOString(), // Ends in 30 mins
        sportType: "Futbol",
        currentParticipants: 20,
        maxParticipants: 22,
        status: "active",
        organizerId: "user123",
      },
      {
        id: "3",
        title: "Voleybol Turnuvası (2dk sonra)",
        location: "Spor Salonu",
        startDateTime: new Date(now.getTime() + 120000).toISOString(), // Starts in 2 minutes
        endDateTime: new Date(now.getTime() + 7200000).toISOString(), // Lasts 2 hours
        sportType: "Voleybol",
        currentParticipants: 10,
        maxParticipants: 12,
        status: "upcoming",
        organizerId: "user123",
      },
    ];

    return mockEvents;
  }

  async getEventById(id: string): Promise<Event> {
    const events = await this.getCurrentEvents();
    const event = events.find((e) => e.id === id);
    if (!event) {
      throw new Error(`Event with id ${id} not found`);
    }
    return event;
  }
}
