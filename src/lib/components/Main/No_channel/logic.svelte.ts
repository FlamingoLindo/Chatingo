import type { IChannel } from '$lib/apis/DTO/ITwitch';

export function createNoChannelLogic(
  getChannels: () => IChannel[],
  setSelectedChannelId: (id: number) => void
) {
  let isModalOpen = $state(false);
  let channelName = $state('');
  let errorMessage = $state('');

  function handleConfirm() {
    if (channelName.trim()) {
      const channels = getChannels();
      const newId = channels.length + 1;
      const newChannel: IChannel = {
        id: newId,
        channel: channelName,
        isLive: false,
        newMessages: false,
        isSelected: true,
        messages: [],
      };

      const updatedChannels = [...channels, newChannel];
      channels.length = 0;
      channels.push(...updatedChannels);
      setSelectedChannelId(newId);
      channelName = '';
      errorMessage = '';
      isModalOpen = false;
    } else {
      errorMessage = 'Please enter a channel name';
    }
  }

  return {
    get isModalOpen() { return isModalOpen; },
    set isModalOpen(value) { isModalOpen = value; },
    get channelName() { return channelName; },
    set channelName(value) { channelName = value; },
    get errorMessage() { return errorMessage; },
    set errorMessage(value) { errorMessage = value; },
    handleConfirm,
  };
}