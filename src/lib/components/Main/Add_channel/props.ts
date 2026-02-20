import type { MyChannels } from "$lib/apis/DTO/ITwitch";

export interface AddChannelProps {
    channels: MyChannels;
    selectedChannelId: number | null;
    onAction?: () => void;
}