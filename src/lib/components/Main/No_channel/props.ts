import type { IChannel } from '$lib/apis/DTO/ITwitch';

export interface NoChannelProps {
  channels: IChannel[];
  selectedChannelId: number | null;
}