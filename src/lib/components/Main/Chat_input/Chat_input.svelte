<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import EmoteMenu from '../Emote_menu/Emote_menu.svelte';
  import { listen } from '@tauri-apps/api/event';
  import type { ChatInputProps } from './props';
  import { autoResize, handleKeyDown, handleSubmit, insertEmoteAtCursor } from './logic.svelte';

  let { onSubmit }: ChatInputProps = $props();

  let message: string = $state('');
  let textareaElement: HTMLTextAreaElement | null = $state(null);

  let unlisten: (() => void) | null = null;

  onMount(async () => {
    unlisten = await listen('emote', (event) => {
      const emoteData = event.payload as { name: string };

      if (emoteData && emoteData.name) {
        message = insertEmoteAtCursor(emoteData.name, textareaElement, message);
      }
    });
  });

  onDestroy(() => {
    if (unlisten) {
      unlisten();
    }
  });
</script>

<div>
  <form onsubmit={(e) => {
    message = handleSubmit(e, message, onSubmit);
  }}>
    <div class="relative">
      <textarea
        bind:this={textareaElement}
        bind:value={message}
        oninput={(e) => autoResize(e.currentTarget)}
        onkeydown={handleKeyDown}
        placeholder="Send a message as flamingo_lindo..."
        class="w-full resize-none bg-[#111111] {message.length > 500
          ? 'text-red-500'
          : 'text-white'} placeholder:text-[#ffffff41] overflow-hidden p-3 pr-12 block focus:ring-0 border-0"
        rows="1"
      ></textarea>

      <EmoteMenu />
    </div>
  </form>
</div>
