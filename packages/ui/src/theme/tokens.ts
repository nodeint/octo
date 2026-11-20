import { defineTokens } from '@chakra-ui/react';

/** Layout measurements that several shell parts must keep equal, such as the activity bar and its items. */
export const tokens = defineTokens({
  sizes: {
    appShell: {
      none: { value: '0' },
      header: { value: '{sizes.14}' },
      activityBar: { value: '{sizes.12}' },
      sidebarHeader: { value: '{sizes.9}' },
      // The gap between two blocks; the resize handle fills it.
      gutter: { value: '{spacing.appShell.gutter}' },
    },
  },
  spacing: {
    layout: {
      space: {
        none: { value: '0' },
        '2xs': { value: '{spacing.1}' },
        xs: { value: '{spacing.1.5}' },
        sm: { value: '{spacing.2}' },
        md: { value: '{spacing.3}' },
        lg: { value: '{spacing.4}' },
        xl: { value: '{spacing.6}' },
        '2xl': { value: '{spacing.8}' },
        '3xl': { value: '{spacing.10}' },
        '4xl': { value: '{spacing.12}' },
        '5xl': { value: '{spacing.16}' },
        '6xl': { value: '{spacing.24}' },
      },
      gap: {
        '2xs': { value: '{spacing.layout.space.2xs}' },
        xs: { value: '{spacing.layout.space.xs}' },
        sm: { value: '{spacing.layout.space.sm}' },
        md: { value: '{spacing.layout.space.md}' },
        lg: { value: '{spacing.layout.space.lg}' },
        xl: { value: '{spacing.layout.space.xl}' },
      },
    },
    appShell: {
      gutter: { value: '{spacing.layout.gap.xs}' },
      contentBottom: { value: 'calc({spacing.appShell.gutter} + {spacing.appShell.safe.bottom})' },
      launcherRight: { value: 'calc({spacing.layout.space.lg} + {spacing.appShell.safe.right})' },
      launcherBottom: { value: 'calc({spacing.layout.space.lg} + {spacing.appShell.safe.bottom})' },
      launcherClearance: { value: 'calc({spacing.layout.space.xl} + {spacing.layout.space.5xl})' },
      safe: {
        right: { value: 'env(safe-area-inset-right, 0px)' },
        bottom: { value: 'env(safe-area-inset-bottom, 0px)' },
      },
    },
  },
  animations: { appShell: { disabled: { value: 'none' } } },
});
