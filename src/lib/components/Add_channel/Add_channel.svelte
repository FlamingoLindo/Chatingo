<script lang="ts">
  import type { MyChannels } from "$lib/DTO/ITwitch";
  import CustomModal from "../shared/Custom_modal/Custom_modal.svelte";

  let {
    channels = $bindable(),
    selectedChannelId = $bindable(),
    onAction,
  }: {
    channels: MyChannels;
    selectedChannelId: number;
    onAction?: () => void;
  } = $props();

  let isModalOpen: boolean = $state(false);
  let channelName: string = $state("");
  let errorMessage: string = $state("");

  function handleConfirm() {
    if (channelName.trim()) {
      if (channels.some((channel) => channel.channel === channelName)) {
        errorMessage = "Channel already added!";
        return;
      }
      let newId = channels.length + 1;
      let newChannel = {
        id: newId,
        channel: channelName,
        isLive: false,
        newMessages: false,
        isSelected: false,
        messages: [],
      };
      channels.push(newChannel);
      selectedChannelId = newId;
      channelName = "";
      errorMessage = "";
      isModalOpen = false;
      onAction?.(); // Close the context menu
    } else {
      errorMessage = "Please enter a channel name";
    }
  }
</script>

<button
  class="relative p-1 w-full hover:bg-[#ff64676c] transition ease-in-out flex items-center border-b-white border focus:ring-0"
  onclick={() => {
    isModalOpen = true;
    errorMessage = "";
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
  >
    <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
  </svg>
  Add channel
</button>

<CustomModal
  title={"Add channel"}
  text={"Join a Twitch channel by its channel name"}
  input
  bind:isModalOpen
  bind:inputValue={channelName}
  bind:errorMessage
  onConfirm={handleConfirm}
/>
