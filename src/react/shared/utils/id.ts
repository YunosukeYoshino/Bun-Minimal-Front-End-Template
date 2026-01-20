import type { TodoId } from '../types'

export function createTodoId(): TodoId {
	return {
		value: crypto.randomUUID(),
		_tag: 'TodoId',
	}
}
