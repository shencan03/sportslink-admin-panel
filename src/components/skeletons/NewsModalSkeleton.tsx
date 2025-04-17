import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export function NewsModalSkeleton() {
  return (
    <Dialog open>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <Skeleton className="h-7 w-48" /> {/* Modal title */}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" /> {/* Title label */}
            <Skeleton className="h-10 w-full" /> {/* Title input */}
          </div>

          {/* Summary Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" /> {/* Summary label */}
            <Skeleton className="h-24 w-full" /> {/* Summary textarea */}
          </div>

          {/* Content Field */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" /> {/* Content label */}
            <Skeleton className="h-48 w-full" /> {/* Content textarea */}
          </div>

          {/* Type and Status Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" /> {/* Type label */}
              <Skeleton className="h-10 w-full" /> {/* Type select */}
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" /> {/* Status label */}
              <Skeleton className="h-10 w-full" /> {/* Status select */}
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" /> {/* Image label */}
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-center">
                <Skeleton className="h-40 w-full rounded-lg" />{" "}
                {/* Image preview */}
              </div>
              <div className="flex justify-center">
                <Skeleton className="h-9 w-32" /> {/* Upload button */}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Skeleton className="h-9 w-24" /> {/* Cancel button */}
            <Skeleton className="h-9 w-24" /> {/* Save button */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
