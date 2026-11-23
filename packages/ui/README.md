# @workspace/ui

Shared UI components for the app. The package is currently empty; add components under `src/` and export them by name.

## Layout

```text
src/
  index.ts
  styles/
    index.css        layer order and imports
    reset.css        base layer
    base.css         base layer: page defaults only
    tokens/          theme layer
      primitive/     raw scales
      semantic/      roles
      component/     data-* sets and per-part tokens
    appearance/      theme layer: one file per data-appearance-* axis
    utilities.css    utilities layer: .sr-only, .no-scrollbar, .scroll-fade-x, .shimmer
```

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public package entry |
| `src/styles/tokens/` | Token tiers; a token's tier is the folder that declares it |
| `package.json` | Private package; `exports` points at `src`, so there is no build output |

## Rules

- Private and never published; `exports` point at source so the app gets HMR without a build step.
- Stay independent of routing: take navigation and page content as props, never import `react-router`.
- Export public symbols explicitly by name through `src/index.ts`; use type-only exports for types.
- Follow the [repository testing rules](../../CONTRIBUTING.md#testing) when adding logic.

## Style tokens

- Primitive tokens are raw scales with no meaning. Only other tokens read them; components read semantic or component tokens.
- Semantic tokens are roles. A semantic file never reads a component token.
  A primitive file never reads a semantic or component token.
- Component tokens hold the `data-*` size and variant sets and per-part values. They may read any tier.
  The group variant sets (`data-group-variant`) live in `src/styles/tokens/component/group-variants.css`, once for all groups.
  A group overrides only the tokens that differ, on its own root, with a comment that gives the reason.
- Put an appearance axis in its own file under `src/styles/appearance/`. Put a helper class in `src/styles/utilities.css`.
- Component CSS never selects `.dark`; put theme-dependent values in a token file as a `:root` / `.dark` pair.
- `pnpm lint:css` enforces these rules locally; CI does not run it.
  Component reads of the legacy primitive families listed in `stylelint.config.mjs` are warnings
  until they move to semantic roles. Any other violation is an error.
