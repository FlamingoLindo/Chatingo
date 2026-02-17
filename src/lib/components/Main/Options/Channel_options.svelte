<script lang="ts">
  import type { MyChannels } from '$lib/apis/DTO/ITwitch';
  import AddChannel from '../Add_channel/Add_channel.svelte';
  import OpenChannel from '../Open_channel/Open_channel.svelte';

  let {
    channels = $bindable(),
    selectedChannelId = $bindable(),
    isTwitchOpen = $bindable(),
  }: {
    channels: MyChannels;
    selectedChannelId: number;
    isTwitchOpen: boolean;
  } = $props();

  let contextOpen: boolean = $state(false);
  let menuElement: HTMLDivElement | null = $state(null);
  let buttonElement: HTMLButtonElement | null = $state(null);
  let menuPosition = $state<'bottom' | 'top'>('bottom');
  let menuAlignment = $state<'left' | 'right'>('left');

  function closeMenu() {
    contextOpen = false;
  }

  function calculatePosition() {
    if (!buttonElement || !menuElement) return;

    const buttonRect = buttonElement.getBoundingClientRect();
    const menuRect = menuElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow < menuRect.height && spaceAbove > spaceBelow) {
      menuPosition = 'top';
    } else {
      menuPosition = 'bottom';
    }

    const spaceRight = viewportWidth - buttonRect.left;

    if (spaceRight < menuRect.width) {
      menuAlignment = 'right';
    } else {
      menuAlignment = 'left';
    }
  }

  $effect(() => {
    if (contextOpen && menuElement) {
      calculatePosition();
    }
  });

  $effect(() => {
    if (!contextOpen) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        menuElement &&
        buttonElement &&
        !menuElement.contains(target) &&
        !buttonElement.contains(target)
      ) {
        closeMenu();
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="relative w-max">
  <button
    bind:this={buttonElement}
    onclick={() => (contextOpen = !contextOpen)}
    class="relative p-1 w-max border border-red-200 hover:bg-[#ff64676c] transition ease-in-out flex items-center mb-1.5 focus:ring-0 gap-1"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 14a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-6 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4m12 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
      />
    </svg>
    Options
  </button>
  {#if contextOpen}
    <div
      bind:this={menuElement}
      class="absolute w-30 bg-[#111111] border border-gray-200 shadow-lg rounded z-1"
      class:top-full={menuPosition === 'bottom'}
      class:bottom-full={menuPosition === 'top'}
      class:left-0={menuAlignment === 'left'}
      class:right-0={menuAlignment === 'right'}
      class:mb-1={menuPosition === 'top'}
    >
      <!-- Add new channel -->
      <AddChannel bind:channels bind:selectedChannelId onAction={closeMenu} />
      <!-- Open/Close stream -->
      <OpenChannel bind:isTwitchOpen onAction={closeMenu} />
    </div>
  {/if}
</div>
