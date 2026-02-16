<script lang="ts">
  import { openUrl } from '@tauri-apps/plugin-opener';
  let { isOpen = $bindable(), channel, x, y }: { isOpen: boolean | string | null; channel: string; x: number; y: number } = $props();

  async function openTwitch(channel: string) {
    await openUrl(`https://www.twitch.tv/${channel}`);
  }

  function copyText(elementId: string) {
    let element = document.getElementById(elementId);
    if (element) {
      navigator.clipboard.writeText(element.textContent || '');
    }
  }

  // Calculate position to show card above the username
  let isDragging = $state(false);
  let dragOffset = $state({ x: 0, y: 0 });
  let position = $state({ x: 0, y: 0 });
  
  const cardWidth = 320;
  const cardHeight = 144;
  
  let initialPosition = $derived.by(() => {
    const proposedX = x;
    const proposedY = y - 150;
    
    const maxX = window.innerWidth - cardWidth;
    const maxY = window.innerHeight - cardHeight;
    
    const boundedX = Math.max(0, Math.min(proposedX, maxX));
    const boundedY = Math.max(0, Math.min(proposedY, maxY));
    
    return { x: boundedX, y: boundedY };
  });
  
  let cardStyle = $derived(`left: ${position.x}px; top: ${position.y}px; cursor: ${isDragging ? 'grabbing' : 'grab'};`);

  function handleMouseDown(event: MouseEvent) {
    isDragging = true;
    dragOffset = {
      x: event.clientX - position.x,
      y: event.clientY - position.y
    };
  }

  function handleMouseMove(event: MouseEvent) {
    if (isDragging) {
      const cardWidth = 320; // w-80
      const cardHeight = 144; // h-36
      const maxX = window.innerWidth - cardWidth;
      const maxY = window.innerHeight - cardHeight;
      
      const newX = Math.max(0, Math.min(event.clientX - dragOffset.x, maxX));
      const newY = Math.max(0, Math.min(event.clientY - dragOffset.y, maxY));
      
      position = { x: newX, y: newY };
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleClickOutside(event: MouseEvent) {
    if (isDragging) return;
    const target = event.target as HTMLElement;
    if (!target.closest('[data-user-card]')) {
      isOpen = null;
    }
  }

  $effect(() => {
    if (isOpen) {
      position = initialPosition;
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  });
</script>

{#if isOpen}
  <!-- Card -->
  <div
    class="fixed w-80 h-36 bg-[#111111] text-white flex items-center gap-8 p-4 border border-[#ffc9c9] z-9999 shadow-2xl"
    style={cardStyle}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    data-user-card
    onmousedown={handleMouseDown}
  >
    <button onclick={() => openTwitch(channel)}>
      <img
        src="https://static-cdn.jtvnw.net/jtv_user_pictures/forsen-profile_image-48b43e1e4f54b5c8-70x70.png"
        alt="user_pfp"
        class="w-20 h-20 hover:bg-[#ffffff38] cursor-pointer"
      />
    </button>
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <button
          class="font-bold text-lg hover:bg-[#ffffff38]"
          id="username"
          onclick={() => copyText('username')}
        >
          forsen
        </button>

        <div class="text-sm flex items-center gap-2">
          <button
            class="hover:bg-[#ffffff38]"
            id="id"
            onclick={() => copyText('id')}
          >
            ID: 1283
          </button>
        </div>
      </div>
      <p class="text-sm">Followers: 912049292</p>
      <p class="text-sm">Created at: 1808-11-12</p>
    </div>
  </div>
{/if}
