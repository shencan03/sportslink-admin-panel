import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <Skeleton className="h-7 w-64" /> {/* Title */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" /> {/* Location icon */}
                  <Skeleton className="h-4 w-32" /> {/* Location text */}
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" /> {/* Time icon */}
                  <Skeleton className="h-4 w-16" /> {/* Time text */}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24" /> {/* Sport badge */}
              <Skeleton className="h-6 w-20" /> {/* Status badge */}
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              {/* Organizer Section */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" /> {/* User icon */}
                  <Skeleton className="h-5 w-32" /> {/* Organizer name */}
                </div>
                <Skeleton className="h-6 w-20" /> {/* Role badge */}
              </div>

              {/* Requirements Section */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" /> {/* Requirements label */}
                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="h-6 w-36" />
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg h-fit">
              <div className="cursor-pointer hover:bg-accent/50 rounded-lg p-2 transition-colors">
                <Skeleton className="h-8 w-20 mb-1" /> {/* Participant count */}
                <Skeleton className="h-4 w-16" /> {/* Participant label */}
              </div>
              <div className="cursor-pointer hover:bg-accent/50 rounded-lg p-2 transition-colors">
                <Skeleton className="h-8 w-8 mb-1" /> {/* Pending count */}
                <Skeleton className="h-4 w-16" /> {/* Pending label */}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
