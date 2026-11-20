import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { appShellSlotRecipe } from './app-shell-recipe';

export const system = createSystem(
  defaultConfig,
  defineConfig({
    theme: { slotRecipes: { appShell: appShellSlotRecipe } },
    globalCss: {
      // Disable the browser's default cross-fade so the circular reveal in ColorModeButton is the only animation.
      '::view-transition-old(root), ::view-transition-new(root)': {
        animation: 'none',
        mixBlendMode: 'normal',
      },
    },
  }),
);
