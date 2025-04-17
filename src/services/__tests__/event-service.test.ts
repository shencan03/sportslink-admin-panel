import { MockEventService } from "../event-service";
import { Event } from "@/types/events";

describe("MockEventService", () => {
  let service: MockEventService;
  let mockEvent: Event;

  beforeEach(() => {
    service = new MockEventService();
    const now = new Date();
    mockEvent = {
      id: "1",
      title: "Test Event",
      location: "Test Location",
      startDateTime: new Date(now.getTime() - 30 * 60000).toISOString(), // 30 mins ago
      endDateTime: new Date(now.getTime() + 60 * 60000).toISOString(), // 1 hour from now
      sportType: "Basketbol",
      currentParticipants: 8,
      maxParticipants: 10,
      status: "active",
      organizerId: "user123",
    };
  });

  describe("getEventStatus", () => {
    it("should return correct status for active event", () => {
      const status = service.getEventStatus(mockEvent);

      expect(status.isActive).toBe(true);
      expect(status.elapsedTime).toBeGreaterThan(0);
      expect(status.remainingTime).toBeGreaterThan(0);
      expect(status.formattedElapsedTime).toMatch(/\d+d \d+s/);
    });

    it("should return inactive status for future event", () => {
      const futureEvent = {
        ...mockEvent,
        startDateTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour in future
        endDateTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours in future
      };

      const status = service.getEventStatus(futureEvent);

      expect(status.isActive).toBe(false);
      expect(status.elapsedTime).toBe(0);
      expect(status.remainingTime).toBe(0);
      expect(status.formattedElapsedTime).toBe("0s");
    });

    it("should return inactive status for past event", () => {
      const pastEvent = {
        ...mockEvent,
        startDateTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        endDateTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      };

      const status = service.getEventStatus(pastEvent);

      expect(status.isActive).toBe(false);
      expect(status.elapsedTime).toBe(0);
      expect(status.remainingTime).toBe(0);
      expect(status.formattedElapsedTime).toBe("0s");
    });
  });

  describe("getCurrentEvents", () => {
    it("should return mock events", async () => {
      const events = await service.getCurrentEvents();

      expect(events).toHaveLength(1);
      expect(events[0].status).toBe("active");
      expect(events[0].sportType).toBe("Basketbol");
    });
  });

  describe("getEventById", () => {
    it("should return event by id", async () => {
      const event = await service.getEventById("1");

      expect(event).toBeDefined();
      expect(event.id).toBe("1");
    });

    it("should throw error for non-existent event", async () => {
      await expect(service.getEventById("999")).rejects.toThrow(
        "Event with id 999 not found"
      );
    });
  });
});
