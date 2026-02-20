import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

export async function openNewWindow() {
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