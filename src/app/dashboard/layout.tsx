import type { ReactNode } from "react";
import { PhotographerSidebar } from "@/components/photographer/sidebar";
import { PhotographerNavbar } from "@/components/photographer/navbar";

export default function PhotographerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/35">
      <PhotographerSidebar />
      <div className="flex min-h-screen flex-col lg:pl-72">
        <PhotographerNavbar />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
