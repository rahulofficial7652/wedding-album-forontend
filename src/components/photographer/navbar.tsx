"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Bell, Camera, LogOut, Menu, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/modetoggle";
import { SidebarNavContent } from "./sidebar";
import { getProfile, logout } from "@/services/authServices";
import { toast } from "sonner";

// Simple breadcrumb derived from path
function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
      {segments.map((seg, i) => {
        const isLast = i === segments.length - 1;
        const label = seg.charAt(0).toUpperCase() + seg.slice(1);
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-muted-foreground/40">/</span>}
            <span className={isLast ? "font-medium text-foreground" : ""}>{label}</span>
          </span>
        );
      })}
    </nav>
  );
}

export function PhotographerNavbar() {
  const router = useRouter();
  const [userName, setUserName] = useState("RA");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    getProfile()
      .then((res) => {
        const name: string = res.data?.name || res.data?.email || "";
        if (name) {
          setUserName(
            name
              .split(" ")
              .slice(0, 2)
              .map((w: string) => w[0])
              .join("")
              .toUpperCase()
          );
        }
      })
      .catch(() => {}); // silently fail — token might not be set yet
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // ignore network error
    } finally {
      document.cookie = "token=; path=/; max-age=0";
      router.push("/login");
      toast.success("Logged out successfully.");
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur-sm sm:px-6">
      {/* Left — mobile hamburger + breadcrumb */}
      <div className="flex items-center gap-3">
        {/* Mobile sidebar drawer */}
        <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="left-0 top-0 h-full w-72 max-w-[80vw] translate-x-0 translate-y-0 rounded-none border-r p-0 data-[state=open]:slide-in-from-left">
            <DialogHeader className="flex h-16 flex-row items-center gap-2.5 border-b px-5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                <Camera className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <DialogTitle className="text-sm font-semibold leading-tight">Studio Suite</DialogTitle>
                <DialogDescription className="text-[10px] leading-tight">Wedding Photos</DialogDescription>
              </div>
            </DialogHeader>
            <div className="pt-4">
              <SidebarNavContent onItemClick={() => setMobileOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>

        <Breadcrumb />
      </div>

      {/* Right — theme toggle, notifications, user menu */}
      <div className="flex items-center gap-1 sm:gap-2">
        <ModeToggle />

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex items-center rounded-full outline-none ring-ring focus-visible:ring-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {userName}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
