import type { TodoId } from '../../shared/types'

export type Todo = {
	readonly id: TodoId
	readonly text: string
	readonly completed: boolean
	readonly createdAt: Date
}

export type TodoInput = Pick<Todo, 'text'>
