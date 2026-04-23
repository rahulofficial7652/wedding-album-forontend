import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PhotographerAlbumsPage() {
  const albums: Array<{ id: string; name: string; date: string; photos: number; status: string }> = [];

  return (
    <div className="mx-auto max-w-6xl space-y-6 text-foreground">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Albums</h1>
          <p className="mt-1 text-muted-foreground">
            Organize and manage your studio photography albums.
          </p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/dashboard/albums/new">
            <Plus className="h-4 w-4" />
            Create New Album
          </Link>
        </Button>
      </div>

      {albums.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No albums yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create your first album to start collecting and sharing wedding photos.
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
