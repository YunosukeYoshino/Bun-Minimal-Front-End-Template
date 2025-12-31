import { Code2, Github, Moon, Sun } from 'lucide-react';
import { Button } from '../../../shared/ui/button.tsx';

interface HeaderProps {
	isDark: boolean;
	onThemeToggle: () => void;
}

export function Header({ isDark, onThemeToggle }: HeaderProps) {
	return (
		<header className="bg-card border-b border-border transition-colors duration-200">
			<div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="p-2 bg-primary/10 rounded-lg">
						<Code2 size={24} className="text-primary" />
					</div>
					<div>
						<h1 className="text-xl font-bold text-foreground">React Demo</h1>
						<p className="text-sm text-muted-foreground">
							Modern React Patterns Demo
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						size="icon"
						onClick={onThemeToggle}
						aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
					>
						{isDark ? <Sun size={20} /> : <Moon size={20} />}
					</Button>
					<Button
						variant="outline"
						onClick={() => window.open('https://github.com', '_blank')}
						aria-label="View on GitHub"
					>
						<Github size={20} />
						GitHub
					</Button>
				</div>
			</div>
		</header>
	);
}
