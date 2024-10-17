import { defineStore } from "pinia";
import { getVideos } from "@/api/videos";

export const useVideoStore = defineStore("video", {
  state: (): VideoState => ({
    videos: [],
    loading: false,
    error: null,
    pagination: {
      current: 1,
      limit: 10,
      total: 0,
    },
  }),
  actions: {
    async fetchVideos(page?: number) {
      this.loading = true;
      this.error = null;
      try {
        const currentPage = page || this.pagination.current;
        const params: PaginatedRequest = {
          _page: currentPage,
          _limit: this.pagination.limit,
          _sort: "publish_time",
          _order: "desc",
          _q: "",
        };
        const { code, data, message } = await getVideos(params);

        if (code === 200) {
          this.videos = data.records;
          this.pagination = {
            current: data.current,
            limit: data.size,
            total: data.total,
          };
        } else {
          throw new Error("获取视频列表失败");
        }
      } catch (error) {
        console.error("获取视频列表失败:", error);
        this.error = "获取视频列表失败，请稍后重试";
      } finally {
        this.loading = false;
      }
    },
    setPage(page: number) {
      this.pagination.current = page;
      this.fetchVideos(page);
    },
  },
});
