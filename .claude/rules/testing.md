---
paths:
  - "**/*.test.ts"
---

# Testing Instructions

## Test Runner

Bun's built-in test runner with happy-dom for DOM simulation.

## Commands

```bash
bun test              # Run all tests
bun test --watch      # Watch mode
bun test --coverage   # Coverage report
```

## Test Structure

```typescript
import { describe, expect, test, beforeEach, afterEach } from 'bun:test';
import { Window } from 'happy-dom';

const window = new Window();
const document = window.document;

describe('Feature', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  test('does something', () => {
    expect(element).toBeDefined();
  });
});
```

## Location

Test files go to `src/tests/` with `.test.ts` extension.
