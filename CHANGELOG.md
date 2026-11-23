# Changelog

## Unreleased

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
