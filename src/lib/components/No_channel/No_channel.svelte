<script lang="ts">
  import type { IChannel } from "$lib/DTO/ITwitch";
  import CustomModal from "../shared/Custom_modal/Custom_modal.svelte";

  let isModalOpen: boolean = $state(false);

  let channelName: string = $state("");
  let errorMessage: string = $state("");

  let {
    channels,
    selectedChannelId = $bindable(),
  }: {
    channels: IChannel[];
    selectedChannelId: number;
  } = $props();

  function handleConfirm() {
    if (channelName.trim()) {
      let newId = channels.length + 1;
      let newChannel = {
        id: newId,
        channel: channelName,
        isLive: false,
        newMessages: false,
        isSelected: true,
        messages: [],
      };
      channels.push(newChannel);
      selectedChannelId = newId;
      channelName = "";
      errorMessage = "";
      isModalOpen = false;
    } else {
      errorMessage = "Please enter a channel name";
    }
  }
</script>

{#if isModalOpen}
  <CustomModal
    title={"Add channel"}
    text={"Join a Twitch channel by its channel name"}
    input
    bind:isModalOpen
    bind:inputValue={channelName}
    bind:errorMessage
    onConfirm={handleConfirm}
  />
{/if}

<button
  class="w-1/2 animate-pulse grid text-white place-items-center border-2 border-white border-dashed bg-[#111111] hover:bg-[#3a3a3a] p-2 cursor-pointer"
  onclick={() => (isModalOpen = true)}
>
  <p>You don't have any channels</p>
  <p>Click here to add a channel</p>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 24 24"
  >
    <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
  </svg>
</button>
