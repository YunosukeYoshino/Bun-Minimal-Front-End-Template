import type { Theme } from '../../shared/types'

export type { Theme }

export type ThemeState = {
	readonly theme: Theme
	readonly isDark: boolean
}

export type ThemeActions = {
	readonly toggleTheme: () => void
	readonly setTheme: (theme: Theme) => void
}

export type UseThemeReturn = ThemeState & ThemeActions
