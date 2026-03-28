import { useCallback, useMemo, useState } from 'react';
import type { TodoId } from '../../../shared/types';
import { createTodoId } from '../../../shared/utils/id';
import type { Todo } from '../types';

type UseTodosReturn = {
	readonly todos: readonly Todo[];
	readonly addTodo: (text: string) => void;
	readonly toggleTodo: (id: TodoId) => void;
	readonly deleteTodo: (id: TodoId) => void;
	readonly clearCompleted: () => void;
	readonly completedCount: number;
	readonly pendingCount: number;
};

export function useTodos(initialTodos: readonly Todo[] = []): UseTodosReturn {
	const [todos, setTodos] = useState<readonly Todo[]>(initialTodos);

	const addTodo = useCallback((text: string) => {
		const trimmedText = text.trim();
		if (!trimmedText) return;

		const newTodo: Todo = {
			id: createTodoId(),
			text: trimmedText,
			completed: false,
			createdAt: new Date(),
		};
		// 先頭追加: 最新タスクをリスト上部に表示するUX
		setTodos((prev) => [newTodo, ...prev]);
	}, []);

	const toggleTodo = useCallback((id: TodoId) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id.value === id.value
					? { ...todo, completed: !todo.completed }
					: todo,
			),
		);
	}, []);

	const deleteTodo = useCallback((id: TodoId) => {
		setTodos((prev) => prev.filter((todo) => todo.id.value !== id.value));
	}, []);

	const clearCompleted = useCallback(() => {
		setTodos((prev) => prev.filter((todo) => !todo.completed));
	}, []);

	const { completedCount, pendingCount } = useMemo(() => {
		const completed = todos.filter((todo) => todo.completed).length;
		return {
			completedCount: completed,
			pendingCount: todos.length - completed,
		};
	}, [todos]);

	return {
		todos,
		addTodo,
		toggleTodo,
		deleteTodo,
		clearCompleted,
		completedCount,
		pendingCount,
	};
}
