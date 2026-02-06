<script lang="ts">
  import type { IChannel } from "$lib/DTO/ITwitch";
  import ChannelList from "$lib/components/Channel_list/Channel_list.svelte";
  import ChatMessages from "$lib/components/Chat_messages/Chat_messages.svelte";
  import { mockMyChannels } from "../mock/mock.data";

  let selectedChannelId = $state<number>(1);
  let channels = $state<{ myChannels: IChannel[] }>({
    myChannels: mockMyChannels,
  });
</script>

<main class="flex flex-col h-[calc(100vh-30px)] bg-black">
  <ChannelList bind:selectedChannelId bind:channels />
  <div class="flex-1 overflow-hidden">
    <ChatMessages {selectedChannelId} bind:channels={channels.myChannels} />
  </div>
</main>
