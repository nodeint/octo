import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { resolve } from 'node:path';

import { defineConfig } from 'vitest/config';

const THEMES = ['light', 'dark'] as const;

export default defineConfig({
  test: {
    // Print failures only, like the root config.
    reporters: ['agent'],
    // Lets toMatchScreenshot write reference images; the server stays on localhost.
    api: { allowWrite: true },
    // One project per theme: each runs every story with that theme pinned.
    projects: THEMES.map((theme) => ({
      plugins: [storybookTest({ configDir: '.storybook', initialGlobals: { theme } })],
      test: {
        name: theme,
        browser: {
          enabled: true,
          headless: true,
          provider: playwright(),
          instances: [{ browser: 'chromium' }],
          expect: {
            toMatchScreenshot: {
              // <stories dir>/__screenshots__/<Story file>/<theme>/<story id>-<browser>-<platform>.png
              resolveScreenshotPath: ({ arg, ext, root, screenshotDirectory, testFileDirectory, testFileName, browserName, platform }) =>
                resolve(root, testFileDirectory, screenshotDirectory, testFileName, theme, `${arg}-${browserName}-${platform}${ext}`),
              resolveDiffPath: ({ arg, ext, root, attachmentsDir, testFileDirectory, testFileName, browserName, platform }) =>
                resolve(root, attachmentsDir, testFileDirectory, testFileName, theme, `${arg}-${browserName}-${platform}${ext}`),
            },
          },
        },
      },
    })),
  },
});
