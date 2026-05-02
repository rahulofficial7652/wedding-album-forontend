"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Eye,
  FolderPlus,
  Images,
  MoreHorizontal,
  Search,
  Share2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { getAllAlbums, deleteAlbum } from "@/services/albumServices";
import type { Album } from "@/types";
import { apiMessage } from "@/lib/utils";

export default function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const fetchAlbums = async () => {
    try {
      const res = await getAllAlbums();
      const data: Album[] = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
          ? res.data.data
          : [];
      setAlbums(data.filter((a) => !a.deleted));
    } catch (err) {
      toast.error(apiMessage(err, "Failed to load albums."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await deleteAlbum(id);
      setAlbums((prev) => prev.filter((a) => a.id !== id));
      toast.success(apiMessage(res, "Album deleted."));
    } catch (err) {
      toast.error(apiMessage(err, "Failed to delete album."));
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const filtered = albums.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Albums</h1>
          <p className="text-sm text-muted-foreground">
            {albums.length} album{albums.length !== 1 ? "s" : ""} in your studio
          </p>
        </div>
        <Button asChild className="w-fit gap-2">
          <Link href="/dashboard/albums/new">
            <FolderPlus className="h-4 w-4" /> New Album
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search albums..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Card key={n} className="animate-pulse">
              <CardHeader>
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="h-8 rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader className="items-center text-center">
            <Images className="mb-2 h-10 w-10 text-muted-foreground/40" />
            <CardTitle>
              {search ? "No matching albums" : "No albums yet"}
            </CardTitle>
            <CardDescription>
              {search
                ? "Try a different search term."
                : "Create your first album to get started."}
            </CardDescription>
          </CardHeader>
          {!search && (
            <CardContent className="flex justify-center">
              <Button asChild>
                <Link href="/dashboard/albums/new">Create your first album</Link>
              </Button>
            </CardContent>
          )}
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((album) => (
            <Card key={album.id} className="group relative flex flex-col transition-shadow hover:shadow-md">
              <CardHeader className="flex-1 pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-1 text-base">{album.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/albums/${album.id}`} className="flex items-center gap-2">
                          <Eye className="h-4 w-4" /> View & Manage
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="flex items-center gap-2 text-destructive focus:text-destructive"
                        onSelect={(e) => {
                          e.preventDefault();
                          setConfirmId(album.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <CardDescription className="flex items-center gap-1.5 text-xs">
                  <CalendarDays className="h-3 w-3" />
                  {new Date(album.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric",
                  })}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex items-center justify-between pt-0">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {album.viewCount ?? 0} views
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
                      album.shareEnabled
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Share2 className="h-2.5 w-2.5" />
                    {album.shareEnabled ? "Shared" : "Private"}
                  </span>
                </div>

                <Button variant="outline" size="sm" asChild className="h-7 text-xs">
                  <Link href={`/dashboard/albums/${album.id}`}>
                    <Eye className="mr-1 h-3 w-3" /> Open
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmId} onOpenChange={(open) => !open && setConfirmId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Album?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The album and all its settings will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-10 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deletingId === confirmId}
              onClick={() => confirmId && handleDelete(confirmId)}
            > 
              {deletingId === confirmId ? "Deleting…" : "Delete Album"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
