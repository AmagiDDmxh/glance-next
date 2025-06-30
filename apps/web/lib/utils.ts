import type { HSLColor } from "@glance/shared";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hslString(hsl?: HSLColor | string) {
  if (typeof hsl === "string") {
    return hsl;
  }

  if (!hsl) {
    return;
  }
  const { h, s, l } = hsl;
  return `hsl(${h}, ${s}%, ${l}%)`;
}
