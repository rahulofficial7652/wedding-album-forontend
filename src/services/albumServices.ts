import api from "@/lib/axiosApi";
import type { CreateAlbumPayload, UpdateAlbumPayload } from "@/types";


export const getAllAlbums = () => api.get("/album/getAllAlbum");
export const createAlbum = (data: CreateAlbumPayload) => api.post("/album/create", data);
export const updateAlbum = (id: string, data: UpdateAlbumPayload) => api.patch(`/album/update/${id}`, data);
export const deleteAlbum = (id: string) => api.delete(`/album/deleted/${id}`);