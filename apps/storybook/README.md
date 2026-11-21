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

## Screenshot tests

Each story is rendered in headless Chromium by `@storybook/addon-vitest` and compared with a reference image in
`src/stories/__screenshots__/<story file>/<light|dark>/`. The comparison lives in the `afterEach` hook of `.storybook/preview.tsx` and runs only under Vitest.

```bash
pnpm --filter storybook test         # fail when a story differs from its reference
pnpm --filter storybook test:update  # rewrite references after an intended visual change
```

- First run: `npx playwright install chromium` inside `apps/storybook`.
- Review the changed images in the diff before committing them.
- Reference file names end in the platform (`-darwin`); generate and check images on the same OS.

## Rules

- Private and never published; it only consumes `@workspace/ui` by package name.
- Name each story file after its component and set `title` to `<Group>/<Component>`, matching the folder under `packages/ui/src/components`.
