<script lang="ts">
  import type {
    The7TvAPIResponse,
    EmotesItem,
  } from '$lib/apis/DTO/emotes/7tv.dto';
  import { browser } from '$app/environment';

  let { data }: { data: { emotesPromise: Promise<The7TvAPIResponse> } } =
    $props();
  let isOpen: boolean = $state(true);
  let hoveredEmote: EmotesItem | null = $state(null);
  let mouseX = $state(0);
  let mouseY = $state(0);

  const PREVIEW_WIDTH = 150;
  const PREVIEW_HEIGHT = 180;
  const OFFSET = 15;

  function handleMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }

  function getEmoteUrl(emote: EmotesItem, size: 1 | 2 | 3 | 4): string {
    const animated = emote.emote.flags?.animated;
    const sizeStr = `${size}x`;
    const suffix = animated ? '.webp' : '_static.webp';
    const pattern = `${sizeStr}${suffix}`;

    const matchingImage = emote.emote.images.find((img) =>
      img.url.includes(pattern)
    );

    return matchingImage?.url || emote.emote.images[0]?.url || '';
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

  function extractEmotes(response: The7TvAPIResponse): EmotesItem[] {
    return (
      response.data.search.all.users.items[0]?.style.activeEmoteSet.emotes
        .items || []
    );
  }
</script>

{#if isOpen}
  {#await data.emotesPromise}
    <h1 class="flex justify-center text-2xl">Loading...</h1>
  {:then response}
    {@const emotes = extractEmotes(response)}
    <div
      class="grid grid-cols-10 gap-3"
      onmousemove={handleMouseMove}
      role="region"
      aria-label="7TV Emotes Grid"
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
        >
          <img
            src={getEmoteUrl(emote, 1)}
            alt={emote.alias}
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
          src={getEmoteUrl(hoveredEmote, 4)}
          alt={hoveredEmote.alias}
          class="w-24 h-24 object-contain mx-auto"
        />
        <p class="text-center mt-2 font-semibold">{hoveredEmote.alias}</p>
      </div>
    {/if}
  {:catch error}
    <p class="text-red-500 flex justify-center text-2xl">{error.message}</p>
  {/await}
{/if}
