// components/client/SelectionBar.tsx
"use client";

import { useSelectionStore } from "@/store/useSelectionStore";

export default function SelectionBar() {
  const selected = useSelectionStore((s) => s.selected);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-xl flex gap-4 items-center">
      <span>{selected.size} selected</span>
      <button className="bg-green-500 px-4 py-1 rounded">
        Submit
      </button>
    </div>
  );
}