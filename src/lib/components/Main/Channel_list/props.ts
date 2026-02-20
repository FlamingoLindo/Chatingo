import type { IChannel } from "$lib/apis/DTO/ITwitch";

export interface IChannelList {
    myChannels: IChannel[];
}

export interface ChannelListProps {
    channels: IChannelList;
    selectedChannelId: number | null;
    isTwitchOpen: boolean;
}