<script lang="ts">
  import type { PageData } from "./$types";
  let { data }: { data: PageData } = $props();

  let hoveredEmote: EmoteData | null = $state(null);
  let mouseX: number = $state(0);
  let mouseY: number = $state(0);

  const PREVIEW_WIDTH = 150;
  const PREVIEW_HEIGHT = 180;
  const OFFSET = 15;

  function getEmoteUrl(emote: EmoteData, size: number): string {
    const format = emote.format.includes("animated") ? "animated" : "static";
    return `https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/${format}/dark/${size}.0`;
  }

  function handleMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function getPreviewPosition() {
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

  $effect(() => {
    if (hoveredEmote) {
      getPreviewPosition();
    }
  });
</script>

<main class="flex flex-col h-full bg-black text-white">
  <div class="flex-1 overflow-auto p-4">
    <p class="text-gray-400">Search...</p>
    {#await data.emotesPromise}
      <p>Loading...</p>
    {:then emotes}
      <div class="grid grid-cols-10 gap-3 mt-4">
        {#each emotes as emote}
          <div
            role="button"
            tabindex="0"
            class="flex flex-col items-center p-2 cursor-pointer"
            onmouseenter={() => (hoveredEmote = emote)}
            onmouseleave={() => (hoveredEmote = null)}
            onmousemove={handleMouseMove}
            onkeydown={(e) => e.key === "Enter" && (hoveredEmote = emote)}
          >
            <img
              src={getEmoteUrl(emote, 1)}
              alt={emote.name}
              class="w-8 h-8 object-contain"
            />
          </div>
        {/each}
      </div>

      {#if hoveredEmote}
        {@const position = getPreviewPosition()}
        <div
          class="fixed bg-[#ffffff13] rounded-sm p-4 pointer-events-none z-50"
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
      <p class="text-red-500">Error: {error.message}</p>
    {/await}
  </div>
</main>
