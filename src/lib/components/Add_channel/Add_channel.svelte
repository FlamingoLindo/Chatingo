<script lang="ts">
  import CustomModal from "../shared/Custom_modal/Custom_modal.svelte";
  interface Channels {
    myChannels: Array<{
      id: number;
      channel: string;
      isLive: boolean;
      newMessages: boolean;
      isSelected: boolean;
    }>;
  }
  let { channels = $bindable() }: { channels: Channels } = $props();
  let isModalOpen: boolean = $state(false);
  let channelName: string = $state("");
  let errorMessage: string = $state("");

  function handleConfirm() {
    if (channelName.trim()) {
      if (
        channels.myChannels.some((channel) => channel.channel === channelName)
      ) {
        errorMessage = "Channel already added!";
        return;
      }
      let newId = channels.myChannels.length + 1;
      let newChannel = {
        id: newId,
        channel: channelName,
        isLive: false,
        newMessages: false,
        isSelected: false,
      };
      channels.myChannels.push(newChannel);
      channelName = "";
      errorMessage = "";
      isModalOpen = false;
    } else {
      errorMessage = "Please enter a channel name";
    }
  }
</script>

<button
  class="relative mr-1 p-1 min-w-24 border border-red-200 hover:bg-[#ff64676c] transition ease-in-out flex items-center bg-[#ffffff2f] mb-1.5 focus:ring-0"
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
