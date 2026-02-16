<script lang="ts">
  import type { IChannel, IMessage } from '$lib/apis/DTO/ITwitch';
  import ChatInput from '../Chat_input/Chat_input.svelte';
  import UserCard from '../User_card/User_card.svelte';

  let { selectedChannelId, channels = $bindable() } = $props<{
    selectedChannelId: number;
    channels: IChannel[];
  }>();

  let openUserCard: string | null = $state(null);
  let cardPosition = $state({ x: 0, y: 0 });
  let currentChannel = $derived(
    channels.find((c: IChannel) => c.id === selectedChannelId)
  );
  let currentMessages = $derived(currentChannel?.messages || []);
  let messagesContainer: HTMLDivElement;
  let chatInputElement: HTMLDivElement;
  let isAtBottom = $state(true);

  function checkIfAtBottom() {
    if (messagesContainer) {
      const threshold = 100;
      const scrollBottom =
        messagesContainer.scrollHeight -
        messagesContainer.scrollTop -
        messagesContainer.clientHeight;
      isAtBottom = scrollBottom < threshold;
    }
  }

  function handleMessageSubmit(message: string) {
    const newMessage: IMessage = {
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      sender: { username: 'flamingo_lindo', color: '#fcba03', badges: [] },
      content: message,
    };
    const channel = channels.find((c: IChannel) => c.id === selectedChannelId);
    if (channel) {
      channel.messages.push(newMessage);
      channels = [...channels];
    }
  }

  function formatBadgeUrl(badgeUrl: string) {
    const formattedUrl = badgeUrl.replace('{SIZE}', '1');
    return formattedUrl;
  }

  function toggleUserCard(username: string, event: MouseEvent) {
    event.stopPropagation();
    if (openUserCard === username) {
      openUserCard = null;
    } else {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      cardPosition = { x: rect.left, y: rect.top };
      openUserCard = username;
    }
  }

  $effect(() => {
    if (messagesContainer && currentMessages.length > 0 && isAtBottom) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });
</script>

<div class="flex flex-col h-full overflow-y-auto relative">
  <div
    class="flex-1 overflow-y-auto mt-2 text-white"
    bind:this={messagesContainer}
    onscroll={checkIfAtBottom}
  >
    {#each currentMessages as msg}
      <div class="mb-1 wrap-break-word">
        <span class="">{msg.time}</span>
        <span class="inline-flex items-center gap-0.5">
          {#each msg.sender.badges as badge}
            <img src={formatBadgeUrl(badge)} alt="badge" />
          {/each}
        </span>
        <button
          onclick={(e) => toggleUserCard(msg.sender.username, e)}
          class="shrink-0 cursor-pointer"
          style="color: {msg.sender.color};"
        >
          {msg.sender.username}:
        </button>
        <span class="wrap-break-words break-all">
          {msg.content}
        </span>
      </div>
    {/each}
  </div>

  {#if openUserCard}
    <UserCard
      bind:isOpen={openUserCard}
      channel={openUserCard}
      x={cardPosition.x}
      y={cardPosition.y}
    />
  {/if}

  <div class="relative" bind:this={chatInputElement}>
    {#if !isAtBottom}
      <button
        class="absolute w-full bottom-full cursor-pointer flex items-center justify-center text-white bg-black/80 p-1.5 z-10"
        onclick={() => {
          if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
        }}>See current messages</button
      >
    {/if}
    <ChatInput onSubmit={handleMessageSubmit} />
  </div>
</div>
