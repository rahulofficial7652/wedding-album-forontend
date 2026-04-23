import PhotoGrid from "@/components/client/PhotoGrid";
import SelectionBar from "@/components/client/SelectionBar";
import { Photo } from "@/types/photo";

export default function ClientAlbumPage() {
  const photos: Photo[] = [];

  return (
    <div className="p-4 space-y-4">
      <PhotoGrid photos={photos} />
      <SelectionBar />
    </div>
  );
}
