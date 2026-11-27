# @workspace/ui

Shared UI components for the app. The package is currently empty; add components under `src/` and export them by name.

## Layout

```text
src/
  index.ts
  styles.css   imports @workspace/ds/styles.css, then components/index.css into the components layer
```

The styles (tokens, recipes, appearance, utilities) live in `@workspace/ds`; see `packages/ds/README.md`.

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public package entry |
| `src/styles/theme/`, `src/styles/layout/` | Token axes; a token's axis is the folder that declares it |
| `package.json` | Private package; `exports` points at `src`, so there is no build output |

## Recipes

A recipe is a stylesheet in `src/styles/recipes/` that gives a kind of element its skin. It binds token roles to
properties and states for every element that opts in by adding the recipe's class
(`action`, `box`, `chip`, `field-control`, `group`, `media`, `menu-row`, `panel`, `row`, `stack`, `state-ring-group`).
Recipes live in the `recipes` cascade layer, which sits below `components`: a component rule beats a recipe rule
whatever the specificity, so a component overrides a recipe without raising its selector.

A stylesheet is a recipe when all of these hold:

1. Opt-in by class. Each selector targets one of the recipe's own classes, its states, or elements inside one of its classes.
   No selector names a component's own class or `data-slot`.
2. Shared. At least two components add the recipe's classes. One component with variants is component CSS.
3. Reads like component CSS. It reads theme roles, layout and component tokens, the documented `--group-*` and
   `--variant-*` hooks and its own private hooks (for example `--menu-gap`), and no raw color step from
   `theme/palette.css`, `theme/swatches.css` or `theme/base.css`. It declares no theme values: no `:root` or `.dark` block.
   A private hook it declares takes its value from a token.
   The exception is the sets a recipe owns: `[data-action-size]` in `action.css`, `[data-link-size]` in `link.css`,
   `[data-field-size]` in `field-control.css`, and `[data-group-size]` in `group.css` declare component tokens
   (`--action-*`, `--link-*`, `--field-*`, `--group-*`) from the control and radius scales (`--control-*`, `--radius-*`).
   `[data-panel-size]` in `panel.css` declares `--panel-inset` and `--panel-gap` from the `--inset-*` and `--gap-*` roles.
   `[data-row-size]` and `[data-row-type]` in `row.css` declare `--row-*` tokens from the control, space and role scales.
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

`media.css` is the `media` skin shared by the media parts of media, empty, item, attachment and alert dialog.
A part sets `--media-size` (or `--media-width` and `--media-height`), `--media-radius`, `--media-background`,
`--media-fg` and `--media-icon-size` on its own root, and an image part adds `data-media-fit="image"`.

`row.css` is the `row` skin: the strip of media, content and actions that item, attachment and alert share, and the
title and description text that alert, empty, popover, section and card also add (`row-title`, `row-description`).
`data-row-type` on the element that wraps the title and description picks their text roles
(`content`, `header`, `compact`), and `data-row-size` (`xs`, `sm`, `md`) picks the padding and gaps.
`row-group` holds rows in a column (`data-orientation="vertical"`, item group) or a scrolling strip
(`data-orientation="horizontal"`, attachment group); set the orientation always, and the gap follows the size of
the rows it holds; `--row-lead-gap` is the gap after a leading icon in a grid row (alert).
The row reads its color from `data-paint` (`--variant-*`), and `data-row-invalid` paints the invalid pair.
Dialog, alert dialog and drawer set the type on their content; a small card sets `content` on its header.
A component sets the input tokens listed in the file header on its own root, and a state color goes in
`--row-description-color`. It never re-declares what a type sets and never overrides a `row` property.

`link.css` styles `[data-link]`: `data-link` is `none`, `hover` or `always` for the underline, and a bare `data-link`
draws none. It forces a transparent background and no border in every state and shows the paint's focus halo, so a
component sets `data-paint` beside it. `[data-link-size]` (`xs`, `sm`, `md`, `lg`) sets `--link-gap`, `--link-icon` and
`--link-radius` and makes the link `inline-flex` for short labels; it adds no height or padding. `ActionLink` sets both.

`stack.css` is the `stack` flex container: `data-stack-size` (`xs`, `sm`, `md`, `lg`; `md` without the attribute)
sets the gap and `data-orientation` (`vertical`, `horizontal`) the axis and `data-stack-align` the cross axis.
A size also declares `--stack-inset` and `--stack-radius`, which a padded or rounded box reads on its own root.
A component never declares `display`, `flex-direction` or `gap` on a stack. The `Stack` component adds the class itself.

`overlay.css` holds only the `overlay-*` keyframes shared by modal and anchored overlays; it has no selectors.
`panel.css` is the `panel` shell (flex column, inset, gap) and the `panel-footer` band that card, dialog, alert dialog and
drawer share. It owns the panel size: `data-panel-size` (`xs`, `sm`, `md`, `lg`; `md` without the attribute) sets
`--panel-inset`, `--panel-gap` and `--panel-radius` (from the `--radius-surface-*` scale), and no component declares them;
a component reads `--panel-radius` for its own corners.
`data-panel-size` is separate from `data-size`.

`modal.css` is the modal skin (`modal-overlay`, `modal-content`, `modal-footer`,
`modal-close-button`) that dialog, alert dialog and drawer opt into by class, next to `panel` and `panel-footer`.
It keeps only the scrim, position, animation, close button and footer direction. A component sets its input tokens
(`--modal-background`, `--modal-shadow`) on its own root.

### Writing a recipe

Every file in `src/styles/recipes/` is written in nested CSS. The convention is enforced by review only; `pnpm lint:css`
does not check it. A rule's subject is the one recipe class or recipe-owned attribute that every selector in the rule
starts from. Review a recipe against these checks:

