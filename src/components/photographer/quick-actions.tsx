import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full" asChild>
          <Link href="/dashboard/albums/new">Create Album</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/dashboard/albums">View Albums</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
