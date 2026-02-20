<!-- TODO pass in the logged in user -->
<script lang="ts">
  import type { TwitchVideoProps } from './props';

  let { isTwitchOpen, channelName }: TwitchVideoProps = $props();
</script>

{#if isTwitchOpen}
  <iframe
    title="twitch_player"
    src="https://player.twitch.tv/?channel={channelName}&parent=localhost&autoplay=true"
    allowfullscreen
    style="border: none;"
    class="w-full h-1/2 bg-transparent"
  >
  </iframe>
{/if}
