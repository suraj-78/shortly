import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind classes with clsx for conditional class names.
 * @param {...(string | object | Array)} inputs - Class names.
 * @returns {string} The merged class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
