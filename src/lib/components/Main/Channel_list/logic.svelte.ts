import type { IChannel } from "$lib/apis/DTO/ITwitch";
import type { IChannelList } from './props';

export function selectChannel(id: number, channels: IChannelList): number {
    channels.myChannels.forEach((c: IChannel) => {
        c.isSelected = c.id === id;
        if (c.id === id) {
            c.newMessages = false;
        }
    });
    return id;
}

export function openRemoveModal(id: number): { selectedChannelId: number; isModalOpen: boolean } {
    return { selectedChannelId: id, isModalOpen: true };
}

export function removeChannel(
    selectedChannelId: number | null,
    channels: IChannelList
): { channels: IChannelList; selectedChannelId: number | null; isModalOpen: boolean } {
    if (selectedChannelId !== null) {
        channels.myChannels = channels.myChannels.filter(
            (c: IChannel) => c.id !== selectedChannelId
        );
        if (channels.myChannels.length > 0) {
            channels.myChannels[0].isSelected = true;
            return {
                channels,
                selectedChannelId: channels.myChannels[0].id,
                isModalOpen: false
            };
        }
        return { channels, selectedChannelId: null, isModalOpen: false };
    }
    return { channels, selectedChannelId, isModalOpen: false };
}

export function handleWheel(
    event: WheelEvent,
    channels: IChannelList
): number | null {
    event.preventDefault();
    const currentIndex = channels.myChannels.findIndex(
        (c: IChannel) => c.isSelected
    );
    let nextIndex;

    if (event.deltaY > 0) {
        nextIndex = (currentIndex + 1) % channels.myChannels.length;
    } else {
        nextIndex =
            (currentIndex - 1 + channels.myChannels.length) %
            channels.myChannels.length;
    }

    return selectChannel(channels.myChannels[nextIndex].id, channels);
}