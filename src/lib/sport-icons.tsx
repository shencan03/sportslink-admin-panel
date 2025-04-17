import { IoFootball, IoBasketball, IoTennisball } from "react-icons/io5";
import {
  FaPersonSwimming,
  FaPersonRunning,
  FaBicycle,
  FaDumbbell,
} from "react-icons/fa6";
import { GiVolleyballBall } from "react-icons/gi";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type SportType =
  | "Futbol"
  | "Basketbol"
  | "Tenis"
  | "Yüzme"
  | "Voleybol"
  | "Koşu"
  | "Bisiklet"
  | "Fitness";

export const sportIcons = {
  Futbol: IoFootball,
  Basketbol: IoBasketball,
  Tenis: IoTennisball,
  Yüzme: FaPersonSwimming,
  Voleybol: GiVolleyballBall,
  Koşu: FaPersonRunning,
  Bisiklet: FaBicycle,
  Fitness: FaDumbbell,
} as const;

interface SportBadgeProps {
  sport: SportType;
  className?: string;
  variant?: "default" | "secondary" | "outline";
}

export function SportBadge({
  sport,
  className,
  variant = "default",
}: SportBadgeProps) {
  const Icon = sportIcons[sport];

  return (
    <Badge
      variant={variant}
      className={cn("flex items-center gap-1.5 px-2 py-0.5", className)}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      <span>{sport}</span>
    </Badge>
  );
}
