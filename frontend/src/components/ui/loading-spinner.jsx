import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A simple loading spinner component.
 * @param {object} props - Component props.
 * @param {number} props.size - The size of the icon (default: 24).
 * @param {string} props.className - Additional Tailwind classes.
 */
export function LoadingSpinner({ size = 24, className }) {
  return (
    <Loader2
      className={cn("animate-spin text-muted-foreground", className)}
      size={size}
    />
  );
}
