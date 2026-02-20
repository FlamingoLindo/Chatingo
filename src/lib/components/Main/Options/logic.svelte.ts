let contextOpen: boolean = $state(false);
let menuElement: HTMLDivElement | null = $state(null);
let buttonElement: HTMLButtonElement | null = $state(null);
let menuPosition = $state<'bottom' | 'top'>('bottom');
let menuAlignment = $state<'left' | 'right'>('left');

export function getContextOpen() {
    return contextOpen;
}

export function setContextOpen(value: boolean) {
    contextOpen = value;
}

export function toggleContextOpen() {
    contextOpen = !contextOpen;
}

export function getMenuElement() {
    return menuElement;
}

export function setMenuElement(element: HTMLDivElement) {
    menuElement = element;
}

export function getButtonElement() {
    return buttonElement;
}

export function setButtonElement(element: HTMLButtonElement) {
    buttonElement = element;
}

export function getMenuPosition() {
    return menuPosition;
}

export function setMenuPosition(position: 'bottom' | 'top') {
    menuPosition = position;
}

export function getMenuAlignment() {
    return menuAlignment;
}

export function setMenuAlignment(alignment: 'left' | 'right') {
    menuAlignment = alignment;
}

export function closeMenu() {
    contextOpen = false;
}

export function handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    if (
        menuElement &&
        buttonElement &&
        !menuElement.contains(target) &&
        !buttonElement.contains(target)
    ) {
        closeMenu();
    }
}