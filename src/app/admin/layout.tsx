import Link from "next/link";
import { LayoutDashboard, Images, Settings, LogOut, Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Admin Dashboard - Wedding Album",
  description: "Manage wedding albums and generate shareable links.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 border-r bg-card flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b">
          <span className="text-xl font-bold tracking-tight text-foreground">StudioAdmin</span>
        </div>
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Overview
          </p>
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-foreground bg-accent/50 hover:bg-accent"
          >
            <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
            Dashboard
          </Link>
          <Link
            href="/admin/albums"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Images className="w-4 h-4 text-muted-foreground" />
            Manage Albums
          </Link>
          <div className="mt-8">
            <p className="px-2 mt-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Settings
            </p>
            <Link
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <Settings className="w-4 h-4 text-muted-foreground" />
              Configuration
            </Link>
          </div>
        </div>
        <Separator />
        <div className="p-4">
          <button className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b bg-card flex items-center px-6 justify-between shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="h-9 rounded-md border border-input bg-background pl-9 pr-4 py-2 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring w-64 transition-all text-foreground"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full border border-background"></span>
            </button>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">RK</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
