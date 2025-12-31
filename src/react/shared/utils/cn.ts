import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * クラス名を結合するユーティリティ
 *
 * clsx で条件付きクラスを処理し、tailwind-merge で
 * Tailwind の競合クラス（例: p-2 と p-4）を適切にマージする
 *
 * @example
 * cn('p-4', isActive && 'bg-blue-500', className)
 * cn('p-2', 'p-4') // => 'p-4' (後者が優先)
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
