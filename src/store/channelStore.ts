import { defineStore } from "pinia";
import { getChannels, getChannelById } from "@/api/channels";

export const useChannelStore = defineStore("channel-store", {
  state: (): ChannelState => ({
    channels: [] as Channel[],
    currentChannel: null as Channel | null,
    loading: false,
    error: null as string | null,
    total: 0,
    current: 1,
    size: 10,
  }),

  actions: {
    async fetchChannels(page: number = 1) {
      this.loading = true;
      try {
        const response = await getChannels(page);
        const paginatedResponse = response.data as PaginatedResponse<Channel>;
        this.channels = paginatedResponse.records;
        this.total = paginatedResponse.total;
        this.current = paginatedResponse.current;
        this.size = paginatedResponse.size;
        this.error = null;
      } catch (err) {
        this.error = "获取失败";
        console.error("获取频道列表失败:", err);
      } finally {
        this.loading = false;
      }
    },

    async fetchChannelById(id: number) {
      this.loading = true;
      try {
        const response = await getChannelById(id);
        this.currentChannel = response.data;
        this.error = null;
      } catch (err) {
        this.error = "获取频道详情失败";
        console.error("获取频道详情失败:", err);
      } finally {
        this.loading = false;
      }
    },

    setCurrentChannel(channel: Channel) {
      this.currentChannel = channel;
    },

    clearCurrentChannel() {
      this.currentChannel = null;
    },
  },

  getters: {
    getChannelById: (state) => (id: string) => {
      return state.channels.find((channel: Channel) => channel.id === id);
    },
  },
});

// 添加这行
// export type ChannelStore = ReturnType<typeof useChannelStore>;
