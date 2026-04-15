import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// utils/dummyPhotos.ts
// utils/dummyPhotos.ts

const aspectRatios = [
  [1, 1],    // square
  [3, 4],    // portrait
  [4, 5],    // tall portrait
  [9, 16],   // very tall
  [16, 9],   // landscape
  [4, 3],    // normal landscape
];

export const dummyPhotos = Array.from({ length: 50 }).map((_, i) => {
  const [wRatio, hRatio] = aspectRatios[i % aspectRatios.length];

  const width = 400;
  const height = Math.round((hRatio / wRatio) * width);

  return {
    id: String(i),
    src: `https://picsum.photos/${width}/${height}?random=${i}`,
    width,
    height,
  };
});