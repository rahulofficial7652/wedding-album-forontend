"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { Photo } from "@/types/photo";
import { useSelectionStore } from "@/store/useSelectionStore";
import { Button } from "@/components/ui/button";
import CommentInput from "./CommentInput";

interface Props {
  photo: Photo;
  onPreview: (photo: Photo) => void;
}

export default function PhotoCard({ photo, onPreview }: Props) {
  const toggle = useSelectionStore((s) => s.toggle);
  const isSelected = useSelectionStore((s) => s.isSelected(photo.id));

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card shadow-xs transition hover:shadow-md">
      <div onClick={() => toggle(photo.id)} className="relative cursor-pointer">
        <Image
          src={photo.thumbnailUrl}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          className="h-auto w-full"
        />

        {isSelected && (
          <div className="absolute right-2 top-2 rounded-full bg-primary p-1 text-primary-foreground shadow-sm">
            <Check className="h-4 w-4" />
          </div>
        )}

        <Button
          type="button"
          size="xs"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onPreview(photo);
          }}
          className="absolute bottom-2 left-2 opacity-0 transition-opacity group-hover:opacity-100"
        >
          View
        </Button>
      </div>

      <div className="p-2">
        <CommentInput photoId={photo.id} />
      </div>
    </div>
  );
}
