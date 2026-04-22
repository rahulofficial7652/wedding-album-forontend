import type { ReactNode } from "react";
import { PhotographerSidebar } from "@/components/photographer/sidebar";
import { PhotographerNavbar } from "@/components/photographer/navbar";

export default function PhotographerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-muted/40">
      <PhotographerSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <PhotographerNavbar />

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
