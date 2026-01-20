import { useCallback, useMemo, useState } from 'react';
import { COUNTER_DEFAULTS } from '../constants';
import type { CounterOptions, UseCounterReturn } from '../types';

export function useCounter(options: CounterOptions = {}): UseCounterReturn {
	const {
		initialValue = COUNTER_DEFAULTS.INITIAL_VALUE,
		// 境界なしの場合は Infinity で表現
		min = -Infinity,
		max = Infinity,
		step = COUNTER_DEFAULTS.STEP,
	} = options;

	const [count, setCount] = useState(initialValue);

	const increment = useCallback(() => {
		setCount((prev) => Math.min(prev + step, max));
	}, [step, max]);

	const decrement = useCallback(() => {
		setCount((prev) => Math.max(prev - step, min));
	}, [step, min]);

	const reset = useCallback(() => {
		setCount(initialValue);
	}, [initialValue]);

	const set = useCallback(
		(value: number) => {
			setCount(Math.max(min, Math.min(value, max)));
		},
		[min, max],
	);

	// ボタンの disabled 制御に使用
	const { isAtMin, isAtMax } = useMemo(
		() => ({
			isAtMin: count <= min,
			isAtMax: count >= max,
		}),
		[count, min, max],
	);

	return { count, isAtMin, isAtMax, increment, decrement, reset, set };
}
