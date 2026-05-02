import api from "@/lib/axiosApi";
import type { AuthPayload } from "@/types";

// ── Profile ───────────────────────────────────────────────────────────────
export const getProfile = () => api.get("/user/profile");

// ── Auth ──────────────────────────────────────────────────────────────────
export const signup = (data: AuthPayload) => api.post("/auth/signup", data);
export const login = (data: AuthPayload) => api.post("/auth/login", data);
export const logout = () => api.post("/auth/logout");
