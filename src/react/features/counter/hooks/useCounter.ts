import { useCallback, useState } from 'react';

interface UseCounterOptions {
	initialValue?: number;
	min?: number;
	max?: number;
	step?: number;
}

interface UseCounterReturn {
	count: number;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
	set: (value: number) => void;
}

/**
 * 境界値付きカウンター
 *
 * @example
 * const { count, increment, decrement } = useCounter({ min: 0, max: 100 });
 */
export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
	const {
		initialValue = 0,
		min = -Infinity,
		max = Infinity,
		step = 1,
	} = options;

	const [count, setCount] = useState(initialValue);

	// Math.min/max で境界を超えないようクランプ
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
			// 外部から任意の値を設定する場合も境界内に収める
			setCount(Math.max(min, Math.min(value, max)));
		},
		[min, max],
	);

	return { count, increment, decrement, reset, set };
}
