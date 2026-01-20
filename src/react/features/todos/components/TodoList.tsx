import { ListTodo, Plus, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import type { TodoId } from '../../../shared/types'
import { Button } from '../../../shared/ui/button.tsx'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../../shared/ui/card.tsx'
import { Checkbox } from '../../../shared/ui/checkbox.tsx'
import { Input } from '../../../shared/ui/input.tsx'
import { useTodos } from '../hooks/useTodos.ts'
import type { Todo } from '../types.ts'

type TodoItemProps = {
	readonly todo: Todo
	readonly onToggle: (id: TodoId) => void
	readonly onDelete: (id: TodoId) => void
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
	return (
		<li className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 group transition-colors">
			<Checkbox
				checked={todo.completed}
				onCheckedChange={() => onToggle(todo.id)}
				aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
			/>
			<span
				className={`flex-1 text-foreground ${
					todo.completed ? 'line-through opacity-50' : ''
				}`}
			>
				{todo.text}
			</span>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => onDelete(todo.id)}
				className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
				aria-label="Delete todo"
			>
				<Trash2 size={16} />
			</Button>
		</li>
	)
}

export function TodoList() {
	const [inputValue, setInputValue] = useState('')
	const {
		todos,
		addTodo,
		toggleTodo,
		deleteTodo,
		clearCompleted,
		completedCount,
		pendingCount,
	} = useTodos()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		addTodo(inputValue)
		setInputValue('')
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<ListTodo size={20} />
					Todo List
				</CardTitle>
				<CardDescription>
					{pendingCount} pending, {completedCount} completed
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="flex gap-2 mb-4">
					<Input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="Add a new task..."
						className="flex-1"
					/>
					<Button type="submit" disabled={!inputValue.trim()}>
						<Plus size={20} />
						Add
					</Button>
				</form>
				{todos.length === 0 ? (
					<div className="text-center py-8 text-muted-foreground">
						<ListTodo size={48} className="mx-auto mb-2 opacity-50" />
						<p>No tasks yet. Add one above!</p>
					</div>
				) : (
					<ul className="space-y-2">
						{todos.map((todo) => (
							<TodoItem
								key={todo.id.value}
								todo={todo}
								onToggle={toggleTodo}
								onDelete={deleteTodo}
							/>
						))}
					</ul>
				)}
			</CardContent>
			{completedCount > 0 && (
				<CardFooter>
					<Button variant="ghost" size="sm" onClick={clearCompleted}>
						<X size={16} />
						Clear completed
					</Button>
				</CardFooter>
			)}
		</Card>
	)
}
