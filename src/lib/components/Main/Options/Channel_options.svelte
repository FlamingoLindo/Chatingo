<script lang="ts">
  import AddChannel from '../Add_channel/Add_channel.svelte';
  import OpenChannel from '../Open_channel/Open_channel.svelte';
  import {
    closeMenu,
    getButtonElement,
    getContextOpen,
    getMenuAlignment,
    getMenuElement,
    getMenuPosition,
    handleClickOutside,
    setButtonElement,
    setMenuAlignment,
    setMenuElement,
    setMenuPosition,
    toggleContextOpen,
  } from './logic.svelte';
  import type { ChannelOptionsProps } from './props';

  let {
    channels = $bindable(),
    selectedChannelId = $bindable(),
    isTwitchOpen = $bindable(),
  }: ChannelOptionsProps = $props();

  function bindButton(element: HTMLButtonElement) {
    setButtonElement(element);
  }

  function bindMenu(element: HTMLDivElement) {
    setMenuElement(element);
  }

  function calculatePosition() {
    const buttonElement = getButtonElement();
    const menuElement = getMenuElement();
    if (!buttonElement || !menuElement) return;

    const buttonRect = buttonElement.getBoundingClientRect();
    const menuRect = menuElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow < menuRect.height && spaceAbove > spaceBelow) {
      setMenuPosition('top');
    } else {
      setMenuPosition('bottom');
    }

    const spaceRight = viewportWidth - buttonRect.left;

    if (spaceRight < menuRect.width) {
      setMenuAlignment('right');
    } else {
      setMenuAlignment('left');
    }
  }

  $effect(() => {
    const contextOpen = getContextOpen();
    const menuElement = getMenuElement();
    if (contextOpen && menuElement) {
      calculatePosition();
    }
  });

  $effect(() => {
    if (!getContextOpen()) return;

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="relative w-max">
  <button
    use:bindButton
    onclick={toggleContextOpen}
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
  {#if getContextOpen()}
    <div
      use:bindMenu
      class="absolute w-30 bg-[#111111] border border-gray-200 shadow-lg rounded z-1"
      class:top-full={getMenuPosition() === 'bottom'}
      class:bottom-full={getMenuPosition() === 'top'}
      class:left-0={getMenuAlignment() === 'left'}
      class:right-0={getMenuAlignment() === 'right'}
      class:mb-1={getMenuPosition() === 'top'}
    >
      <!-- Add new channel -->
      <AddChannel bind:channels bind:selectedChannelId onAction={closeMenu} />
      <!-- Open/Close stream -->
      <OpenChannel bind:isTwitchOpen onAction={closeMenu} />
    </div>
  {/if}
</div>
