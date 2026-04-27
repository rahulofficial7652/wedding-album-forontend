"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Link as LinkIcon,
  UploadCloud,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AlbumPhoto {
  id: string;
  name: string;
  size: string;
}

export default function AlbumManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";

  const [photos] = useState<AlbumPhoto[]>([]);
  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  const albumTitle = useMemo(() => {
    if (isNew) return "Create New Album";
    return `Album ${id}`;
  }, [id, isNew]);

  const generateLink = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const newLink = `${origin}/client?album=${id}`;
    setShareLink(newLink);
    toast.success("Shareable link generated successfully.");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.info("Link copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-12 text-foreground">
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/dashboard/albums"
          className="flex items-center gap-1 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Albums
        </Link>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{albumTitle}</h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            {isNew
              ? "Set up your new album project."
              : "Manage photos, delivery options, and client access."}
          </p>
        </div>

        {!isNew ? (
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <Dialog>
              <DialogTrigger asChild> 
                <Button variant="outline" className="gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Share Album
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share link</DialogTitle>
                  <DialogDescription>
                    Anyone with this link can access the client selection view.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 flex items-center gap-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      value={shareLink || "Generate a link"}
                      readOnly
                      className="bg-muted text-muted-foreground"
                    />
                  </div>
                  <Button size="sm" className="px-3" onClick={copyLink} disabled={!shareLink}>
                    <span className="sr-only">Copy</span>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <DialogFooter className="mt-4 sm:justify-between">
                  <Button variant="ghost" onClick={generateLink} className="text-primary hover:text-primary/90">
                    Generate Link
                  </Button>
                  {shareLink ? (
                    <Button variant="secondary" className="gap-2" asChild>
                      <a href={shareLink} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" /> Open
                      </a>
                    </Button>
                  ) : null}
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button className="gap-2">
              <UploadCloud className="h-4 w-4" />
              Upload Photos
            </Button>
          </div>
        ) : null}
      </div>

      <Tabs defaultValue="photos" className="mt-6 w-full">
        <TabsList className="mb-6 w-full justify-start overflow-x-auto sm:w-auto">
          <TabsTrigger value="photos">Photos ({photos.length})</TabsTrigger>
          <TabsTrigger value="settings">Album Settings</TabsTrigger>
          <TabsTrigger value="security">Security & Access</TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-6">
          {!isNew ? (
            <Card>
              <CardContent className="p-8 text-center sm:p-12">
                <p className="text-sm text-muted-foreground">
                  No photos uploaded yet. Use <span className="font-medium">Upload Photos</span> to begin.
                </p>
              </CardContent>
            </Card>
          ) : null}
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Album Details</CardTitle>
              <CardDescription>Update the core information about this project.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Album Name</Label>
                <Input
                  id="name"
                  defaultValue={isNew ? "" : `Album ${id}`}
                  placeholder="e.g. Rahul & Simran Wedding"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client Email</Label>
                  <Input id="client" type="email" placeholder="client@example.com" />
                </div>
              </div>
              <Button className="mt-4 w-full sm:w-auto">{isNew ? "Create Album" : "Save Changes"}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Control who can access and download these photos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col justify-between gap-4 py-2 sm:flex-row sm:items-center">
                <div>
                  <h4 className="text-sm font-medium">Download PIN</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Require a 4-digit PIN to download the full album.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Input type="text" maxLength={4} placeholder="0000" className="w-20 text-center font-mono" />
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col justify-between gap-3 py-2 sm:flex-row sm:items-center">
                <div>
                  <h4 className="text-sm font-medium">Client Selection Box</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Allow clients to select photos for final delivery.
                  </p>
                </div>
                <Button variant="secondary" className="sm:w-auto">Active</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
