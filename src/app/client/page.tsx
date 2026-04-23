import PhotoGrid from "@/components/client/PhotoGrid";
import SelectionBar from "@/components/client/SelectionBar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Photo } from "@/types/photo";

export default function ClientAlbumPage() {
  const photos: Photo[] = [];

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Rahul & Simran Wedding Album</CardTitle>
          <CardDescription>
            Tap images to shortlist your favorites and leave notes for final delivery.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PhotoGrid photos={photos} />
        </CardContent>
      </Card>
      <SelectionBar />
    </div>
  );
}
