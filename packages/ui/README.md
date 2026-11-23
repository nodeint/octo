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
    recipes/         recipes layer, below components: class skins shared by several components
    utilities.css    utilities layer: .sr-only, .no-scrollbar, .scroll-fade-x, .shimmer
```

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public package entry |
| `src/styles/tokens/` | Token tiers; a token's tier is the folder that declares it |
| `package.json` | Private package; `exports` points at `src`, so there is no build output |

## Recipes

A recipe is a stylesheet in `src/styles/recipes/` that gives a kind of element its skin. It binds token roles to
properties and states for every element that opts in by adding the recipe's class (`action`, `field-control`, `group`, `menu-row`).
Recipes live in the `recipes` cascade layer, which sits below `components`: a component rule beats a recipe rule
whatever the specificity, so a component overrides a recipe without raising its selector.

A stylesheet is a recipe when all of these hold:

1. Opt-in by class. Each selector targets one of the recipe's own classes, its states, or elements inside one of its classes.
   No selector names a component's own class or `data-slot`.
2. Shared. At least two components add the recipe's classes. One component with variants is component CSS.
3. Reads like component CSS. It reads semantic and component tokens, the documented `--group-*` and `--variant-*` hooks
   and its own private hooks (for example `--menu-gap`), and no primitive token except the legacy families in
   `stylelint.config.mjs` (warnings). It declares no theme values: no `:root` or `.dark` block.
   A private hook it declares takes its value from a token.
   The exception is the sets a recipe owns: `[data-action-size]` in `action.css`, `[data-field-size]` in
   `field-control.css`, and `[data-group-size]` and `[data-group-variant]` in `group.css` declare component tokens
   (`--action-*`, `--field-*`, `--group-*`) and may read the primitive control scale (`--control-*`, `--radius-*`).
   `octo/token-tier` skips custom properties declared in a recipe.
   `group.css` opts in by the `group` class, but it only hands `--group-*` tokens to the actions and fields inside a group.
4. Owns its own parts only. It may lay out the parts it owns (`.menu-content` stacks `.menu-row`s).
   It never lays out or joins another component's children; joins and gaps between group items stay with the group.

Classification test for a reviewer, in order:

1. Only custom properties on `:root`, `.dark` or `data-*` selectors, and no recipe owns them: a token file.
2. Override classes meant to win over components: a utility.
3. Two or more components add its classes, and its selectors pass rules 1 and 4: a recipe.
   `pnpm lint:css` checks only primitive reads (`octo/token-tier`) and `.dark` selectors (`octo/no-theme-selector`).
   The rest of rule 3 (no `:root` block, hooks that take their value from a token) and rules 1, 2 and 4 are review checks.
4. It fails rule 1 or 4 only in a selector listed under Recorded exceptions: a recipe with a transitional exception.
5. Otherwise it is component CSS.

Read direction:

- A recipe reads semantic and component tokens, `--group-*` and `--variant-*` hooks and its own private hooks.
  Components read recipe classes by adding them; a recipe never names a component.
- A component may set a recipe's input tokens on its own root. It expresses an exception by overriding those tokens,
  never by copying a recipe or a variant set.
- A recipe never reads another recipe's private tokens; it shares a token instead.
- A component never overrides a recipe property. The `recipes` layer sits below `components`, so a component rule
  would win over every recipe state. A component sets the recipe's input tokens instead: `--choice-control-border`,
  `--choice-control-border-invalid` and `--choice-control-border-disabled` for `choice-control.css`,
  `--action-radius` and `--icon-size` for `action.css`. A component that sizes a glyph reads `--icon-size`
  with its own step as the fallback.

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

The primitive reads of the legacy families in these files are warnings, not exceptions.

## Rules

- Private and never published; `exports` point at source so the app gets HMR without a build step.
- Stay independent of routing: take navigation and page content as props, never import `react-router`.
- Export public symbols explicitly by name through `src/index.ts`; use type-only exports for types.
- Follow the [repository testing rules](../../CONTRIBUTING.md#testing) when adding logic.

## Style tokens

- Primitive tokens are raw scales with no meaning. Only other tokens read them; components read semantic or component tokens.
- Semantic tokens are roles. A semantic file never reads a component token.
  A primitive file never reads a semantic or component token.
- Component tokens hold the `data-*` variant sets and per-part values. They may read any tier.
  The action, field and group size sets and the group variant sets live with their recipe
  (`recipes/action.css`, `recipes/field-control.css`, `recipes/group.css`).
  The group variant sets (`data-group-variant`) are declared once for all groups.
  A group overrides only the tokens that differ, on its own root, with a comment that gives the reason.
- Put an appearance axis in its own file under `src/styles/appearance/`. Put a helper class in `src/styles/utilities.css`.
- Component CSS never selects `.dark`; put theme-dependent values in a token file as a `:root` / `.dark` pair.
- `pnpm lint:css` enforces these rules locally; CI does not run it.
  Component reads of the legacy primitive families listed in `stylelint.config.mjs` are warnings
  until they move to semantic roles. Any other violation is an error.
