# @workspace/ui

Shared UI components for the app. The package is currently empty; add components under `src/` and export them by name.

## Layout

```text
src/
  index.ts
```

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public package entry |
| `package.json` | Private package; `exports` points at `src`, so there is no build output |

## Rules

- Private and never published; `exports` point at source so the app gets HMR without a build step.
- Stay independent of routing: take navigation and page content as props, never import `react-router`.
- Export public symbols explicitly by name through `src/index.ts`; use type-only exports for types.
- Follow the [repository testing rules](../../CONTRIBUTING.md#testing) when adding logic.
