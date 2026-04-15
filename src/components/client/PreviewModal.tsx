// components/client/PreviewModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Photo } from "@/types/photo";
import CommentInput from "./CommentInput";

interface Props {
  photo: Photo | null;
  onClose: () => void;
}

export default function PreviewModal({ photo, onClose }: Props) {
  if (!photo) return null;

  return (
    <Dialog open={!!photo} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0">
        <div className="flex flex-col">
          <Image
            src={photo.url}
            alt={photo.alt}
            width={1000}
            height={800}
            className="w-full h-auto object-contain"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{photo.title}</h3>
            <CommentInput photoId={photo.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}   