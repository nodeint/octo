# @workspace/ui

Thin UI kit on Chakra UI. Holds the app layout shell and other complex, reusable components so `app/` stays small.

## Layout

```text
src/
  index.ts
  constants.ts
  layout/
    index.ts
    app-shell.tsx
    app-header.tsx
    app-sidebar.tsx
    app-main.tsx
```

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public package entry |
| `src/constants.ts` | Shared layout dimensions |
| `src/layout/` | Fixed header, responsive sidebar, and main content; exported as `AppShell` |
| `package.json` | Private package; `exports` points at `src`, so there is no build output |

## Rules

- Private and never published; `exports` point at source so the app gets HMR without a build step.
- Stay independent of routing: take navigation and page content as props, never import `react-router`.
- Style only through Chakra props and tokens; add no CSS files.
- Export public symbols explicitly by name through `src/index.ts`; use type-only exports for types.
- Follow the [repository testing rules](../../CONTRIBUTING.md#testing) when adding logic.
