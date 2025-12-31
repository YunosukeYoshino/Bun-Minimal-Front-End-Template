---
applyTo: "src/react/**"
---

# React Development Instructions

## Component Structure

```
src/react/
├── main.tsx          # Entry point
├── pages/            # Page components (Home.tsx)
├── features/         # Feature modules
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       └── index.ts
└── shared/
    ├── ui/           # shadcn/ui primitives
    └── utils/        # cn() utility
```

## Patterns

### shadcn/ui Component

```tsx
import { cn } from '../../shared/utils/cn';

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

Components go to `src/react/shared/ui/`.

## Theme System

- CSS variables defined in `src/react/styles/style.css`
- Dark mode via `.dark` class on `<html>`
- `useTheme` hook manages theme state (persisted to localStorage)
