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
    theme/           theme layer: color, elevation and focus/invalid state tokens (state.css); the only axis with `.dark` values
    typography.css   theme layer: type steps and text roles
    variants/        theme layer: tone.css and emphasis.css: the sets that build --variant-*
    layout/          layout layer: control sizes, space, radius, border widths, containers, motion, z-index, opacity
    recipes/         recipes layer, below components: class skins shared by several components
    components.css   components layer: per-part tokens, such as switch, tab, and sidebar parts
    appearance/      appearance layer: one file per data-appearance-* axis
    utilities.css    utilities layer: .sr-only, .no-scrollbar, .scroll-fade-x, .shimmer
```

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public package entry |
| `src/styles/theme/`, `src/styles/layout/` | Token axes; a token's axis is the folder that declares it |
| `package.json` | Private package; `exports` points at `src`, so there is no build output |

## Recipes

A recipe is a stylesheet in `src/styles/recipes/` that gives a kind of element its skin. It binds token roles to
properties and states for every element that opts in by adding the recipe's class
(`action`, `chip`, `field-control`, `group`, `media-frame`, `menu-row`, `state-ring-group`).
Recipes live in the `recipes` cascade layer, which sits below `components`: a component rule beats a recipe rule
whatever the specificity, so a component overrides a recipe without raising its selector.

A stylesheet is a recipe when all of these hold:

1. Opt-in by class. Each selector targets one of the recipe's own classes, its states, or elements inside one of its classes.
   No selector names a component's own class or `data-slot`.
2. Shared. At least two components add the recipe's classes. One component with variants is component CSS.
3. Reads like component CSS. It reads theme roles, layout and component tokens, the documented `--group-*` and
   `--variant-*` hooks and its own private hooks (for example `--menu-gap`), and no raw color step from
   `theme/swatches.css` or `theme/neutral.css`. It declares no theme values: no `:root` or `.dark` block.
   A private hook it declares takes its value from a token.
   The exception is the sets a recipe owns: `[data-action-size]` in `action.css`, `[data-field-size]` in
   `field-control.css`, and `[data-group-size]` and `[data-emphasis]` in `group.css` declare component tokens
   (`--action-*`, `--field-*`, `--group-*`) from the control and radius scales (`--control-*`, `--radius-*`).
   `octo/token-tier` skips custom properties declared in a recipe.
   `group.css` opts in by the `group` class, but it only hands `--group-*` tokens to the actions and fields inside a group.
4. Owns its own parts only. It may lay out the parts it owns (`.menu-content` stacks `.menu-row`s).
   It never lays out or joins another component's children; joins and gaps between group items stay with the group.

Classification test for a reviewer, in order:

1. Only custom properties on `:root`, `.dark` or `data-*` selectors, and no recipe owns them: a token file.
2. Override classes meant to win over components: a utility.
3. Two or more components add its classes, and its selectors pass rules 1 and 4: a recipe.
   `pnpm lint:css` checks only raw color reads (`octo/token-tier`) and `.dark` selectors (`octo/no-theme-selector`).
   The rest of rule 3 (no `:root` block, hooks that take their value from a token) and rules 1, 2 and 4 are review checks.
4. It fails rule 1 or 4 only in a selector listed under Recorded exceptions: a recipe with a transitional exception.
5. Otherwise it is component CSS.

Read direction:

- A recipe reads theme roles, layout and component tokens, `--group-*` and `--variant-*` hooks and its own private hooks.
  Components read recipe classes by adding them; a recipe never names a component.
- A component may set a recipe's input tokens on its own root. It expresses an exception by overriding those tokens,
  never by copying a recipe or a variant set.
- A recipe never reads another recipe's private tokens; it shares a token instead.
- A component never overrides a recipe property. The `recipes` layer sits below `components`, so a component rule
  would win over every recipe state. A component sets the recipe's input tokens instead: `--choice-control-border`,
  `--choice-control-border-invalid` and `--choice-control-border-disabled` for `choice-control.css`,
  `--action-radius` and `--icon-size` for `action.css`. A component that sizes a glyph reads `--icon-size`
  with its own step as the fallback.

`media.css` is the `media-frame` skin shared by the media parts of media, empty, item, attachment and alert dialog.
A part sets `--media-size` (or `--media-width` and `--media-height`), `--media-radius`, `--media-background`,
`--media-foreground` and `--media-icon-size` on its own root, and an image part adds `data-media-fit="image"`.

`overlay.css` holds only the `overlay-*` keyframes shared by modal and anchored overlays; it has no selectors.
`modal.css` is the modal skin (`modal-overlay`, `modal-content`, `modal-footer`, `modal-title`, `modal-description`,
`modal-close-button`) that dialog, alert dialog and sheet opt into by class. A component sets its input tokens
(`--modal-background`, `--modal-shadow`, `--modal-gap`, `--modal-padding`, `--modal-footer-direction`) on its own root.

### Recorded exceptions

An exception applies only while a migration is in progress. A new exception needs the same record
(what it breaks, why it stays, when it ends), and a reviewer rejects a rule break that has none.

| File | Breaks | Why it stays | Removal condition |
| --- | --- | --- | --- |
| `menu.css` | Rule 1, in one selector: `:is(.menu-item, .menu-checkable) > [data-slot='text'][data-overflow='truncate']` names the Text slot | Removing it changes the Text or menu markup | The follow-up gives the row label a recipe-owned hook, or Text exposes a token the row sets |

## Rules

- Private and never published; `exports` point at source so the app gets HMR without a build step.
- Stay independent of routing: take navigation and page content as props, never import `react-router`.
- Export public symbols explicitly by name through `src/index.ts`; use type-only exports for types.
- Follow the [repository testing rules](../../CONTRIBUTING.md#testing) when adding logic.

## Style tokens

- Tokens live in three axes: `theme/` (color and elevation), `layout/` (size, space, radius, border widths, motion,
  z-index, opacity), and `typography.css`. An axis file reads only its own axis, except `typography.css`,
  which reads the `--foreground-*` text colors from `theme/`.
- `theme/swatches.css` and `theme/neutral.css` are raw color scales. The other `theme/` files build roles on them;
  components, recipes, `base.css`, and `utilities.css` read the roles, never a raw step.
- `components.css` holds per-part tokens: switch, radio, checkbox, slider, avatar, scrollbar, tooltip, floating,
  tab, and sidebar. It may read any axis.
- The tone and emphasis sets live in `styles/variants/`, in the theme layer after the tokens.
  The action, field and group size sets and the group variant sets live with their recipe
  (`recipes/action.css`, `recipes/field-control.css`, `recipes/group.css`).
  A group's `variant` maps to a tone and emphasis pair (`lib/group-paint.ts`); the root carries `data-tone` and
  `data-emphasis`, and `group.css` only aliases the resulting `--variant-*` slots to `--group-*`, so it declares no color.
  A group overrides only the tokens that differ, on its own root, with a comment that gives the reason.
- Paint has two axes in `styles/variants/`: `data-tone` (`neutral`, `primary`, `destructive`, `success`,
  `warning`, `info`, `field`) declares `--tone-*` roles and the focus ring, and `data-emphasis` (`solid`, `soft`,
  `outline`, `ghost`, `muted`, `link`, `surface`, `field`) maps the roles to the `--variant-*` slots.
  `Alert` is not an action: it sets `data-tone` from its `variant` and `data-emphasis="surface"`, a static callout
  painted from `--tone-surface`, `--tone-border`, and `--tone-surface-foreground` (`--variant-fg-secondary`).
  Text fields (`field-control`) set `data-tone="field"` and `data-emphasis="field"` and paint from `--variant-*`;
  `--field-*` now holds only size slots. `--group-field-*` still overrides paint inside a group.
  One shared `[data-tone]` block declares the state slots (ring, focus, invalid, disabled text, halos).
  Only those blocks read `--tone-*`; recipes and components read `--variant-*` and never name a tone.
  `Button` and its forwarders keep `variant` as a preset for one approved pair; a caller passes `variant`,
  or `tone` with `emphasis`, never both. Only the six mapped pairs are exposed (`lib/action-paint.ts`).
  `Toggle` and `ToolbarToggle` take `variant` or `emphasis` alone (`ghost` or `outline`); their tone is fixed to `neutral`.
- Put an appearance axis in its own file under `src/styles/appearance/`. The appearance layer sits above components,
  so an axis rebinds a token whatever layer declares it. Put a helper class in `src/styles/utilities.css`.
- Component, recipe, and `base.css` CSS never select `.dark`; put theme-dependent values in a `theme/` file as a
  `:root` / `.dark` pair. `utilities.css` may select `.dark`.
- `pnpm lint:css` enforces these rules locally; CI does not run it. It reports as errors a component, recipe,
  `base.css`, or `utilities.css` read of a raw color step, and a read between `theme/` and `layout/`.
  It does not check `typography.css`, `components.css`, `variants/`, or `appearance/`.
