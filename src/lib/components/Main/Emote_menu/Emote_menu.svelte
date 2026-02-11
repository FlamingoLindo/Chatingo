<script lang="ts">
  import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

  async function openNewWindow() {
    let emoteWindow = await WebviewWindow.getByLabel('emote-window');

    // Recreate window if it was closed
    if (!emoteWindow) {
      emoteWindow = new WebviewWindow('emote-window', {
        url: '/emote-tab',
        title: 'Chatingo - Emotes',
        width: 800,
        height: 600,
        decorations: false,
        zoomHotkeysEnabled: true,
      });
    } else {
      await emoteWindow.show();
      await emoteWindow.setFocus();
    }
  }
</script>

<button
  aria-label="emotes-menu"
  type="button"
  class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-80 transition-opacity"
  onclick={() => {
    openNewWindow();
  }}
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4a4e4e">
    <path
      d="M12 19a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3Zm-6-6.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
    ></path>
    <path
      fill-rule="evenodd"
      d="M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm11 9a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"
    ></path>
  </svg>
</button>
