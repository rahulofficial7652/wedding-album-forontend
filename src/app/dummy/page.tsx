import PhotoGrid from "@/components/client/PhotoGrid";
import { Photo } from "@/types/photo";

const dummyPhotos: Photo[] = Array.from({ length: 20 }).map((_, i) => ({
  id: String(i),
  url: `https://picsum.photos/800/600?random=${i}`,
  thumbnailUrl: `https://picsum.photos/300/200?random=${i}`,
  src: `https://picsum.photos/800/600?random=${i}`,
  width: 800,
  height: 600,
  alt: `Wedding photo ${i}`,
  title: `Photo ${i}`,
}));

export default function Page() {
  return (
    <div className="p-4">
      <PhotoGrid photos={dummyPhotos} />
    </div>
  );
}