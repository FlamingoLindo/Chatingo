<script lang="ts">
  import type { MyChannels } from "$lib/DTO/ITwitch";
  import AddChannel from "../Add_channel/Add_channel.svelte";
  import OpenChannel from "../Open_channel/Open_channel.svelte";

  let {
    channels = $bindable(),
    selectedChannelId = $bindable(),
    isTwitchOpen = $bindable(),
  }: {
    channels: MyChannels;
    selectedChannelId: number;
    isTwitchOpen: boolean;
  } = $props();

  let contextOpen: boolean = $state(false);

  function closeMenu() {
    contextOpen = false;
  }
</script>

<div class="relative">
  <button
    onclick={() => (contextOpen = !contextOpen)}
    class="relative p-1 w-max border border-red-200 hover:bg-[#ff64676c] transition ease-in-out flex items-center mb-1.5 focus:ring-0 gap-1"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-6 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4m12 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
      />
    </svg>
    Options
  </button>

  {#if contextOpen}
    <div
      class="absolute top-full w-30 bg-[#1111] border border-gray-200 shadow-lg rounded z-10"
    >
      <!-- Add new channel -->
      <AddChannel bind:channels bind:selectedChannelId onAction={closeMenu} />
      <!-- Open/Close stream -->
      <OpenChannel bind:isTwitchOpen onAction={closeMenu} />
    </div>
  {/if}
</div>
