import { useCallback, useEffect, useState } from 'react'
import { STORAGE_KEYS } from '../../../shared/constants'
import type { Theme } from '../../../shared/types'
import type { UseThemeReturn } from '../types'

export function useTheme(): UseThemeReturn {
	// 初期値優先順位: localStorage > OS設定 > light
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window === 'undefined') return 'light'

		const stored = localStorage.getItem(STORAGE_KEYS.THEME)
		if (stored === 'light' || stored === 'dark') return stored

		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
	})

	useEffect(() => {
		// Tailwind v4 は html.dark でダークモード判定
		const root = document.documentElement
		if (theme === 'dark') {
			root.classList.add('dark')
		} else {
			root.classList.remove('dark')
		}
		localStorage.setItem(STORAGE_KEYS.THEME, theme)
	}, [theme])

	const toggleTheme = useCallback(() => {
		setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
	}, [])

	const setTheme = useCallback((newTheme: Theme) => {
		setThemeState(newTheme)
	}, [])

	return {
		theme,
		toggleTheme,
		setTheme,
		isDark: theme === 'dark',
	}
}
