import Link from "next/link";
import { ArrowUpRight, FolderPlus, Images } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <Button className="w-full justify-between" asChild>
          <Link href="/dashboard/albums/new">
            Create Album
            <FolderPlus className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-between" asChild>
          <Link href="/dashboard/albums">
            View Albums
            <Images className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-between text-muted-foreground" asChild>
          <Link href="/client">
            Client Preview
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
