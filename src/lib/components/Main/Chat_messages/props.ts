import type { IChannel } from "$lib/apis/DTO/ITwitch";

export interface ChatMessagesProps {
    selectedChannelId: number;
    channels: IChannel[];
}