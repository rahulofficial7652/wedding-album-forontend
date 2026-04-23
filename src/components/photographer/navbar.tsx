"use client";

import { Bell, Menu } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../ui/modetoggle";
import { SidebarNavContent } from "./sidebar";

export function PhotographerNavbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-2 md:gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="left-0 top-0 h-full w-[82vw] max-w-sm translate-x-0 translate-y-0 rounded-none border-r p-0 sm:max-w-sm">
            <DialogHeader className="border-b px-5 py-5">
              <DialogTitle>Wedding Photographer</DialogTitle>
              <DialogDescription>Navigation menu</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <SidebarNavContent />
            </div>
          </DialogContent>
        </Dialog>

        <Input
          placeholder="Search clients..."
          className="h-9 w-full min-w-40 max-w-[12rem] sm:max-w-xs"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <ModeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
          <AvatarFallback>RA</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
