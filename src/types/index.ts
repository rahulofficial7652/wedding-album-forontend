// Central domain types — all API shapes defined here

export interface Photographer {
  id: string;
  email: string;
  name: string;
  role: "PHOTOGRAPHER";
}

export interface Album {
  id: string;
  title: string;
  photographer: Photographer;
  shareToken: string | null;
  shareEnabled: boolean;
  passwordHash: string | null;
  expiresAt: string | null;
  allowDownload: boolean;
  allowSelection: boolean;
  viewCount: number;
  createdAt: string;
  deleted: boolean;
}

export interface CreateAlbumPayload {
  title: string;
}

export interface UpdateAlbumPayload {
  title?: string;
  shareEnabled?: boolean;
  allowDownload?: boolean;
  allowSelection?: boolean;
  expiresAt?: string | null;
}

export interface AuthPayload {
  email: string;
  password: string;
  name?: string;
}
