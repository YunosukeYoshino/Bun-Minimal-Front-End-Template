export type CounterOptions = {
	readonly initialValue?: number;
	readonly min?: number;
	readonly max?: number;
	readonly step?: number;
};

export type CounterState = {
	readonly count: number;
	readonly isAtMin: boolean;
	readonly isAtMax: boolean;
};

export type CounterActions = {
	readonly increment: () => void;
	readonly decrement: () => void;
	readonly reset: () => void;
	readonly set: (value: number) => void;
};

export type UseCounterReturn = CounterState & CounterActions;
