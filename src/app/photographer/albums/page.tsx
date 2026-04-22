import { Button } from "@/components/ui/button";
import { Plus, Search, MoreVertical, Image as ImageIcon, Link as LinkIcon, Trash } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PhotographerAlbumsPage() {
  const dummyAlbums = [
    { id: "alb-1", name: "Rahul & Simran Wedding", date: "April 10, 2026", photos: 450, status: "Published" },
    { id: "alb-2", name: "Aditya Pre-Wedding", date: "March 22, 2026", photos: 125, status: "Draft" },
    { id: "alb-3", name: "Engagement Reception", date: "February 14, 2026", photos: 320, status: "Published" },
    { id: "alb-4", name: "Riya's Haldi Ceremony", date: "January 05, 2026", photos: 85, status: "Client Review" },
    { id: "alb-5", name: "Anand & Pooja Destination", date: "December 12, 2025", photos: 610, status: "Published" }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Albums</h1>
          <p className="text-muted-foreground mt-1">Organize and manage your studio photography albums.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/photographer/albums/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create New Album
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card border rounded-xl shadow-sm mt-8 overflow-hidden">
        <div className="p-4 border-b bg-muted/30 flex justify-between items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search albums..."
              className="pl-9 h-9 bg-background focus-visible:ring-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              Filter
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              Sort
            </Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Album Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyAlbums.map((album) => (
              <TableRow key={album.id}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 rounded-md border">
                      <AvatarFallback className="rounded-md bg-muted">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <Link href={`/photographer/albums/${album.id}`} className="font-semibold text-foreground hover:underline">
                        {album.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">{album.date}</span>
                      <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" /> {album.photos} photos
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={
                    album.status === 'Published' ? 'default' : 
                    album.status === 'Draft' ? 'secondary' : 'outline'
                  }>
                    {album.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="hidden md:flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 gap-1.5">
                        <LinkIcon className="h-3.5 w-3.5" />
                        Share
                      </Button>
                      <Link href={`/photographer/albums/${album.id}`}>
                        <Button size="sm" className="h-8">
                          Manage
                        </Button>
                      </Link>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <LinkIcon className="h-4 w-4 mr-2" /> Share Album
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>View Analytics</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                          <Trash className="h-4 w-4 mr-2" /> Delete Album
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
