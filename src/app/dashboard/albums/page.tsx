import Link from "next/link";
import { CalendarDays, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PhotographerAlbumsPage() {
  const albums: Array<{ id: string; name: string; date: string; photos: number; status: string }> = [];

  return (
    <div className="mx-auto max-w-6xl space-y-6 text-foreground">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Manage Albums</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Organize and manage your studio photography albums.
          </p>
        </div>
        <Button className="gap-2 sm:w-auto" asChild>
          <Link href="/dashboard/albums/new">
            <Plus className="h-4 w-4" />
            Create New Album
          </Link>
        </Button>
      </div>

      {albums.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>No albums yet</CardTitle>
            <CardDescription>
              Create your first album to start collecting and sharing wedding photos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/dashboard/albums/new">Create your first album</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {albums.map((album) => (
            <Card key={album.id}>
              <CardHeader>
                <CardTitle>{album.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {album.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm">
                <div>
                  <p>{album.photos} photos</p>
                  <p className="text-muted-foreground">{album.status}</p>
                </div>
                <Button variant="outline" asChild>
                  <Link href={`/dashboard/albums/${album.id}`}>
                    <Eye className="h-4 w-4" /> View
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
