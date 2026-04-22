"use client";
import Link from "next/link";
import { LayoutDashboard, Users, Images, Settings } from "lucide-react";

const items = [
 { title: "Dashboard", icon: LayoutDashboard, href: "/photographer" },
 { title: "Clients", icon: Users, href: "/photographer/clients" },
 { title: "Albums", icon: Images, href: "/photographer/albums" },
 { title: "Settings", icon: Settings, href: "/photographer/settings" },
];

export function PhotographerSidebar() {
 return (
  <aside className="hidden md:flex w-64 border-r bg-background p-4 flex-col gap-2">
   <h2 className="text-xl font-bold px-2 py-4">Wedding Photographer</h2>
   {items.map((item) => {
    const Icon = item.icon;
    return (
     <Link key={item.title} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
      <Icon className="h-4 w-4" /> {item.title}
     </Link>
    );
   })}
  </aside>
 );
}
