"use client";

import { use, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  ExternalLink,
  Image as ImageIcon,
  Link as LinkIcon,
  Save,
  Trash2,
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
import { createAlbum, updateAlbum } from "@/services/albumServices";
import { useRouter } from "next/navigation";
import { apiMessage } from "@/lib/utils";

interface LocalPhoto {
  id: string;
  name: string;
  size: string;
  url: string;
}

export default function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const [photos, setPhotos] = useState<LocalPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [shareLink, setShareLink] = useState("");
  const [copied, setCopied] = useState(false);

  // ── Create ────────────────────────────────────────────────────────────
  const handleCreate = async () => {
    if (!title.trim()) {
      toast.error("Album name is required.");
      return;
    }
    setSaving(true);
    try {
      const res = await createAlbum({ title: title.trim() });
      if (res.status === 200 || res.status === 201) {
        toast.success(apiMessage(res, "Album created!"));
        router.push(`/dashboard/albums/${res.data.id}`);
      }
    } catch (err) {
      toast.error(apiMessage(err, "Failed to create album."));
    } finally {
      setSaving(false);
    }
  };

  // ── Save (Update) ────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Album name is required.");
      return;
    }
    setSaving(true);
    try {
      const res = await updateAlbum(id, { title: title.trim() });
      toast.success(apiMessage(res, "Changes saved."));
    } catch (err) {
      toast.error(apiMessage(err, "Failed to save changes."));
    } finally {
      setSaving(false);
    }
  };

  // ── Photo upload (UI only — hook up real API when ready) ──────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setTimeout(() => {
      const newPhotos: LocalPhoto[] = Array.from(files).map((f) => ({
        id: Math.random().toString(36).slice(2, 9),
        name: f.name,
        size: (f.size / 1024 / 1024).toFixed(2) + " MB",
        url: URL.createObjectURL(f),
      }));
      setPhotos((prev) => [...newPhotos, ...prev]);
      setUploading(false);
      toast.success(`${files.length} photo(s) added.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 1200);
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    toast.success("Photo removed.");
  };

  const handleDownload = (photo: LocalPhoto) => {
    const a = document.createElement("a");
    a.href = photo.url;
    a.download = photo.name;
    a.click();
  };

  // ── Share ─────────────────────────────────────────────────────────────
  const generateLink = () => {
    const origin = window.location.origin;
    setShareLink(`${origin}/client?album=${id}`);
    toast.success("Share link generated.");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.info("Link copied.");
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      {/* Back */}
      <Link
        href="/dashboard/albums"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Albums
      </Link>

      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {isNew ? "New Album" : title || "Manage Album"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isNew ? "Fill in the details below to create your album." : "Manage photos and settings for this album."}
          </p>
        </div>

        {!isNew && (
          <div className="flex flex-wrap items-center gap-2">
            {/* Share Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <LinkIcon className="h-4 w-4" /> Share
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share Album</DialogTitle>
                  <DialogDescription>
                    Generate a link for clients to view and select photos.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2 pt-2">
                  <Input
                    readOnly
                    value={shareLink || "Click 'Generate' to create a link"}
                    className="bg-muted text-muted-foreground"
                  />
                  <Button size="icon" variant="outline" onClick={copyLink} disabled={!shareLink}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <DialogFooter className="mt-2 sm:justify-between">
                  <Button variant="ghost" onClick={generateLink}>Generate Link</Button>
                  {shareLink && (
                    <Button variant="secondary" asChild className="gap-2">
                      <a href={shareLink} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" /> Open
                      </a>
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Upload */}
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button size="sm" className="gap-2" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              <UploadCloud className="h-4 w-4" />
              {uploading ? "Uploading…" : "Upload Photos"}
            </Button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue={isNew ? "settings" : "photos"} className="w-full">
        <TabsList className="mb-6">
          {!isNew && <TabsTrigger value="photos">Photos ({photos.length})</TabsTrigger>}
          <TabsTrigger value="settings">{isNew ? "Album Details" : "Settings"}</TabsTrigger>
          {!isNew && <TabsTrigger value="security">Security</TabsTrigger>}
        </TabsList>

        {/* ── Photos tab ── */}
        {!isNew && (
          <TabsContent value="photos">
            {photos.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <ImageIcon className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <h3 className="mb-1 font-semibold">No photos yet</h3>
                  <p className="mb-6 max-w-xs text-sm text-muted-foreground">
                    Upload your high-res wedding photos. Clients will view and select from here.
                  </p>
                  <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    {uploading ? "Uploading…" : "Upload Photos"}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative aspect-square overflow-hidden rounded-md border bg-muted"
                  >
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between bg-black/60 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => handleDownload(photo)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
                          title="Download"
                        >
                          <Download className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/80 text-white hover:bg-red-500 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                      <div>
                        <p className="truncate text-[11px] font-medium text-white">{photo.name}</p>
                        <p className="text-[10px] text-white/60">{photo.size}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        )}

        {/* ── Settings tab ── */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Album Details</CardTitle>
              <CardDescription>
                {isNew ? "Give your album a name to get started." : "Update the name of this album."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-w-sm space-y-2">
                <Label htmlFor="album-name">Album Name</Label>
                <Input
                  id="album-name"
                  placeholder="e.g. Rahul & Simran Wedding"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <Button
                onClick={isNew ? handleCreate : handleSave}
                disabled={saving}
                className="gap-2"
              >
                {isNew ? (
                  saving ? "Creating…" : "Create Album"
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {saving ? "Saving…" : "Save Changes"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Security tab ── */}
        {!isNew && (
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security & Access</CardTitle>
                <CardDescription>Control how clients interact with this album.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-medium">Download PIN</p>
                    <p className="text-xs text-muted-foreground">Require a 4-digit PIN to download photos.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input type="text" maxLength={4} placeholder="0000" className="w-20 text-center font-mono" />
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>
                <Separator />
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-medium">Client Selection</p>
                    <p className="text-xs text-muted-foreground">Allow clients to select photos for delivery.</p>
                  </div>
                  <Button variant="secondary" size="sm">Active</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
