"use client";

import Link from "next/link";
import { Images, LayoutDashboard } from "lucide-react";

const items = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Albums", icon: Images, href: "/dashboard/albums" },
];

export function PhotographerSidebar() {
  return (
    <aside className="hidden w-64 flex-col gap-2 border-r bg-background p-4 md:flex">
      <h2 className="px-2 py-4 text-xl font-bold">Wedding Photographer</h2>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
          >
            <Icon className="h-4 w-4" /> {item.title}
          </Link>
        );
      })}
    </aside>
  );
}
