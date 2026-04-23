"use client";

import { Input } from "@/components/ui/input";
import { useSelectionStore } from "@/store/useSelectionStore";

export default function CommentInput({ photoId }: { photoId: string }) {
  const setComment = useSelectionStore((s) => s.setComment);
  const comment = useSelectionStore((s) => s.comments[photoId] || "");

  return (
    <Input
      value={comment}
      onChange={(e) => setComment(photoId, e.target.value)}
      placeholder="Add comment..."
      className="mt-2 h-8 text-xs"
      onClick={(e) => e.stopPropagation()}
    />
  );
}
