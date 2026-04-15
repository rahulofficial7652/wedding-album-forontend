import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, HardDrive, Image as ImageIcon, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Metrics and quick actions for your studio.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/albums/new">
            <Button>
              Create New Album
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Albums</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">+2</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45.2 GB</div>
            <p className="text-xs text-muted-foreground mt-1">
              ~64% of 100 GB plan limit
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Albums</CardTitle>
            <CardDescription>Your recently modified wedding projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Rahul & Simran Wedding", date: "April 10, 2026", views: 245, id: "alb-1" },
                { name: "Aditya Pre-Wedding", date: "March 22, 2026", views: 531, id: "alb-2" },
                { name: "Engagement Reception", date: "February 14, 2026", views: 104, id: "alb-3" }
              ].map((album) => (
                <div key={album.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border rounded-md">
                      <AvatarFallback className="rounded-md bg-muted">
                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-none">{album.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{album.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium">{album.views}</p>
                      <p className="text-xs text-muted-foreground">views</p>
                    </div>
                    <Link href={`/admin/albums/${album.id}`}>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-4 text-center">
              <Link href="/admin/albums" className="text-sm font-medium text-primary hover:underline">
                View all albums →
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Handy access to important features.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer border shadow-none">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">Client Delivery Guide</h3>
                <p className="text-xs text-muted-foreground mt-1">Read best practices for sharing albums securely.</p>
              </CardContent>
            </Card>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer border shadow-none">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">Upgrade Storage</h3>
                <p className="text-xs text-muted-foreground mt-1">You are currently using 45.2 GB of your 100 GB plan.</p>
              </CardContent>
            </Card>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer border shadow-none">
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">Support Ticket</h3>
                <p className="text-xs text-muted-foreground mt-1">Need help? Contact our premium support staff.</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
