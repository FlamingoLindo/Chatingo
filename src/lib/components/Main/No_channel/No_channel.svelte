<script lang="ts">
  import type { NoChannelProps } from './props';
  import { createNoChannelLogic } from './logic.svelte';
  import CustomModal from '$lib/components/shared/Custom_modal/Custom_modal.svelte';

  let {
    channels = $bindable(),
    selectedChannelId = $bindable(),
  }: NoChannelProps & { selectedChannelId: number } = $props();

  const logic = createNoChannelLogic(() => channels, (id) => {
    selectedChannelId = id;
  });
</script>

{#if logic.isModalOpen}
  <CustomModal
    title={'Add channel'}
    text={'Join a Twitch channel by its channel name'}
    input
    bind:isModalOpen={logic.isModalOpen}
    bind:inputValue={logic.channelName}
    bind:errorMessage={logic.errorMessage}
    onConfirm={logic.handleConfirm}
  />
{/if}

<button
  class="w-1/2 animate-pulse grid text-white place-items-center border-2 border-white border-dashed bg-[#111111] hover:bg-[#3a3a3a] p-2 cursor-pointer"
  onclick={() => (logic.isModalOpen = true)}
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
