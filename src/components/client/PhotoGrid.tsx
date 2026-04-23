"use client";

import { useState } from "react";
import { Photo } from "@/types/photo";
import PreviewModal from "./PreviewModal";
import PhotoCard from "./PhotoCard";

interface Props {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: Props) {
  const [preview, setPreview] = useState<Photo | null>(null);

  if (photos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
        No photos are available yet.
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 w-full gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {photos.map((photo) => (
          <div key={photo.id} className="mb-4 break-inside-avoid">
            <PhotoCard photo={photo} onPreview={setPreview} />
          </div>
        ))}
      </div>

      <PreviewModal photo={preview} onClose={() => setPreview(null)} />
    </>
  );
}
