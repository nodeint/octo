# Changelog

## Unreleased

- Replace the `--panel-w-*`, `--panel-h-*` and `--box-size-*` tokens with one size scale on two axes, `--box-w-*` and
  `--box-h-*`, from `xs` (8rem) to `4xl` (60rem) (breaking, no alias). Floating, modal, tooltip, empty, menu and
  attachment min-width keep their sizes. The vertical attachment widens from 6 and 7rem to 8rem, and `ScrollArea`
  `max-height` `lg` goes from 27 to 30rem and `xl` from 37.5 to 40rem.
- Add `width` and `height` props to `Box`, and so to `Stack`, `Flex` and `Grid`, with the type `BoxSize`: a step of the
  box size scale, or `full` for 100%. The types reject `width` together with `bleed="x"` or `bleed="all"`, so
  `PaneHeader` and `PaneFooter` no longer accept `width`.
- Rename `SectionContent` to `SectionBody`, with `SectionBodyProps` and `SectionBodyWidth` (breaking, no alias). Add
  `SectionFooter`, a full-width action row with an `align` of `start` or `end`.
- Add the DS `Header` family (`Header`, `HeaderMedia`, `HeaderContent`, `HeaderAction`, `HeaderTitle`,
  `HeaderDescription`). `Header` takes a `size` of `md` or `sm`, and the title and description take `render`. The
  `Card` and `Section` header parts are built from it. `@workspace/ui` now re-exports DS components by name and does
  not export `Header`.
- `Card` and `Section` headers share a new `header` recipe. They gain a gap between media, content and actions, and
  between actions, and they wrap, so a full-width header media sits above the text. Add `CardHeaderMedia` and
  `SectionHeaderMedia`.
- Move `Card` into the design system; it is still exported from `@workspace/ui`. Only `CardMedia` bleeds to the card
  edge; a bare `img` child no longer does. The media bleed, media action and hover reveal are now panel parts.
- Move `Media` into the design system; it is still exported from `@workspace/ui`.
- Move `Text` into the design system; it now takes `render` instead of `as`.
- `Action` and every element with the `action` class use the label font, set per size from the size set
  (`--role-label-sm-*` for `xs` and `sm`, `--role-label-*` for `md` and `lg`). `ActionLink` has a single size and
  inherits its font from the parent. `Button` keeps its type role.
- Add the DS `ActionLink` component, an anchor that shares `Action`'s paint but never draws a
  border or a background, with a `tone`, a `ghost` or `ghost-subtle` emphasis and an `underline` prop.
- Add the DS `Action` component, a native button styled only by the `action` recipe, and move the shared border
  and row size rules of `Button` and `Toggle` into that recipe.
- Add one source for the focus and invalid ring (`--state-*` tokens and a `state-ring-group` recipe), so every control,
  input group, and combobox chips share the same ring.
- Use the button and input focus and invalid style (border color plus soft halo) on choice controls, slider, tabs,
  scroll area, attachment, badge, bubble, item, and trace.
- Add a reusable docked Panel with a border, rounded corners, and shadow based on Chakra FloatingPanel styles,
  and use it for workspace regions with dotted resize grips and separator lines shown only while dragging.
- Add shared layout space and gap scales, enforce layout/component spacing boundaries, and resolve floating insets
  from tokens.
- Keep collapsed activity tabs keyboard-accessible and preserve workspace drafts when toggling sidebars.
- Use Chakra Tabs selection and panel composition, styled collapsible triggers, and layout primitives in the shell.
- Use Chakra UI's default component styles for the app shell while retaining its layout.
- Replace the greeting example with a generic library scaffold and document its package layout.
- Replace the app shell with a VSCode-style layout: header, left block, main, and a right sidebar that can be
  docked, floating, or closed.
