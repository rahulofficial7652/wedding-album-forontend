import api from "@/lib/axiosApi";

export const signup = (data: any) => api.post("/auth/signup", data);

export const login = (data : any) => api.post("/auth/login", data);

export const logout = () => api.post("/auth/logout");

export const getProfile = () => api.get("/user/profile");