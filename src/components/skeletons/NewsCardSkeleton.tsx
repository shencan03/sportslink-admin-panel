import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-7 w-64" /> {/* Title */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" /> {/* Calendar icon */}
                  <Skeleton className="h-4 w-24" /> {/* Date */}
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" /> {/* User icon */}
                  <Skeleton className="h-4 w-32" /> {/* Author */}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20" /> {/* Status badge */}
              <Skeleton className="h-8 w-8 rounded-full" />{" "}
              {/* Action button */}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-20" /> {/* Summary label */}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[75%]" />
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24" /> {/* Type badge */}
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24" /> {/* Edit button */}
              <Skeleton className="h-9 w-24" /> {/* Delete button */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
