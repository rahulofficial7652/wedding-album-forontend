"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, Copy, ExternalLink, ImagePlus, Link as LinkIcon, Trash, UploadCloud } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

export default function AlbumManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";
  
  const [photos, setPhotos] = useState([
    { id: "1", url: "https://picsum.photos/400/300?random=1", name: "DSC_001.jpg", size: "4.2 MB" },
    { id: "2", url: "https://picsum.photos/400/300?random=2", name: "DSC_002.jpg", size: "3.8 MB" },
    { id: "3", url: "https://picsum.photos/400/300?random=3", name: "DSC_003.jpg", size: "5.1 MB" },
    { id: "4", url: "https://picsum.photos/400/300?random=4", name: "DSC_004.jpg", size: "4.9 MB" },
    { id: "5", url: "https://picsum.photos/400/300?random=5", name: "DSC_005.jpg", size: "6.2 MB" },
    { id: "6", url: "https://picsum.photos/400/300?random=6", name: "DSC_006.jpg", size: "3.5 MB" },
  ]);

  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    // In a real app, you would make an API call here to generate a secure UUID link
    const newLink = `https://studio.com/client/${id}-${Math.random().toString(36).substring(7)}`;
    setShareLink(newLink);
    toast.success("Sharable link generated successfully!");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.info("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12 text-foreground">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Link href="/admin/albums" className="hover:text-foreground transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" /> Back to Albums
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isNew ? "Create New Album" : "Rahul & Simran Wedding"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isNew ? "Set up your new album project." : "Manage photos, select delivery options, and share with your client."}
          </p>
        </div>
        
        {!isNew && (
          <div className="flex items-center gap-3">
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
                    Anyone who has this link will be able to view this album.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      value={shareLink || "Click 'Generate New Link' below"}
                      readOnly
                      className="bg-muted text-muted-foreground"
                    />
                  </div>
                  <Button type="submit" size="sm" className="px-3" onClick={copyLink} disabled={!shareLink}>
                    <span className="sr-only">Copy</span>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <DialogFooter className="sm:justify-between mt-4">
                  <Button variant="ghost" onClick={generateLink} className="text-primary hover:text-primary/90">
                    Generate New Link
                  </Button>
                  {shareLink && (
                    <Button variant="secondary" className="gap-2" asChild>
                      <a href={shareLink} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" /> Open
                      </a>
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button className="gap-2">
              <UploadCloud className="h-4 w-4" />
              Upload Photos
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="photos" className="w-full mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="photos">Photos ({photos.length})</TabsTrigger>
          <TabsTrigger value="settings">Album Settings</TabsTrigger>
          <TabsTrigger value="security">Security & Access</TabsTrigger>
        </TabsList>
        
        <TabsContent value="photos" className="space-y-6">
          {!isNew ? (
            <div className="border border-dashed rounded-xl bg-card p-12 text-center flex flex-col items-center justify-center border-border">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                <ImagePlus className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Drag & drop photos here</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
                Support for high-resolution JPEG, PNG, and WebP files. Maximum file size is 25MB.
              </p>
              <Button>Select Files from Computer</Button>
            </div>
          ) : null}

          {/* Photo Grid */}
          {!isNew && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="group relative rounded-lg border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-[4/3] bg-muted relative">
                    <Image
                      src={photo.url}
                      alt={photo.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-medium truncate" title={photo.name}>{photo.name}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{photo.size}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
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
                <Input id="name" defaultValue={!isNew ? "Rahul & Simran Wedding" : ""} placeholder="e.g. Rahul & Simran Wedding" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Event Date</Label>
                  <Input id="date" type="date" defaultValue={!isNew ? "2026-04-10" : ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client">Client Email</Label>
                  <Input id="client" type="email" placeholder="client@example.com" />
                </div>
              </div>
              <Button className="mt-4">{isNew ? "Create Album" : "Save Changes"}</Button>
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
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-sm">Download PIN</h4>
                  <p className="text-xs text-muted-foreground mt-1">Require a 4-digit PIN to download the full album.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input type="text" maxLength={4} placeholder="0000" className="w-20 text-center font-mono" />
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-sm">Client Selection Box</h4>
                  <p className="text-xs text-muted-foreground mt-1">Allow clients to 'heart' or select photos for print.</p>
                </div>
                <Button variant="secondary">Active</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-sm">Watermark</h4>
                  <p className="text-xs text-muted-foreground mt-1">Apply your studio watermark to all web-size downloads.</p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
