import { get, post, put, del } from "@/utils/request/http";

export const getChannels = (page: number = 1, perPage: number = 10) => {
  return get("/channels", { page, per_page: perPage });
};

export const getChannelById = (id: number) => {
  return get(`/channels/${id}`);
};

export const createChannel = (data: { name: string; description: string }) => {
  return post("/channels", data);
};

export const updateChannel = (
  id: number,
  data: { name?: string; description?: string }
) => {
  return put(`/channels/${id}`, data);
};

export const deleteChannel = (id: number) => {
  return del(`/channels/${id}`);
};
