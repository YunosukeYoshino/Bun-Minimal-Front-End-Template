import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface UseThemeReturn {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
	isDark: boolean;
}

/**
 * ダークモード切り替え（localStorage に永続化）
 *
 * 初期値の優先順位:
 * 1. localStorage に保存された値
 * 2. OS のカラースキーム設定
 * 3. フォールバック: light
 */
export function useTheme(): UseThemeReturn {
	const [theme, setThemeState] = useState<Theme>(() => {
		// SSR 環境では window が存在しないためガード
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('theme') as Theme | null;
			if (stored) return stored;

			// OS のカラースキーム設定を尊重
			return window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
		}
		return 'light';
	});

	useEffect(() => {
		// Tailwind CSS は html 要素の .dark クラスでダークモードを判定
		const root = document.documentElement;
		if (theme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
	}, []);

	const setTheme = useCallback((newTheme: Theme) => {
		setThemeState(newTheme);
	}, []);

	return {
		theme,
		toggleTheme,
		setTheme,
		isDark: theme === 'dark',
	};
}
