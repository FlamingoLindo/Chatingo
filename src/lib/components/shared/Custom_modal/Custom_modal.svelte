<script lang="ts">
  let {
    title,
    text,
    input,
    isModalOpen = $bindable(false),
    inputValue = $bindable(''),
    errorMessage = $bindable(''),
    onConfirm,
  } = $props<{
    title: string;
    text: string;
    input?: boolean;
    isModalOpen: boolean;
    inputValue?: string;
    errorMessage?: string;
    onConfirm: () => void;
  }>();

  let modalElement: HTMLDivElement = $state()!;
  let inputElement: HTMLInputElement = $state()!;

  $effect(() => {
    if (isModalOpen) {
      if (input && inputElement) {
        inputElement.focus();
      } else if (modalElement) {
        modalElement.focus();
      }
    }
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.target instanceof HTMLInputElement) {
      if (e.key === 'Escape') {
        isModalOpen = false;
      }
      return;
    }

    const key = e.key.toLowerCase();

    if (key === 'y' || key === 'enter' || key === ' ') {
      e.preventDefault();
      onConfirm();
    } else if (key === 'escape' || key === 'c') {
      e.preventDefault();
      isModalOpen = false;
    }
  }
</script>

{#if isModalOpen}
  <div
    bind:this={modalElement}
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-red-800 rounded-md z-1"
    onkeydown={handleKeydown}
    role="dialog"
    tabindex="-1"
  >
    <div class="bg-[#111111] p-2">
      <div class="flex justify-between items-center border-b-2 border-white">
        <!-- Title -->
        <p class="text-white text-left">{title}</p>

        <!-- Close modal X -->
        <span
          role="button"
          tabindex="0"
          onclick={() => (isModalOpen = false)}
          onkeydown={(e) => e.key === 'Enter' && (isModalOpen = false)}
          class="hover:bg-[#ffffff36] cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="#ffffff"
              d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
            />
          </svg>
        </span>
      </div>
      <div
        class="bg-[#00000073] mt-2 p-2 rounded text-white place-items-center"
      >
        <!-- Informative text -->
        {text}

        <!-- Input -->
        {#if input}
          <form
            onsubmit={(e) => {
              e.preventDefault();
              onConfirm();
            }}
          >
            <input
              bind:this={inputElement}
              bind:value={inputValue}
              class="mt-2 w-full bg-[#111111] border-2 border-red-800 rounded p-1 text-white focus:outline-none focus:ring-0 focus:border-red-500"
              type="text"
              autocomplete="off"
              spellcheck="false"
            />
            {#if errorMessage}
              <p class="text-red-500 text-sm mt-1 text-left">{errorMessage}</p>
            {/if}
          </form>
        {/if}

        <!-- Buttons -->
        <div class="mt-2">
          <button
            class="bg-red-500 w-20 p-0.5 rounded-sm hover:bg-red-700"
            onclick={onConfirm}
            type="button"
          >
            Yes
          </button>
          <button
            class="bg-red-500 w-20 p-0.5 rounded-sm hover:bg-red-700"
            onclick={() => (isModalOpen = false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}
