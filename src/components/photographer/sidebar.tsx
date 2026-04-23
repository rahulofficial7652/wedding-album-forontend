"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Images, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export const photographerNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Albums", icon: Images, href: "/dashboard/albums" },
];

export function SidebarNavContent({
  onItemClick,
}: {
  onItemClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-2 px-3 pb-4">
      {photographerNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.title}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}

export function PhotographerSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-sidebar-border bg-sidebar lg:flex lg:flex-col">
      <div className="border-b px-6 py-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Studio Suite</p>
        <h2 className="mt-2 text-lg font-semibold">Wedding Photographer</h2>
      </div>
      <div className="pt-4">
        <SidebarNavContent />
      </div>
    </aside>
  );
}
