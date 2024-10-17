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

declare interface ChannelState {
  channels: Channel[];
  currentChannel: Channel | null;
  loading: boolean;
  error: string | null;
  total: number;
  current: number;
  size: number;
}
