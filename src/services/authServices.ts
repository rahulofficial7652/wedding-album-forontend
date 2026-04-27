import api from "@/lib/axiosApi";
import type { AuthPayload, CreateAlbumPayload, UpdateAlbumPayload } from "@/types";

// ── Auth ──────────────────────────────────────────────────────────────────
export const signup = (data: AuthPayload) => api.post("/auth/signup", data);
export const login  = (data: AuthPayload) => api.post("/auth/login", data);
export const logout = ()                  => api.post("/auth/logout");

// ── Profile ───────────────────────────────────────────────────────────────
export const getProfile = () => api.get("/user/profile");

// ── Albums ────────────────────────────────────────────────────────────────
export const getAllAlbums = () => api.get("/album/getAllAlbums");
export const createAlbum = (data: CreateAlbumPayload) => api.post("/album/create", data);
export const updateAlbum = (id: string, data: UpdateAlbumPayload) => api.patch(`/album/update/${id}`, data);
export const deleteAlbum = (id: string) => api.delete(`/album/deleted/${id}`);
