"use client";

import { useSelectionStore } from "@/store/useSelectionStore";

export default function SelectionBar() {
  const selected = useSelectionStore((s) => s.selected);

  if (selected.size === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-xl bg-black px-6 py-3 text-white">
      <span>{selected.size} selected</span>
      <button className="rounded bg-green-500 px-4 py-1">Submit</button>
    </div>
  );
}
