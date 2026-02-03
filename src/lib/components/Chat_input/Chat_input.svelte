<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    onSubmit?: (message: string) => void;
  }

  let { onSubmit }: Props = $props();
  let message: string = $state("");

  function autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (message.trim() && message.length <= 500) {
      onSubmit?.(message);
      message = "";
      const textarea = (e.target as HTMLFormElement).querySelector("textarea");
      if (textarea) {
        textarea.style.height = "auto";
      }
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = (e.target as HTMLTextAreaElement).closest("form");
      form?.requestSubmit();
    }
  }
</script>

<form onsubmit={handleSubmit}>
  <textarea
    bind:value={message}
    oninput={(e) => autoResize(e.currentTarget)}
    onkeydown={handleKeyDown}
    placeholder="Send a message as flamingo_lindo..."
    class="w-full resize-none bg-[#111111] {message.length > 500
      ? 'text-red-500'
      : 'text-white'} placeholder:text-[#ffffff41] overflow-hidden p-3 block focus:ring-0 border-0 rounded-b-[10px]"
    rows="1"
  ></textarea>
  <!-- TODO add emote menu -->
</form>
