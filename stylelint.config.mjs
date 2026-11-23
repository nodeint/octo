/**
 * Token tier check for `@workspace/ui`. Local only; CI does not run it.
 * `legacyFamilies` lists the primitive families that components still read directly.
 * Those reads are warnings; shrink the list as they migrate to semantic roles.
 */
export default {
  plugins: ['./scripts/lint/stylelint/plugin.mjs'],
  rules: {
    'octo/token-tier': [
      true,
      {
        legacyFamilies: [
          '--space-',
          '--control-',
          '--border-width-',
          '--focus-',
          '--default-transition-',
          '--motion-',
          '--ease-',
          '--z-',
          '--radius-xs',
          '--opacity-',
          '--shadow-',
          '--font-weight-',
        ],
      },
    ],
    'octo/no-theme-selector': true,
  },
};
