import { Minus, Plus, RotateCcw } from 'lucide-react';
import { Button } from '../../../shared/ui/button.tsx';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../../shared/ui/card.tsx';
import { useCounter } from '../hooks/useCounter.ts';

interface CounterProps {
	initialValue?: number;
	min?: number;
	max?: number;
	step?: number;
}

export function Counter({
	initialValue = 0,
	min = -99,
	max = 99,
	step = 1,
}: CounterProps) {
	const { count, increment, decrement, reset } = useCounter({
		initialValue,
		min,
		max,
		step,
	});

	const isAtMin = count <= min;
	const isAtMax = count >= max;

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Plus size={20} />
					Counter
				</CardTitle>
				<CardDescription>
					Range: {min} to {max} | Step: {step}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center gap-6">
					<div className="text-6xl font-bold text-foreground tabular-nums">
						{count}
					</div>
					<div className="flex items-center justify-center gap-2">
						<Button
							variant="secondary"
							size="icon"
							onClick={decrement}
							disabled={isAtMin}
							aria-label="Decrement"
						>
							<Minus size={20} />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={reset}
							aria-label="Reset"
						>
							<RotateCcw size={20} />
						</Button>
						<Button
							variant="default"
							size="icon"
							onClick={increment}
							disabled={isAtMax}
							aria-label="Increment"
						>
							<Plus size={20} />
						</Button>
					</div>
				</div>
			</CardContent>
			<CardFooter className="text-sm text-muted-foreground">
				Click buttons to change the counter value
			</CardFooter>
		</Card>
	);
}
