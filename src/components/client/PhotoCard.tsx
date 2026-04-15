// components/client/PhotoCard.tsx
"use client";

import Image from "next/image";
import { useSelectionStore } from "@/store/useSelectionStore";
import { Check } from "lucide-react";
import { Photo } from "@/types/photo";
import CommentInput from "./CommentInput";

interface Props {
  photo: Photo;
  onPreview: (photo: Photo) => void;
}

export default function PhotoCard({ photo, onPreview }: Props) {
  const toggle = useSelectionStore((s) => s.toggle);
  const isSelected = useSelectionStore((s) => s.isSelected(photo.id));

  return (
    <div className="relative group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden">
      <div onClick={() => toggle(photo.id)}>
        <Image
          src={photo.thumbnailUrl}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="w-full h-auto"
        />

        {/* Overlay */}
        

        {/* Selected */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-green-500 p-1 rounded-full">
            <Check className="text-white w-4 h-4" />
          </div>
        )}

        {/* Preview Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview(photo);
          }}
          className="absolute bottom-15 left-2 text-xs bg-white px-2 py-1 rounded opacity-0 group-hover:opacity-100"
        >
          View
        </button>
      </div>

      <div className="p-2 ">
        <CommentInput photoId={photo.id} />
      </div>
    </div>
  );
}
