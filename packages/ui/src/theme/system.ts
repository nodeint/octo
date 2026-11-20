import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { appShellSlotRecipe } from './app-shell-recipe';
import { tokens } from './tokens';

export const system = createSystem(
  defaultConfig,
  defineConfig({
    strictTokens: true,
    theme: { tokens, slotRecipes: { appShell: appShellSlotRecipe } },
    globalCss: {
      // Disable the browser's default cross-fade so the circular reveal in ColorModeButton is the only animation.
      '::view-transition-old(root), ::view-transition-new(root)': {
        animation: 'appShell.disabled',
        mixBlendMode: 'normal',
      },
    },
  }),
);
