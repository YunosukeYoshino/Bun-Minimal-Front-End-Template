export const STORAGE_KEYS = {
	THEME: 'theme',
	TODOS: 'todos',
} as const

// light をデフォルトにする理由: OS設定が取得できない場合の安全なフォールバック
export const DEFAULTS = {
	THEME: 'light',
} as const satisfies Record<string, string>
