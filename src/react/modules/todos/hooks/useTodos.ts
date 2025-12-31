import { useCallback, useState } from 'react';

export interface Todo {
	id: string;
	text: string;
	completed: boolean;
	createdAt: Date;
}

interface UseTodosReturn {
	todos: Todo[];
	addTodo: (text: string) => void;
	toggleTodo: (id: string) => void;
	deleteTodo: (id: string) => void;
	clearCompleted: () => void;
	completedCount: number;
	pendingCount: number;
}

export function useTodos(initialTodos: Todo[] = []): UseTodosReturn {
	const [todos, setTodos] = useState<Todo[]>(initialTodos);

	const addTodo = useCallback((text: string) => {
		if (!text.trim()) return;
		const newTodo: Todo = {
			id: crypto.randomUUID(),
			text: text.trim(),
			completed: false,
			createdAt: new Date(),
		};
		setTodos((prev) => [newTodo, ...prev]);
	}, []);

	const toggleTodo = useCallback((id: string) => {
		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo,
			),
		);
	}, []);

	const deleteTodo = useCallback((id: string) => {
		setTodos((prev) => prev.filter((todo) => todo.id !== id));
	}, []);

	const clearCompleted = useCallback(() => {
		setTodos((prev) => prev.filter((todo) => !todo.completed));
	}, []);

	const completedCount = todos.filter((todo) => todo.completed).length;
	const pendingCount = todos.filter((todo) => !todo.completed).length;

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
