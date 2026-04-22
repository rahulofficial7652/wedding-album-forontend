"use client";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ModeToggle } from "../ui/modetoggle";

export function PhotographerNavbar() {
 return (
  <header className="h-16 border-b bg-background px-6 flex items-center justify-between">
   <Input placeholder="Search clients..." className="max-w-sm" />
   <div className="flex items-center gap-3">
    <ModeToggle/>
    <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
        </Button>
    <Avatar><AvatarFallback>RA</AvatarFallback></Avatar>
   </div>
  </header>
 );
}
