"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Images,
  LayoutDashboard,
  Settings,
  Camera,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const navItems = [
  { title: "Dashboard",  icon: LayoutDashboard, href: "/dashboard" },
  { title: "Albums",     icon: Images,           href: "/dashboard/albums" },
  { title: "Settings",   icon: Settings,         href: "/dashboard/settings" },
];

export function SidebarNavContent({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 px-3 pb-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

export function PhotographerSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-background lg:flex">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b px-6">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
          <Camera className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight">Studio Suite</p>
          <p className="text-[10px] text-muted-foreground leading-tight">Wedding Photos</p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto pt-4">
        <SidebarNavContent />
      </div>

      {/* Footer */}
      <div className="border-t px-4 py-4">
        <p className="text-[10px] text-muted-foreground">© {new Date().getFullYear()} Studio Suite</p>
      </div>
    </aside>
  );
}
