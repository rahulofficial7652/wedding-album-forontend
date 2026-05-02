import api from "@/lib/axiosApi";

export const initiateUpload = (data: {
  albumId: string;
  fileName: string;
  fileSize: number;
}) => api.post(`/uploads/initiate`, data);

export const getPartUploadUrl = (
  sessionId: string,
  partNumber: number
) => api.get(`/uploads/${sessionId}/part-url`, {
  params: { partNumber },
});

export const uploadPartToS3 = (uploadUrl: string, fileChunk: Blob) =>
  fetch(uploadUrl, {
    method: "PUT",
    body: fileChunk,
  });
  export const markPartComplete = (
  sessionId: string,
  data: {
    partNumber: number;
    eTag: string;
  }
) =>  api.post(`/uploads/${sessionId}/part-complete`, data);

  export const resumeUpload = (sessionId: string) =>
  api.get(`/uploads/${sessionId}/resume`);

  export const completeUpload = (
  sessionId: string,
  data: {
    parts: { partNumber: number; eTag: string }[];
  }
) => api.post(`/uploads/${sessionId}/complete`, data);

export const abortUpload = (sessionId: string) =>
  api.post(`/uploads/${sessionId}/abort`);


export const retryUpload = (sessionId: string) =>
  api.post(`/uploads/${sessionId}/retry`);


export const getUploadStatus = (sessionId: string) =>
  api.get(`/uploads/${sessionId}/status`);
