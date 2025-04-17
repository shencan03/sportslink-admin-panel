import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Badge } from "./badge";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    joinDate: string;
    imageUrl?: string;
    status: "Aktif" | "Pasif";
    interests: string[];
    stats: {
      organized: number;
      participated: number;
    };
  };
}

export function UserProfileModal({
  isOpen,
  onClose,
  user,
}: UserProfileModalProps) {
  // Get initials for avatar fallback
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Kullanıcı Detayları</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* User Header */}
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.imageUrl} alt={user.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <Badge
                  variant={user.status === "Aktif" ? "success" : "secondary"}
                >
                  {user.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                (Profili Görüntüle)
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{user.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Katılım: {user.joinDate}</span>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium">İlgi Alanları</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <Badge key={interest} variant="outline">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{user.stats.organized}</div>
              <div className="text-xs text-muted-foreground">Düzenlenen</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {user.stats.participated}
              </div>
              <div className="text-xs text-muted-foreground">Katılınan</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
