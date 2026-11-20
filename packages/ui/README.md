# @workspace/ui

Thin UI kit on Chakra UI. Holds the app layout shell and other complex, reusable components so `app/` stays small.

## Layout

```text
src/
  index.ts
  messages.ts
  components/
    index.ts
    color-mode-button.tsx
    sidebar-view.tsx
    sidebar-section.tsx
  hooks/
    index.ts
    use-app-shell-styles.ts
  provider/
    index.ts
    app-provider.tsx
  theme/
    index.ts
    system.ts
    tokens.ts
    layout-space.ts
    app-shell-recipe.ts
  utils/
    index.ts
    storage.ts
  shell/
    index.ts
    app-shell.tsx
    app-header.tsx
    app-block.tsx
    left/
      index.ts
      app-activity.ts
      app-activity-provider.tsx
      activity-selection.ts
      use-activity-selection.ts
      app-activity-bar.tsx
      app-sidebar-body.tsx
      app-left-sidebar.tsx
      app-left-drawer.tsx
    workspace/
      app-workspace.tsx
      app-resize-handle.tsx
      panel-sizes.ts
    right/
      app-right-sidebar-docked.tsx
      app-right-sidebar-floating.tsx
      use-right-sidebar-mode.ts
      floating-panel/
        app-floating-panel-header.tsx
        floating-panel-rect.ts
        use-floating-panel-rect.ts
```

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public package entry |
| `src/messages.ts` | Every user-facing string; values that depend on input are functions so i18n can reorder words |
| `src/components/` | Shared components outside the shell: `SidebarView` (title bar and actions for one activity), `SidebarSection` (collapsible group), and `ColorModeButton`: light/dark toggle with a circular reveal (View Transitions API; none when reduced motion or unsupported) |
| `src/hooks/` | Shared hooks; `useAppShellStyles` reads the `appShell` slot recipe |
| `src/utils/` | Plain helpers; `appStorage` is a `localStorage` wrapper that is a no-op during server rendering |
| `src/provider/` | `AppProvider`: Chakra provider with the package theme plus class-based `next-themes`; wrap the app once |
| `src/theme/` | Theme system, shell layout tokens, and the `appShell` layout recipe; Chakra components provide their default visual styles |
| `src/shell/` | VSCode-style `AppShell` driven by an `activities` array (`AppActivity`: id, title, icon, badge, `top` or `bottom` placement, content): header, an activity bar built on Chakra `Tabs` (vertical, with tooltips and badges; clicking the selected icon or pressing Ctrl/Cmd+B collapses the sidebar; the selected id is saved), and resizable left sidebar, main, and right sidebar (Chakra `Splitter`, sizes saved in `localStorage`); the right sidebar is closed, docked, or a `FloatingPanel`, and its mode, position, and size are saved; below `md` (768px) the left sidebar moves into a drawer opened from the header and the right sidebar is only closed or floating, and the floating window is pinned to the bottom right (no drag, resize, reset, or dock; a header button maximizes it) |
| `package.json` | Private package; `exports` points at `src`, so there is no build output |

The activity provider shares one Chakra Tabs context across the activity bar and sidebar content, including the drawer.
The bar uses one tab list for both activity groups; `deselectable` collapses the desktop sidebar.
Panels use `Tabs.Content` and remain mounted when switching activities.
Sidebar sections compose independent `Collapsible` controls with Chakra buttons.

## Rules

- Private and never published; `exports` point at source so the app gets HMR without a build step.
- Put every user-facing string in `src/messages.ts`; never write display text inline in a component.
- Stay independent of routing: take navigation and page content as props, never import `react-router`.
- Style only through Chakra props, tokens, and the `appShell` slot recipe; add no CSS files.
  Put shell styling in the recipe, not in scattered props.
- Keep constants and storage keys next to the code that uses them; `shell/left/`, `shell/workspace/`,
  and `shell/right/` never import each other, only `shell/app-shell.tsx` composes them.
- Export public symbols explicitly by name through `src/index.ts`; use type-only exports for types.
- Follow the [repository testing rules](../../CONTRIBUTING.md#testing) when adding logic.

## Theme tokens

- Extend Chakra's `defaultConfig`; preserve its existing tokens and component recipes.
- Use built-in tokens first. Put shell-specific tokens under `appShell` in each token category.
  Keep color roles in semantic tokens that reference Chakra's `bg`, `fg`, and `border` roles.
- Use `layout.space.*` for layout padding, margins, and insets; use `layout.gap.*` for ordinary layout gaps.
  Component recipes keep Chakra's spacing. Choose component `size` and `variant` instead of overriding internal spacing.
- Keep composed transitions and shadows in recipe-local CSS variables when they do not need a shared token.
  Token references inside strings and CSS variables are not checked by TypeScript.
- `strictTokens` checks named style values; `useAppShellStyles` exposes the generated shell slot names.
- `pnpm install` and the UI package build generate Chakra typings from `src/theme/system.ts`.
  After editing tokens or slots, run `pnpm --filter @workspace/ui typegen` and restart the TypeScript server if needed.
  Generated typings live in `node_modules`; do not commit them.

### Layout spacing

The layout scale aliases Chakra spacing without changing its built-in tokens or component recipes.
Pixel equivalents below assume a 16px root font size; the actual lengths use Chakra's `rem` values.

| Step | Chakra spacing | Pixels |
| --- | --- | --- |
| `2xs` | `1` | 4 |
| `xs` | `1.5` | 6 |
| `sm` | `2` | 8 |
| `md` | `3` | 12 |
| `lg` | `4` | 16 |
| `xl` | `6` | 24 |
| `2xl` | `8` | 32 |
| `3xl` | `10` | 40 |
| `4xl` | `12` | 48 |
| `5xl` | `16` | 64 |
| `6xl` | `24` | 96 |

- `layout.space.none` resets spacing to zero.
- `layout.gap.2xs` through `layout.gap.xl` reference the space tokens of the same name and value.
  Use larger space steps for section-level gaps.
- Shell relationships keep aliases, such as `appShell.gutter` referencing `layout.gap.xs`.
  Heights, widths, splitter constraints, and safe-area environment values remain separate from this spacing scale.
- Geometry code receives pixels from `getLayoutSpacePixels` after the provider's CSS variables are available.
  The adapter supports resolved `px`, `rem`, and zero, and throws for unresolved or unsupported lengths.

```tsx
<Stack p="layout.space.md" gap="layout.gap.sm">
  <Input size="sm" />
  <Button size="sm" variant="solid">Search</Button>
</Stack>
```

The `layout/spacing` ESLint rule checks Chakra JSX imports, the internal `AppBlock` layout wrapper,
and Chakra recipe definitions in `packages/ui/src` and `app/src`.
It follows local constant references, object spreads, conditional values, and responsive objects or arrays.
It rejects numeric spacing and internal component spacing overrides; the shell recipe identifies its component-owned slots
in the ESLint configuration.
Opaque imported style objects and runtime-computed style spreads are not analyzed; prefer directly checkable declarations.
