"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Eye,
  FolderPlus,
  Images,
  Share2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllAlbums } from "@/services/authServices";
import type { Album } from "@/types";

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  loading,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  loading?: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardDescription className="text-sm font-medium">{label}</CardDescription>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-8 w-16 animate-pulse rounded bg-muted" />
        ) : (
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        )}
        {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllAlbums()
      .then((res) => {
        const data: Album[] = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
            ? res.data.data
            : [];
        setAlbums(data.filter((a) => !a.deleted));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const shareEnabled = albums.filter((a) => a.shareEnabled).length;
  const recentAlbums = [...albums]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your studio and albums.
          </p>
        </div>
        <Button asChild size="sm" className="w-fit gap-2">
          <Link href="/dashboard/albums/new">
            <FolderPlus className="h-4 w-4" /> New Album
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Albums"
          value={albums.length}
          sub="All-time"
          icon={Images}
          loading={loading}
        />
        <StatCard
          label="Shared Albums"
          value={shareEnabled}
          sub="Currently active"
          icon={Share2}
          loading={loading}
        />
        <StatCard
          label="Total Views"
          value={albums.reduce((acc, a) => acc + (a.viewCount ?? 0), 0)}
          sub="Across all albums"
          icon={Eye}
          loading={loading}
        />
        <StatCard
          label="This Month"
          value={
            albums.filter(
              (a) =>
                new Date(a.createdAt).getMonth() === new Date().getMonth() &&
                new Date(a.createdAt).getFullYear() === new Date().getFullYear()
            ).length
          }
          sub="Albums created"
          icon={TrendingUp}
          loading={loading}
        />
      </section>

      {/* Recent Albums + Quick Actions */}
      <section className="grid gap-6 xl:grid-cols-[1fr_280px]">
        {/* Recent Albums */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Albums</CardTitle>
              <CardDescription>Your 5 most recent albums</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/albums">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-4 w-40 animate-pulse rounded bg-muted" />
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
            ) : recentAlbums.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-center">
                <Images className="mb-3 h-10 w-10 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">No albums yet.</p>
                <Button asChild size="sm" className="mt-4">
                  <Link href="/dashboard/albums/new">Create your first album</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {recentAlbums.map((album) => (
                  <div
                    key={album.id}
                    className="flex items-center justify-between py-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{album.title}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarDays className="h-3 w-3" />
                        {new Date(album.createdAt).toLocaleDateString()}
                        {" · "}
                        {album.viewCount ?? 0} views
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                          album.shareEnabled
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {album.shareEnabled ? "Shared" : "Private"}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <Link href={`/dashboard/albums/${album.id}`}>
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump to common tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button className="w-full justify-start gap-2" asChild>
              <Link href="/dashboard/albums/new">
                <FolderPlus className="h-4 w-4" /> Create Album
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2" asChild>
              <Link href="/dashboard/albums">
                <Images className="h-4 w-4" /> Manage Albums
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
