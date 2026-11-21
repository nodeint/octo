# storybook

Storybook app for browsing and developing `@workspace/ui` components.

| Path | Purpose |
| --- | --- |
| `.storybook/` | Storybook config; `preview.tsx` loads UI styles and the light/dark toolbar |
| `src/stories/` | Stories, one `<Component>.stories.tsx` per component |

## Commands

```bash
pnpm storybook    # http://localhost:6006
pnpm --filter storybook build  # static output in storybook-static/
```

## Rules

- Private and never published; it only consumes `@workspace/ui` by package name.
- Name each story file after its component and set `title` to `<Group>/<Component>`, matching the folder under `packages/ui/src/components`.
