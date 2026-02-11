<script lang="ts">
  let {
    isTwitchOpen,
    channelName,
  }: { isTwitchOpen: boolean; channelName: string } = $props();
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
