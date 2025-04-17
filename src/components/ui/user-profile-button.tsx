import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";

interface UserProfileButtonProps {
  name: string;
  imageUrl?: string;
  onClick?: () => void;
  className?: string;
}

export function UserProfileButton({
  name,
  imageUrl,
  onClick,
  className,
}: UserProfileButtonProps) {
  // Get initials from name for avatar fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-accent/50",
        className
      )}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <span className="text-base font-medium">{name}</span>
      <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
    </button>
  );
}
