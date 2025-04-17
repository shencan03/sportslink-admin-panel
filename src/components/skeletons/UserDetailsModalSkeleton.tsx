import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function UserDetailsModalSkeleton() {
  return (
    <Dialog open>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <Skeleton className="h-7 w-48" /> {/* User name */}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info Section */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" /> {/* Email label */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" /> {/* Email icon */}
                <Skeleton className="h-5 w-48" /> {/* Email */}
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-16" /> {/* Phone label */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" /> {/* Phone icon */}
                <Skeleton className="h-5 w-36" /> {/* Phone */}
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-20" /> {/* Location label */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" /> {/* Location icon */}
                <Skeleton className="h-5 w-40" /> {/* Location */}
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-24" /> {/* Join Date label */}
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" /> {/* Calendar icon */}
                <Skeleton className="h-5 w-32" /> {/* Join date */}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
            <div className="space-y-1 text-center">
              <Skeleton className="h-8 w-16 mx-auto" /> {/* Events count */}
              <Skeleton className="h-4 w-32 mx-auto" /> {/* Organized Events */}
            </div>
            <div className="space-y-1 text-center">
              <Skeleton className="h-8 w-16 mx-auto" />{" "}
              {/* Participation count */}
              <Skeleton className="h-4 w-32 mx-auto" />{" "}
              {/* Participated Events */}
            </div>
          </div>

          {/* Interests Section */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-20" /> {/* Interests label */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>

          {/* Events Section */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-32" /> {/* Events label */}
              <Skeleton className="h-9 w-32" /> {/* View all button */}
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <Skeleton className="h-5 w-48" /> {/* Event title */}
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4" /> {/* Location icon */}
                          <Skeleton className="h-4 w-32" /> {/* Location */}
                        </div>
                      </div>
                      <Skeleton className="h-6 w-20" /> {/* Sport badge */}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
