<script lang="ts">
  import { Format, type EmoteData } from '$lib/apis/DTO/emotes/emotes.dto';
  import { browser } from '$app/environment';
  import { emit } from '@tauri-apps/api/event';

  let { data }: { data: { emotesPromise: Promise<EmoteData[]> } } = $props();

  let isOpen: boolean = $state(true);

  let hoveredEmote: EmoteData | null = $state(null);
  let mouseX = $state(0);
  let mouseY = $state(0);

  const PREVIEW_WIDTH = 150;
  const PREVIEW_HEIGHT = 180;
  const OFFSET = 15;

  function handleMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  function getEmoteUrl(emote: EmoteData, size: number): string {
    const format = emote.format.includes(Format.Animated)
      ? 'animated'
      : 'static';
    return `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/${format}/dark/${size}.0`;
  }

  function getPreviewPosition() {
    if (!browser) return { x: 0, y: 0 };

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = mouseX + OFFSET;
    let y = mouseY + OFFSET;

    if (x + PREVIEW_WIDTH > viewportWidth) {
      x = mouseX - PREVIEW_WIDTH - OFFSET;
    }

    if (y + PREVIEW_HEIGHT > viewportHeight) {
      y = mouseY - PREVIEW_HEIGHT - OFFSET;
    }

    return { x, y };
  }

  async function send_emote(emote: EmoteData) {
    await emit('emote', {
      id: emote.id,
      name: emote.name,
      url: getEmoteUrl(emote, 3),
    });
  }
</script>

{#if isOpen}
  {#await data.emotesPromise}
    <h1 class="flex justify-center text-2xl">Loading...</h1>
  {:then emotes}
    <div
      class="grid grid-cols-10 gap-3"
      onmousemove={handleMouseMove}
      role="region"
      aria-label="Global Emotes Grid"
    >
      {#each emotes as emote}
        <div
          role="button"
          tabindex="0"
          class="flex flex-col items-center p-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
          onmouseenter={() => (hoveredEmote = emote)}
          onmouseleave={() => (hoveredEmote = null)}
          onkeydown={(e) => {
            if (e.key === 'Enter') hoveredEmote = emote;
            if (e.key === 'Escape') hoveredEmote = null;
          }}
          onclick={() => send_emote(emote)}
        >
          <img
            src={getEmoteUrl(emote, 1)}
            alt={emote.name}
            class="w-8 h-8 object-contain"
          />
        </div>
      {/each}
    </div>

    {#if hoveredEmote && browser}
      {@const position = getPreviewPosition()}
      <div
        class="fixed bg-[#ffffff13] rounded-sm p-4 pointer-events-none z-50 backdrop-blur-sm"
        style="left: {position.x}px; top: {position.y}px;"
      >
        <img
          src={getEmoteUrl(hoveredEmote, 3)}
          alt={hoveredEmote.name}
          class="w-24 h-24 object-contain mx-auto"
        />
        <p class="text-center mt-2 font-semibold">{hoveredEmote.name}</p>
      </div>
    {/if}
  {:catch error}
    <p class="text-red-500 flex justify-center text-2xl">{error.message}</p>
  {/await}
{/if}
