declare interface Channel {
  id: string;
  channel_nick: string;
  channel_id: string;
  channel_name: string;
  channel_avatar: string;
  channel_custom_url: string;
  channel_description: string;
  channel_created_time: string;
  channel_view_count: number;
  channel_subscriber_count: number;
  video_list: string;
  updated_date: string;
  followers_count: number;
  historical_data: Array<{
    date: string;
    channel_subscriber_count: number;
  }>;
}

declare interface PaginatedResponse<T> {
  records: T[];
  total: number;
  current: number;
  size: number;
}

declare interface ChannelState {
  channels: Channel[];
  currentChannel: Channel | null;
  loading: boolean;
  error: string | null;
  total: number;
  current: number;
  size: number;
}

declare interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // 在这里定义其他的环境变量
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}

// declare type ChannelStore = import('@/stores/channelStore').ChannelStore;
