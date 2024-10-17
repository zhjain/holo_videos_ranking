import { get, post, put, del } from "@/utils/request/http";

export const getChannels = <T = Channel>(page: number = 1, perPage: number = 10) => {
  return get<PaginatedResponse<T>>("/channels", { page, per_page: perPage });
};

export const getChannelById = <T = Channel>(id: number) => {
  return get<T>(`/channels/${id}`);
};

export const createChannel = <T = Channel>(data: { name: string; description: string }) => {
  return post<T>("/channels", data);
};

export const updateChannel = <T = Channel>(
  id: number,
  data: { name?: string; description?: string }
) => {
  return put<T>(`/channels/${id}`, data);
};

export const deleteChannel = <T = void>(id: number) => {
  return del<T>(`/channels/${id}`);
};
