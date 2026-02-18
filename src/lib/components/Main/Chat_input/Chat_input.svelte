<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import EmoteMenu from '../Emote_menu/Emote_menu.svelte';
  import { listen } from '@tauri-apps/api/event';

  interface Props {
    onSubmit?: (message: string) => void;
  }

  let { onSubmit }: Props = $props();
  let message: string = $state('');
  let textareaElement: HTMLTextAreaElement | null = $state(null);

  function autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (message.trim() && message.length <= 500) {
      onSubmit?.(message);
      message = '';
      const textarea = (e.target as HTMLFormElement).querySelector('textarea');
      if (textarea) {
        textarea.style.height = 'auto';
      }
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = (e.target as HTMLTextAreaElement).closest('form');
      form?.requestSubmit();
    }
  }

  function insertEmoteAtCursor(emoteName: string) {
    if (!textareaElement) return;

    const start = textareaElement.selectionStart;
    const end = textareaElement.selectionEnd;

    const emoteText = ` ${emoteName} `;
    message = message.slice(0, start) + emoteText + message.slice(end);

    const newCursorPos = start + emoteText.length;

    setTimeout(() => {
      if (textareaElement) {
        textareaElement.focus();
        textareaElement.setSelectionRange(newCursorPos, newCursorPos);
        autoResize(textareaElement);
      }
    }, 0);
  }

  let unlisten: (() => void) | null = null;

  onMount(async () => {
    unlisten = await listen('emote', (event) => {
      const emoteData = event.payload as { name: string };

      if (emoteData && emoteData.name) {
        insertEmoteAtCursor(emoteData.name);
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
  <form onsubmit={handleSubmit}>
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
