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
| `src/theme/` | Theme system and the `appShell` slot recipe that holds every visual decision of the shell |
| `src/shell/` | VSCode-style `AppShell` driven by an `activities` array (`AppActivity`: id, title, icon, badge, `top` or `bottom` placement, content): header, an activity bar built on Chakra `Tabs` (vertical, with tooltips and badges; clicking the selected icon or pressing Ctrl/Cmd+B collapses the sidebar; the selected id is saved), and resizable left sidebar, main, and right sidebar (Chakra `Splitter`, sizes saved in `localStorage`); the right sidebar is closed, docked, or a `FloatingPanel`, and its mode, position, and size are saved; below `md` (768px) the left sidebar moves into a drawer opened from the header and the right sidebar is only closed or floating, and the floating window is pinned to the bottom right (no drag, resize, reset, or dock; a header button maximizes it) |
| `package.json` | Private package; `exports` points at `src`, so there is no build output |

## Rules

- Private and never published; `exports` point at source so the app gets HMR without a build step.
- Put every user-facing string in `src/messages.ts`; never write display text inline in a component.
- Stay independent of routing: take navigation and page content as props, never import `react-router`.
- Style only through Chakra props, tokens, and the `appShell` slot recipe; add no CSS files.
  Put shell styling in the recipe, not in scattered props.
- Keep constants and storage keys next to the code that uses them; `shell/left/`, `shell/workspace/`, and `shell/right/` never import each other, only `shell/app-shell.tsx` composes them.
- Export public symbols explicitly by name through `src/index.ts`; use type-only exports for types.
- Follow the [repository testing rules](../../CONTRIBUTING.md#testing) when adding logic.
