import { get, post, put, del } from "@/utils/request/http";

export const getVideos = (params: PaginatedRequest) => {
  return get<PaginatedResponse<Video>>("/videos", params);
};

export const getVideoById = (id: number) => {
  return get<Video>(`/videos/${id}`);
};

export const createVideo = (data: {
  title: string;
  description: string;
  url: string;
}) => {
  return post<Video>("/videos", data);
};

export const updateVideo = (
  id: number,
  data: { title?: string; description?: string }
) => {
  return put<Video>(`/videos/${id}`, data);
};

export const deleteVideo = (id: number) => {
  return del<void>(`/videos/${id}`);
};

export const getUtbVideo = (videoId: string) => {
  return get<Video>(`/videos/utb/${videoId}`);
};
