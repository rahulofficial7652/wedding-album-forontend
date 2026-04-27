import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function apiMessage(resOrErr: any, fallback: string = ""): string {
  if (!resOrErr) return fallback;
  
  // Extract from Axios Error
  if (resOrErr.response?.data?.message && typeof resOrErr.response.data.message === "string") {
    return resOrErr.response.data.message;
  }
  
  // Extract from Axios Success Response
  if (resOrErr.data?.message && typeof resOrErr.data.message === "string") {
    return resOrErr.data.message;
  }
  
  // Generic error message if present
  if (resOrErr.message && typeof resOrErr.message === "string" && !resOrErr.response) {
    return resOrErr.message;
  }

  return fallback;
}
