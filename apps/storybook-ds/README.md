# storybook-ds

Storybook app for browsing and developing `@workspace/ds` components. It does not depend on `@workspace/ui`.

| Path | Purpose |
| --- | --- |
| `.storybook/` | Storybook config; `preview.tsx` loads DS styles and the appearance toolbar |
| `src/stories/` | Stories, one `<Component>.stories.tsx` per DS component |

## Commands

```bash
pnpm storybook:ds                     # http://localhost:6007
pnpm --filter storybook-ds build      # static output in storybook-static/
pnpm test:storybook:ds                # screenshot tests
pnpm --filter storybook-ds test:update
```

## Rules

- Private and never published; it only consumes `@workspace/ds` by package name.
- Stories use plain HTML elements for content, never `@workspace/ui`.
- Set `title` to `Components/<Component>`.
