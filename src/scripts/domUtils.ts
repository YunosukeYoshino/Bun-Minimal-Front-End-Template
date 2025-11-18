// DOM操作ユーティリティ
export function addButtonClass(element: HTMLElement, className: string): void {
	element.classList.add(className);
}

export function toggleElementVisibility(element: HTMLElement): void {
	element.style.display = element.style.display === 'none' ? 'block' : 'none';
}

export function handleClickEvent(
	element: HTMLElement,
	callback: () => void,
): void {
	element.addEventListener('click', callback);
}
