# @workspace/ui

Thin UI kit on Chakra UI. Holds the app layout shell and other complex, reusable components so `app/` stays small.

## Layout

```text
src/
  index.ts
  constants.ts
  messages.ts
  color-mode/
    index.ts
    color-mode-button.tsx
    start-color-mode-transition.ts
  provider/
    app-provider.tsx
  theme/
    system.ts
    app-shell-recipe.ts
    use-app-shell-styles.ts
  layout/
    index.ts
    app-shell.tsx
    app-header.tsx
    app-activity-bar.tsx
    app-block.tsx
    app-left-sidebar.tsx
    app-left-drawer.tsx
    app-resize-handle.tsx
    app-workspace.tsx
    panel-sizes.ts
    app-right-sidebar-docked.tsx
    app-right-sidebar-floating.tsx
    app-floating-panel-header.tsx
    floating-panel-rect.ts
    use-floating-panel-rect.ts
    layout-storage.ts
    use-right-sidebar-mode.ts
```

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public package entry |
| `src/messages.ts` | Every user-facing string; values that depend on input are functions so i18n can reorder words |
| `src/constants.ts` | Storage keys and the floating window size |
| `src/color-mode/` | `ColorModeButton`: light/dark toggle with a circular reveal (View Transitions API; none when reduced motion or unsupported) |
| `src/provider/` | `AppProvider`: Chakra provider with the package theme plus class-based `next-themes`; wrap the app once |
| `src/theme/` | Theme system and the `appShell` slot recipe that holds every visual decision of the shell |
| `src/layout/` | VSCode-style `AppShell`: header, activity bar, and resizable left sidebar, main, and right sidebar (Chakra `Splitter`, sizes saved in `localStorage`); the right sidebar is closed, docked, or a `FloatingPanel`, and its mode, position, and size are saved; below `md` (768px) the left sidebar moves into a drawer opened from the header and the right sidebar is only closed or floating, and the floating window is pinned to the bottom right (no drag, resize, reset, or dock; a header button maximizes it) |
| `package.json` | Private package; `exports` points at `src`, so there is no build output |

## Rules

- Private and never published; `exports` point at source so the app gets HMR without a build step.
- Put every user-facing string in `src/messages.ts`; never write display text inline in a component.
- Stay independent of routing: take navigation and page content as props, never import `react-router`.
- Style only through Chakra props, tokens, and the `appShell` slot recipe; add no CSS files.
  Put shell styling in the recipe, not in scattered props.
- Export public symbols explicitly by name through `src/index.ts`; use type-only exports for types.
- Follow the [repository testing rules](../../CONTRIBUTING.md#testing) when adding logic.
