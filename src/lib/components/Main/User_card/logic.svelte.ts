import { openUrl } from "@tauri-apps/plugin-opener";

export async function openTwitchChannel(channel: string) {
    await openUrl(`https://www.twitch.tv/${channel}`);
}

export function copyTextFromElement(elementId: string) {
    let element = document.getElementById(elementId);
    if (element) {
        navigator.clipboard.writeText(element.textContent || '');
    }
}

export function createCardState() {
    let isDragging = $state(false);
    let dragOffset = $state({ x: 0, y: 0 });
    let position = $state({ x: 0, y: 0 });

    return {
        get isDragging() { return isDragging; },
        get position() { return position; },
        get dragOffset() { return dragOffset; },

        setPosition(newPosition: { x: number; y: number }) {
            position = newPosition;
        },

        startDrag(event: MouseEvent) {
            isDragging = true;
            dragOffset = {
                x: event.clientX - position.x,
                y: event.clientY - position.y,
            };
        },

        drag(event: MouseEvent) {
            if (isDragging) {
                const cardWidth = 320;
                const cardHeight = 144;
                const maxX = window.innerWidth - cardWidth;
                const maxY = window.innerHeight - cardHeight;

                const newX = Math.max(0, Math.min(event.clientX - dragOffset.x, maxX));
                const newY = Math.max(0, Math.min(event.clientY - dragOffset.y, maxY));

                position = { x: newX, y: newY };
            }
        },

        stopDrag() {
            isDragging = false;
        },

        getStyle() {
            return `left: ${position.x}px; top: ${position.y}px; cursor: ${isDragging ? 'grabbing' : 'grab'};`;
        }
    };
}

export function calculateInitialPosition(mouseX: number, mouseY: number) {
    const cardWidth = 320;
    const cardHeight = 144;

    const proposedX = mouseX;
    const proposedY = mouseY - 150;

    const maxX = window.innerWidth - cardWidth;
    const maxY = window.innerHeight - cardHeight;

    const boundedX = Math.max(0, Math.min(proposedX, maxX));
    const boundedY = Math.max(0, Math.min(proposedY, maxY));

    return { x: boundedX, y: boundedY };
}