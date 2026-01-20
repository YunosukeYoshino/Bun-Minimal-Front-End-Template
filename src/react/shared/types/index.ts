export type TodoId = {
	readonly value: string
	readonly _tag: 'TodoId'
}

export type Nullable<T> = T | null
export type Optional<T> = T | undefined

export type PropsWithClassName<T = unknown> = T & {
	className?: string
}

export type PropsWithChildren<T = unknown> = T & {
	children?: React.ReactNode
}

export type Theme = 'light' | 'dark'
