"use client";

import { Button } from "@/components/ui/button";
import { useSelectionStore } from "@/store/useSelectionStore";

export default function SelectionBar() {
  const selected = useSelectionStore((s) => s.selected);

  if (selected.size === 0) {
    return null;
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-20 mx-auto flex max-w-md items-center justify-between rounded-xl border bg-background/95 px-4 py-3 shadow-lg backdrop-blur">
      <span className="text-sm font-medium">{selected.size} selected</span>
      <Button size="sm">Submit</Button>
    </div>
  );
}
