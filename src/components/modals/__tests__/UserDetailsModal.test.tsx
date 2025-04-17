import { render, screen, fireEvent, act } from "@testing-library/react";
import { UserDetailsModal } from "../UserDetailsModal";
import { MockEventService } from "@/services/event-service";
import { Event } from "@/types/events";
import { SportType } from "@/lib/sport-icons";

// Mock the next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("UserDetailsModal", () => {
  const mockUser = {
    id: "user123",
    name: "Test User",
    email: "test@example.com",
    phone: "1234567890",
    location: "Test Location",
    joinDate: "2024-01-01",
    role: "user" as const,
    status: "active" as const,
    organizedEvents: 5,
    participatedEvents: 10,
    interests: ["Basketbol", "Futbol"] as SportType[],
  };

  const mockEvents: Event[] = [
    {
      id: "1",
      title: "Active Basketball Game",
      location: "Main Court",
      startDateTime: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
      endDateTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      sportType: "Basketbol",
      currentParticipants: 8,
      maxParticipants: 10,
      status: "active",
      organizerId: "user123",
    },
  ];

  const renderModal = () => {
    return render(
      <UserDetailsModal
        user={mockUser}
        onClose={() => {}}
        userEvents={mockEvents}
      />
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should display user information correctly", () => {
    renderModal();

    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.phone)).toBeInTheDocument();
    expect(screen.getByText(mockUser.location)).toBeInTheDocument();
  });

  it("should display active event with elapsed time", async () => {
    renderModal();

    expect(screen.getByText("Devam Eden Etkinlik")).toBeInTheDocument();
    expect(screen.getByText("Active Basketball Game")).toBeInTheDocument();
    expect(screen.getByText("8/10 Katılımcı")).toBeInTheDocument();

    // Check if elapsed time is displayed and updates
    const initialElapsedTime = screen.getByText(/süredir devam ediyor/);
    expect(initialElapsedTime).toBeInTheDocument();

    // Advance time by 1 minute and check if elapsed time updates
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    const updatedElapsedTime = screen.getByText(/süredir devam ediyor/);
    expect(updatedElapsedTime.textContent).not.toBe(
      initialElapsedTime.textContent
    );
  });

  it("should handle event navigation correctly", () => {
    const { container } = renderModal();

    // Find and click navigation buttons if there are multiple events
    const prevButton = container.querySelector(
      'button[aria-label="Previous event"]'
    );
    const nextButton = container.querySelector(
      'button[aria-label="Next event"]'
    );

    if (prevButton && nextButton) {
      fireEvent.click(prevButton);
      fireEvent.click(nextButton);
    }

    // Verify event details are still displayed
    expect(screen.getByText("Active Basketball Game")).toBeInTheDocument();
  });
});
