<script lang="ts">
  import type { IChannel } from '$lib/apis/DTO/ITwitch';
  import ChannelList from '$lib/components/Main/Channel_list/Channel_list.svelte';
  import ChatMessages from '$lib/components/Main/Chat_messages/Chat_messages.svelte';
  import TwitchVideo from '$lib/components/Main/Twitch_video/Twitch_video.svelte';

  import { mockMyChannels } from '../mock/mock.data';
  let isTwitchOpen = $state<boolean>(false);

  let selectedChannelId = $state<number>(1);
  let channels = $state<{ myChannels: IChannel[] }>({
    myChannels: mockMyChannels,
  });

  let selectedChannelName = $derived(
    channels.myChannels.find((c) => c.id === selectedChannelId)?.channel || ''
  );

  $effect(() => {
    selectedChannelId;
    isTwitchOpen = false;
  });
</script>

<main class="flex flex-col h-[calc(100vh-30px)] bg-black">
  <ChannelList bind:selectedChannelId bind:channels bind:isTwitchOpen />
  <TwitchVideo {isTwitchOpen} channelName={selectedChannelName} />
  <div class="flex-1 overflow-hidden">
    <ChatMessages {selectedChannelId} bind:channels={channels.myChannels} />
  </div>
</main>
