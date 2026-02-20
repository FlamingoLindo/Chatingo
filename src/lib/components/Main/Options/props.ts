import type { MyChannels } from "$lib/apis/DTO/ITwitch";

export interface ChannelOptionsProps {
    channels: MyChannels;
    selectedChannelId: number | null;
    isTwitchOpen: boolean;
}