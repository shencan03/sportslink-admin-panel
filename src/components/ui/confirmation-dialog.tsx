import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  actionLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  variant?: "default" | "destructive" | "warning" | "info";
  isLoading?: boolean;
}

const variantStyles = {
  default: {
    icon: CheckCircle2,
    iconClass: "text-primary",
    buttonVariant: "default" as const,
  },
  destructive: {
    icon: AlertCircle,
    iconClass: "text-destructive",
    buttonVariant: "destructive" as const,
  },
  warning: {
    icon: AlertTriangle,
    iconClass: "text-yellow-500",
    buttonVariant: "secondary" as const,
  },
  info: {
    icon: Info,
    iconClass: "text-blue-500",
    buttonVariant: "secondary" as const,
  },
};

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  actionLabel,
  cancelLabel = "İptal",
  onConfirm,
  onCancel,
  variant = "default",
  isLoading = false,
}: ConfirmationDialogProps) {
  const { icon: Icon, iconClass, buttonVariant } = variantStyles[variant];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={cn("h-5 w-5", iconClass)} />
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onCancel?.();
              onOpenChange(false);
            }}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={buttonVariant}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            disabled={isLoading}
          >
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
