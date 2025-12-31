---
applyTo: "src/react/**"
---

# React Development Instructions

## Component Structure

```
src/react/
├── components/
│   ├── ui/           # shadcn/ui primitives (button, card, input, checkbox)
│   └── [Feature].tsx # Feature components (Counter, TodoList, Header)
├── hooks/
│   └── use[Feature].ts # Custom hooks (useCounter, useTodos, useTheme)
└── lib/
    └── utils.ts      # cn() utility for class merging
```

## Patterns

### shadcn/ui Component

```tsx
import { cn } from '../lib/utils';

interface Props {
  className?: string;
}

export function Component({ className, ...props }: Props) {
  return <div className={cn('base-classes', className)} {...props} />;
}
```

### Custom Hook

```tsx
import { useState, useCallback } from 'react';

export function useFeature(options = {}) {
  const [state, setState] = useState(options.initialValue ?? 0);
  const action = useCallback(() => setState(prev => prev + 1), []);
  return { state, action };
}
```

## Adding shadcn/ui Components

```bash
bunx shadcn@latest add [component]
```

Components go to `src/react/components/ui/`.

## Theme System

- CSS variables defined in `src/react/style.css`
- Dark mode via `.dark` class on `<html>`
- `useTheme` hook manages theme state (persisted to localStorage)
