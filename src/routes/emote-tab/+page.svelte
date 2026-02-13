<script lang="ts">
  import EmotesTypes from '$lib/components/Emotes/Emotes_types/Emotes_types.svelte';

  let mouseX: number = $state(0);
  let mouseY: number = $state(0);

  function handleMouseMove(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
</script>

<svelte:window onmousemove={handleMouseMove} />

<main class="h-full bg-black text-white">
  <div class="flex-1 overflow-auto p-4">
    <p class="text-gray-400">Search...</p>
    <EmotesTypes />
  </div>
</main>
