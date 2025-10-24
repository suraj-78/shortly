import * as React from "react"
import { toast as sonnerToast } from "sonner" // Using sonner for toast

const useToast = () => {
  const toast = ({
    title,
    description,
    variant = "default",
    ...props
  }) => {
    if (variant === "destructive") {
      sonnerToast.error(title || "Error", {
        description: description,
        ...props,
      })
    } else {
      sonnerToast.success(title || "Success", {
        description: description,
        ...props,
      })
    }
  }

  return { toast }
}

// Sonner's Toaster will be used directly, so we just export useToast
export { useToast }
