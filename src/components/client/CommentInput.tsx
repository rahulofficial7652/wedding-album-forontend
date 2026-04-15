// components/client/CommentInput.tsx
"use client";

import { useSelectionStore } from "@/store/useSelectionStore";

export default function CommentInput({ photoId }: { photoId: string }) {
  const setComment = useSelectionStore((s) => s.setComment);
  const comment = useSelectionStore((s) => s.comments[photoId] || "");

  return (
    <input
      value={comment}
      onChange={(e) => setComment(photoId, e.target.value)}
      placeholder="Add comment..."
      className="w-full mt-2 px-2 py-1 text-xs rounded border"
      onClick={(e) => e.stopPropagation()}
    />
  );
}