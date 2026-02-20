export function autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

export function handleSubmit(e: Event, message: string, onSubmit?: (message: string) => void): string {
    e.preventDefault();
    if (message.trim() && message.length <= 500) {
        onSubmit?.(message);
        const textarea = (e.target as HTMLFormElement).querySelector('textarea');
        if (textarea) {
            textarea.style.height = 'auto';
        }
        return '';
    }
    return message;
}

export function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const form = (e.target as HTMLTextAreaElement).closest('form');
        form?.requestSubmit();
    }
}

export function insertEmoteAtCursor(emoteName: string, textareaElement: HTMLTextAreaElement | null, message: string): string {
    if (!textareaElement) return message;

    const start = textareaElement.selectionStart;
    const end = textareaElement.selectionEnd;

    const emoteText = ` ${emoteName} `;
    const newMessage = message.slice(0, start) + emoteText + message.slice(end);

    const newCursorPos = start + emoteText.length;

    setTimeout(() => {
        if (textareaElement) {
            textareaElement.focus();
            textareaElement.setSelectionRange(newCursorPos, newCursorPos);
            autoResize(textareaElement);
        }
    }, 0);
    
    return newMessage;
}