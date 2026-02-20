<script lang="ts">
  import type { IChannel } from '$lib/apis/DTO/ITwitch';
  import ChatInput from '../Chat_input/Chat_input.svelte';
  import UserCard from '../User_card/User_card.svelte';
  import {
    checkIfAtBottom,
    extractUrls,
    formatBadgeUrl,
    handleMessageSubmit,
    toggleUserCard,
  } from './logic.svelte';
  import type { ChatMessagesProps } from './props';

  let { selectedChannelId, channels = $bindable() }: ChatMessagesProps =
    $props();

  let openUserCard: string | null = $state(null);
  let cardPosition = $state({ x: 0, y: 0 });
  let currentChannel = $derived(
    channels.find((c: IChannel) => c.id === selectedChannelId)
  );
  let currentMessages = $derived(currentChannel?.messages || []);
  let messagesContainer: HTMLDivElement;
  let chatInputElement: HTMLDivElement;
  let isAtBottom = $state(true);

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
    onscroll={() => {
      isAtBottom = checkIfAtBottom(messagesContainer);
    }}
  >
    {#each currentMessages as msg, i}
      <div
        class="p-1 wrap-break-word border-b border-[#7a7a7a] {i % 2 === 0
          ? 'bg-[#1a1a1a]'
          : ''}"
      >
        <span class="">{msg.time}</span>
        <span class="inline-flex items-center gap-0.5">
          {#each msg.sender.badges as badge}
            <img src={formatBadgeUrl(badge)} alt="badge" />
          {/each}
        </span>
        <button
          onclick={(e) => {
            const result = toggleUserCard(
              msg.sender.username,
              e,
              openUserCard,
              cardPosition
            );
            openUserCard = result.openUserCard;
            cardPosition = result.cardPosition;
          }}
          class="shrink-0 cursor-pointer"
          style="color: {msg.sender.color};"
        >
          {msg.sender.username}:
        </button>
        <span class="wrap-break-words break-all">
          {#each extractUrls(msg.content) as part}
            {#if part.isUrl}
              <a
                href={part.text}
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-400 underline"
              >
                {part.text}
              </a>
            {:else}
              {part.text}
            {/if}
          {/each}
        </span>
      </div>
    {/each}
  </div>

  {#if openUserCard}
    <UserCard bind:isOpen={openUserCard} channel={openUserCard} />
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
    <ChatInput
      onSubmit={(message) => {
        channels = handleMessageSubmit(message, channels, selectedChannelId);
      }}
    />
  </div>
</div>
