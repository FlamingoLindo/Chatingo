<script lang="ts">
  import type { OpenChannelProps } from './props';

  let { isTwitchOpen = $bindable(), onAction }: OpenChannelProps = $props();
</script>

<button
  onclick={() => {
    isTwitchOpen = !isTwitchOpen;
    onAction?.();
  }}
  class="relative p-1 w-full hover:bg-[#ff64676c] transition ease-in-out flex items-center border-b-white border focus:ring-0"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
    />
  </svg>
  {isTwitchOpen ? 'Close' : 'Open'} stream
</button>
