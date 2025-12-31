---
applyTo: "build.ts,dev.ts,bunfig.toml"
---

# Build & Dev Server Instructions

## Development

```bash
bun run dev           # Fullstack server with HMR (port 3000)
bun run dev:vanilla   # Vanilla JS only
bun run dev:react     # React only
```

### Dev Server Config (`dev.ts`)

```typescript
import { serve } from 'bun';

serve({
  port: 3000,
  development: { hmr: true, console: true },
  routes: {
    '/': homepage,
    '/react': reactPage,
  },
});
```

## Production Build

```bash
bun run build         # Minified, no sourcemaps
bun run build:dev     # With sourcemaps
```

### Build Config (`build.ts`)

- `minify`: Production only
- `sourcemap`: Development only ('linked')
- `splitting`: Code splitting enabled
- `env`: `PUBLIC_*` variables inlined

## Environment Variables

Variables with `PUBLIC_` prefix are inlined into client bundle:

```bash
PUBLIC_API_URL=https://api.example.com bun run dev
```

## Bun Config (`bunfig.toml`)

```toml
[serve.static]
plugins = ["bun-plugin-tailwind"]
env = "PUBLIC_*"
```