1. One top-level block per subject. Declarations come first, then nested rules: states, attribute variants,
   pseudo-elements, descendants, context (`:focus > &`) and `@media`.
2. Every nested selector starts with an explicit `&` (`&:hover`, `&[data-size='sm']`, `& svg`, `&::after`, `& > img`).
   A context selector puts `&` last (`:focus > &`). A type selector on the subject is written `&:is(svg)`, never `svg&`.
   No bare nested selector.
3. Nest at most two levels below the top-level block.
4. An attribute that applies without a class (`[data-box-*]`, `[data-media-size]`, `[data-row-type]`, `[data-row-size]`,
   `[data-row-group-size]`, `[data-action-size]`, `[data-icon-size]`, `[data-link]`, `[data-link-size]`)
   is one top-level block per attribute, with its values nested inside: `[data-x] { &[data-x='v'] { … } }`.
   A rule pairing two attributes nests under the first.
   These blocks have a specificity of (0,2,0), not (0,1,0). Check that no element can carry the attribute and a
   competing recipe class when you add or change one.
5. A list that covers one subject is nested as a list inside that subject. A selector list is never a nesting parent,
   because it flattens to `:is(…)` with the highest specificity in the list.
6. A list that covers several subjects stays flat at the top level, with its selector text unchanged. This is on purpose:
   splitting it would duplicate declarations. Its children and `@media` stay flat.
7. A subject's block sits where every cascade winner stays the same. When no single position works, the block
   splits into a second top-level block for the same subject, and a comment names the rule it must follow.
   This is the only allowed second block.
8. Nested rules keep their source order. Rules do not move across files, because the files compete by import order.
9. A `@media` that changes one subject nests inside it as `@media (…) { & { … } }`.
10. The header comment stays first, a rule comment moves with its rule, and indentation is two spaces.

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
  which reads the `--variant-fg-*` text colors from `theme/`.
- `theme/palette.css`, `theme/swatches.css` and `theme/base.css` are raw color scales.
  The other `theme/` files build roles on them; components, recipes, `base.css`, and `utilities.css`
  read the roles, never a raw step.
- `components.css` holds per-part tokens: switch, radio, checkbox, slider, avatar, scrollbar, tooltip, floating,
  tab, and sidebar. It may read any axis.
- The paint variants live in `styles/variants/`, in the theme layer after the tokens.
  The action, field and group size sets and the group variant sets live with their recipe
  (`recipes/action.css`, `recipes/field-control.css`, `recipes/group.css`).
  `action.css` also owns the thin border and the default-shape row size (height, inline padding, gap), so a bare
  `action` element, such as the DS `Action`, is a complete text button. `Button.css` and `Toggle.css` keep only the
  type role and the rules that one control uses. A new `action` element gets the thin border; its color comes from
  paint and is transparent for solid, soft and ghost.
  A group's `variant` maps to a paint name (`lib/group-paint.ts`); the root carries `data-paint`, and `group.css`
  only aliases the resulting `--variant-*` slots to `--group-*`, so it declares no color.
  A group overrides only the tokens that differ, on its own root, with a comment that gives the reason.
- Paint is one attribute, `data-paint`, whose value names a variant: `{tone}-{emphasis}` (`base-outline`,
  `blue-surface`), or `field` alone. Tones are `base`, `primary`, `destructive`, `success`, `warning`, `info`, and
  the 21 swatch hues from `theme/swatches.css`. Emphasis is `solid`, `soft`, `outline`, `muted`, `plain` and
  `surface` for every tone except `primary` (no `surface`), plus `ghost` for `base` and `link` for `primary`.
  `lib/paint.ts` (`paintName`) joins the pair; `lib/action-paint.ts`, `surface-paint.ts` and `group-paint.ts`
  resolve it from the public props.
  Each tone has one file in `styles/variants/` (`blue.css`, `base.css`, ...). Each block there matches one
  name exactly (`[data-paint='blue-outline']`) and declares every `--variant-*` slot itself from the color tokens;
  there is no shared role layer. `paint.css` holds the slots every variant shares: focus, invalid, disabled text,
  placeholder. A selector outside `variants/` that depends on a variant lists it by exact name
  (`Button.css`: `destructive-soft`, `primary-link`); update that list when a variant is added.
  `pnpm lint:paint` fails when blocks of one emphasis declare different slot sets.
  To add a color, copy a tone file, rename the blocks, and import it in `styles/index.css`.
  `Alert` is not an action: it sets `data-paint` to `{variant}-surface`, a static callout.
  Text fields (`field-control`) set `data-paint="field"` and paint from `--variant-*`;
  `--field-*` now holds only size slots. `--group-field-*` still overrides paint inside a group.
  Recipes and components read `--variant-*` and never name a tone.
  `Button` and its forwarders keep `variant` as a preset for one approved pair; a caller passes `variant`,
  or `tone` with `emphasis`, never both. Only the six mapped pairs are exposed (`lib/action-paint.ts`).
  `Toggle` and `ToolbarToggle` take `variant` or `emphasis` alone (`ghost` or `outline`); their tone is fixed to `base`.
- Put an appearance axis in its own file under `src/styles/appearance/`. The appearance layer sits above components,
  so an axis rebinds a token whatever layer declares it. Put a helper class in `src/styles/utilities.css`.
- Component, recipe, and `base.css` CSS never select `.dark`; put theme-dependent values in a `theme/` file as a
  `:root` / `.dark` pair. `utilities.css` may select `.dark`.
- `pnpm lint:css` enforces these rules locally; CI does not run it. It reports as errors a component, recipe,
  `base.css`, or `utilities.css` read of a raw color step, and a read between `theme/` and `layout/`.
  It does not check `typography.css`, `components.css`, `variants/`, or `appearance/`.
