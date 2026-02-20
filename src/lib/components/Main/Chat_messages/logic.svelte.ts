import type { IChannel, IMessage } from "$lib/apis/DTO/ITwitch";

export interface ChatMessagesProps {
    selectedChannelId: number;
    channels: IChannel[];
}

export function checkIfAtBottom(messagesContainer: HTMLDivElement): boolean {
    if (messagesContainer) {
        const threshold = 100;
        const scrollBottom =
            messagesContainer.scrollHeight -
            messagesContainer.scrollTop -
            messagesContainer.clientHeight;
        return scrollBottom < threshold;
    }
    return false;
}

export function handleMessageSubmit(message: string, channels: IChannel[], selectedChannelId: number): IChannel[] {
    const newMessage: IMessage = {
        time: new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
        sender: { username: 'flamingo_lindo', color: '#fcba03', badges: [] },
        content: message,
    };
    const channel = channels.find((c: IChannel) => c.id === selectedChannelId);
    if (channel) {
        channel.messages.push(newMessage);
        return [...channels];
    }
    return channels;
}

export function formatBadgeUrl(badgeUrl: string) {
    const formattedUrl = badgeUrl.replace('{SIZE}', '1');
    return formattedUrl;
}

export function toggleUserCard(username: string, event: MouseEvent, openUserCard: string | null, cardPosition: { x: number, y: number }): { openUserCard: string | null, cardPosition: { x: number, y: number } } {
    event.stopPropagation();
    if (openUserCard === username) {
        return { openUserCard: null, cardPosition };
    } else {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        return { openUserCard: username, cardPosition: { x: rect.left, y: rect.top } };
    }
}

export function extractUrls(message: string): { text: string; isUrl: boolean }[] {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const parts: { text: string; isUrl: boolean }[] = [];
    let lastIndex = 0;
    let match;

    while ((match = urlRegex.exec(message)) !== null) {
        if (match.index > lastIndex) {
            parts.push({
                text: message.slice(lastIndex, match.index),
                isUrl: false,
            });
        }
        parts.push({ text: match[0], isUrl: true });
        lastIndex = match.index + match[0].length;
    }

    if (lastIndex < message.length) {
        parts.push({ text: message.slice(lastIndex), isUrl: false });
    }

    return parts;
}