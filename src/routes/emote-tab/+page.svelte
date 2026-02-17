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

<main class="flex flex-col h-full bg-black text-white">
  <div class="flex-1 overflow-auto p-4">
    <input
      class="w-full text-gray-400 border border-[#ffc9c9] bg-[#111111] p-1 focus:outline-none focus:ring-0"
      placeholder="Search..."
    />
    <EmotesTypes />
  </div>
</main>
