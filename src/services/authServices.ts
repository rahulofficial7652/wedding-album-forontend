import api from "@/lib/axiosApi";

interface AuthPayload {
  email: string;
  password: string;
  name?: string;
}

export const signup = (data: AuthPayload) => api.post("/auth/signup", data);

export const login = (data: AuthPayload) => api.post("/auth/login", data);

export const logout = () => api.post("/auth/logout");

export const getProfile = () => api.get("/user/profile");
