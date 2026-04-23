"use client";

import Image from "next/image";
import { Photo } from "@/types/photo";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CommentInput from "./CommentInput";

interface Props {
  photo: Photo | null;
  onClose: () => void;
}

export default function PreviewModal({ photo, onClose }: Props) {
  if (!photo) return null;

  return (
    <Dialog open={!!photo} onOpenChange={onClose}>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto p-0">
        <div className="flex flex-col">
          <Image
            src={photo.url}
            alt={photo.alt}
            width={1000}
            height={800}
            className="h-auto w-full object-contain"
          />
          <div className="space-y-2 p-4">
            <h3 className="text-base font-semibold sm:text-lg">{photo.title}</h3>
            <CommentInput photoId={photo.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
