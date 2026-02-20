import type { MyChannels, IChannel } from "$lib/apis/DTO/ITwitch";

export function handleConfirm(
    channelName: string,
    channels: MyChannels,
    onAction?: () => void
): {
    channels: MyChannels;
    selectedChannelId: number | null;
    channelName: string;
    errorMessage: string;
    isModalOpen: boolean;
} {
    if (channelName.trim()) {
        if (channels.some((channel: IChannel) => channel.channel === channelName)) {
            return {
                channels,
                selectedChannelId: null,
                channelName,
                errorMessage: 'Channel already added!',
                isModalOpen: true
            };
        }
        let newId = channels.length + 1;
        let newChannel: IChannel = {
            id: newId,
            channel: channelName,
            isLive: false,
            newMessages: false,
            isSelected: false,
            messages: [],
        };
        channels.push(newChannel);
        onAction?.();
        return {
            channels,
            selectedChannelId: newId,
            channelName: '',
            errorMessage: '',
            isModalOpen: false
        };
    } else {
        return {
            channels,
            selectedChannelId: null,
            channelName,
            errorMessage: 'Please enter a channel name',
            isModalOpen: true
        };
    }
}