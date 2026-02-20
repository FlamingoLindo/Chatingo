<script lang="ts">
  import CustomModal from '$lib/components/shared/Custom_modal/Custom_modal.svelte';
  import type { AddChannelProps } from './props';
  import { handleConfirm } from './logic.svelte';

  let {
    channels = $bindable(),
    selectedChannelId = $bindable(),
    onAction,
  }: AddChannelProps = $props();

  let isModalOpen: boolean = $state(false);
  let channelName: string = $state('');
  let errorMessage: string = $state('');
</script>

<button
  class="relative p-1 w-full hover:bg-[#ff64676c] transition ease-in-out flex items-center border-b-white border focus:ring-0"
  onclick={() => {
    isModalOpen = true;
    errorMessage = '';
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
  title={'Add channel'}
  text={'Join a Twitch channel by its channel name'}
  input
  bind:isModalOpen
  bind:inputValue={channelName}
  bind:errorMessage
  onConfirm={() => {
    const result = handleConfirm(channelName, channels, onAction);
    channels = result.channels;
    selectedChannelId = result.selectedChannelId ?? selectedChannelId;
    channelName = result.channelName;
    errorMessage = result.errorMessage;
    isModalOpen = result.isModalOpen;
  }}
/>
