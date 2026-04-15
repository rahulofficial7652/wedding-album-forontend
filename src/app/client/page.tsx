// app/(client)/page.tsx

import PhotoGrid from "@/components/client/PhotoGrid";
import SelectionBar from "@/components/client/SelectionBar";

const dummyPhotos = Array.from({ length: 20 }).map((_, i) => {
  const height = 400 + Math.floor(Math.random() * 400); // Random height between 400 and 800
  return {
    id: String(i),
    url: `https://picsum.photos/800/${height}?random=${i}`,
    thumbnailUrl: `https://picsum.photos/300/${Math.floor(height * 300 / 800)}?random=${i}`,
    src: `https://picsum.photos/800/${height}?random=${i}`,
    width: 800,
    height: height,
    alt: `Wedding photo ${i}`,
    title: `Photo ${i}`,
  };
});

export default function Page() {
  return (
    <div className="p-4">
      <PhotoGrid photos={dummyPhotos} />
      <SelectionBar />
    </div>
  );
}