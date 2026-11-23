/**
 * Token axis checks for `@workspace/ui`. Local only; CI does not run it.
 * Components read theme roles, never a raw color scale; `theme/` and `layout/` do not read each other.
 */
export default {
  plugins: ['./scripts/lint/stylelint/plugin.mjs'],
  rules: {
    'octo/token-tier': true,
    'octo/no-theme-selector': true,
  },
};
