import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Header with Name and Role */}
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <Skeleton className="h-7 w-48" /> {/* Name */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" /> {/* Email icon */}
                  <Skeleton className="h-4 w-40" /> {/* Email */}
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" /> {/* Phone icon */}
                  <Skeleton className="h-4 w-32" /> {/* Phone */}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-20" /> {/* Role badge */}
              <Skeleton className="h-6 w-20" /> {/* Status badge */}
            </div>
          </div>

          {/* User Stats Section */}
          <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
            <div className="cursor-pointer hover:bg-accent/50 rounded-lg p-2 transition-colors">
              <Skeleton className="h-8 w-16 mb-1" /> {/* Events count */}
              <Skeleton className="h-4 w-32" /> {/* Organized Events */}
            </div>
            <div className="cursor-pointer hover:bg-accent/50 rounded-lg p-2 transition-colors">
              <Skeleton className="h-8 w-16 mb-1" /> {/* Participation count */}
              <Skeleton className="h-4 w-32" /> {/* Participated Events */}
            </div>
          </div>

          {/* Location and Join Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" /> {/* Location icon */}
              <Skeleton className="h-4 w-32" /> {/* Location text */}
            </div>
            <div className="flex items-center gap-2 justify-end">
              <Skeleton className="h-4 w-4" /> {/* Calendar icon */}
              <Skeleton className="h-4 w-24" /> {/* Join date */}
            </div>
          </div>

          {/* Interests Section */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" /> {/* Interests label */}
            <div className="flex flex-wrap gap-1.5">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
