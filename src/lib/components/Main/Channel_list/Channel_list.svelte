<script lang="ts">
  import type { IChannel } from '$lib/apis/DTO/ITwitch';
  import CustomModal from '$lib/components/shared/Custom_modal/Custom_modal.svelte';
  import NoChannel from '../No_channel/No_channel.svelte';
  import ChannelOptions from '../Options/Channel_options.svelte';
  import { selectChannel, removeChannel, openRemoveModal, handleWheel } from './logic.svelte';
  import type { ChannelListProps } from './props';

  let {
    channels = $bindable({
      myChannels: [],
    }),
    selectedChannelId = $bindable(),
    isTwitchOpen = $bindable(false),
  }: ChannelListProps = $props();

  let isModalOpen: boolean = $state(false);

  $effect(() => {
    channels.myChannels.forEach((c: IChannel) => {
      c.isSelected = c.id === selectedChannelId;
    });
  });
</script>

{#if channels.myChannels?.length > 0}
  <div
    class="text-white text-xs flex justify-between bg-[#111111]"
    onwheel={(e) => {
      selectedChannelId = handleWheel(e, channels);
    }}
  >
    <CustomModal
      title={'Remove this channel'}
      text={'Are you sure that you want to remove this channel?'}
      bind:isModalOpen
      onConfirm={() => {
        const result = removeChannel(selectedChannelId, channels);
        channels = result.channels;
        selectedChannelId = result.selectedChannelId;
        isModalOpen = result.isModalOpen;
      }}
    />
    <ul class="flex flex-wrap">
      {#each channels.myChannels as channel}
        <!-- Channel -->
        <button
          onclick={() => {
            selectedChannelId = selectChannel(channel.id, channels);
          }}
          class="relative mr-1 p-1 min-w-24 border border-red-200 hover:bg-[#ff64676c] transition ease-in-out flex items-center {channel.isSelected
            ? 'bg-[#ffffff6c]'
            : ''} mb-1.5"
        >
          <!-- New messages -->
          <div class="absolute top-0 left-0 w-full flex items-stretch">
            <p
              class="w-full h-0.5 {channel.newMessages
                ? 'bg-white'
                : 'bg-auto'} animate-pulse mx-auto rounded-b-xl"
            ></p>
          </div>

          <!-- Left spacer to balance right side -->
          <div class="w-8"></div>

          <!-- Center: Channel name -->
          <li class="flex-1 text-center">{channel.channel}</li>

          <div class="flex items-center gap-2 w-8 justify-end">
            <!-- Is channel live -->
            <p
              class="rounded-full w-1.5 h-1.5 {channel.isLive
                ? 'bg-red-500'
                : 'bg-transparent'}"
            ></p>

            <!-- Close button -->
            {#if channel.isSelected}
              <span
                role="button"
                tabindex="0"
                class="hover:bg-[#ffffff36]"
                onclick={(e) => {
                  e.stopPropagation();
                  const result = openRemoveModal(channel.id);
                  selectedChannelId = result.selectedChannelId;
                  isModalOpen = result.isModalOpen;
                }}
                onkeydown={(e) => {
                  if (e.key === 'Enter') {
                    e.stopPropagation();
                    const result = openRemoveModal(channel.id);
                    selectedChannelId = result.selectedChannelId;
                    isModalOpen = result.isModalOpen;
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#ffffff"
                    d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
                  />
                </svg>
              </span>
            {/if}
          </div>
        </button>
      {/each}
      <ChannelOptions
        bind:channels={channels.myChannels}
        bind:selectedChannelId
        bind:isTwitchOpen
      />
    </ul>
  </div>
{:else}
  <div class="flex items-center justify-center h-full">
    <NoChannel bind:channels={channels.myChannels} bind:selectedChannelId />
  </div>
{/if}
