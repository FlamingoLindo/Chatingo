<script lang="ts">
  import type { UserCardProps } from './props';
  import {
    copyTextFromElement,
    openTwitchChannel,
    createCardState,
    calculateInitialPosition,
  } from './logic.svelte';

  let { isOpen = $bindable(), channel }: UserCardProps = $props();

  const cardState = createCardState();

  let mouseX = $state(0);
  let mouseY = $state(0);

  let cardStyle = $derived(cardState.getStyle());

  function handleClickOutside(event: MouseEvent) {
    if (cardState.isDragging) return;
    const target = event.target as HTMLElement;
    if (!target.closest('[data-user-card]')) {
      isOpen = null;
    }
  }

  $effect(() => {
    if (isOpen) {
      const initialPos = calculateInitialPosition(mouseX, mouseY);
      cardState.setPosition(initialPos);

      const clickHandler = (event: MouseEvent) => handleClickOutside(event);
      const moveHandler = (event: MouseEvent) => cardState.drag(event);
      const upHandler = () => cardState.stopDrag();

      document.addEventListener('click', clickHandler);
      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('mouseup', upHandler);

      return () => {
        document.removeEventListener('click', clickHandler);
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
      };
    }
  });
</script>

{#if isOpen}
  <div
    class="fixed w-80 h-36 bg-[#111111] text-white flex items-center gap-8 p-4 border border-[#ffc9c9] z-9999 shadow-2xl"
    style={cardStyle}
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    data-user-card
    onmousedown={(e) => cardState.startDrag(e)}
  >
    <button onclick={() => openTwitchChannel(channel)}>
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
          onclick={() => copyTextFromElement('username')}
        >
          forsen
        </button>

        <div class="text-sm flex items-center gap-2">
          <button
            class="hover:bg-[#ffffff38]"
            id="id"
            onclick={() => copyTextFromElement('id')}
          >
            ID: 1283
          </button>
        </div>
      </div>
      <p class="text-sm">Followers: 912049292</p>
      <p class="text-sm">Created at: 1808-11-12</p>
    </div>

    <button
      class="absolute top-2 right-2 cursor-pointer hover:bg-[#ffffff36]"
      aria-label="close_user_card"
      onclick={() => (isOpen = !isOpen)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
      >
        <path
          fill="#ffffff"
          d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
        />
      </svg>
    </button>
  </div>
{/if}
