"use client";

import { Photo } from "@/types/photo";
import { useState } from "react";
import PreviewModal from "./PreviewModal";
import PhotoCard from "./PhotoCard";

interface Props {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: Props) {
  const [preview, setPreview] = useState<Photo | null>(null);

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 w-full">
        {photos.map((photo) => (
          <div key={photo.id} className="break-inside-avoid mb-4">
            <PhotoCard photo={photo} onPreview={setPreview} />
          </div>
        ))}
      </div>

      <PreviewModal photo={preview} onClose={() => setPreview(null)} />
    </>
  );
}