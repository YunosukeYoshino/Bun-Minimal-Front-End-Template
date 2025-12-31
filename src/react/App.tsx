import { Counter } from './components/Counter.tsx';
import { Header } from './components/Header.tsx';
import { TodoList } from './components/TodoList.tsx';
import { useTheme } from './hooks/useTheme.ts';

export function App() {
	const { isDark, toggleTheme } = useTheme();

	return (
		<div className="min-h-screen bg-background transition-colors duration-200">
			<Header isDark={isDark} onThemeToggle={toggleTheme} />

			<main className="max-w-4xl mx-auto px-4 py-8">
				<div className="grid gap-8 md:grid-cols-2">
					<Counter initialValue={0} min={-99} max={99} step={1} />
					<TodoList />
				</div>

				<footer className="mt-16 pb-8">
					<div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/60">
						<span>Bun</span>
						<span className="text-muted-foreground/30">+</span>
						<span>React</span>
						<span className="text-muted-foreground/30">+</span>
						<span>shadcn/ui</span>
					</div>
				</footer>
			</main>
		</div>
	);
}
