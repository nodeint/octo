import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import stylelint from 'stylelint';
import { afterEach, beforeEach, expect, test } from 'vitest';

const PLUGIN = fileURLToPath(new URL('plugin.mjs', import.meta.url));
const CONFIG = {
  plugins: [PLUGIN],
  rules: {
    'octo/token-tier': true,
    'octo/no-theme-selector': true,
  },
};
const COMPONENT = 'src/components/x/X.css';

/** @type {string} */
let root;

/** @param {string} rel @param {string} content */
function put(rel, content) {
  const file = join(root, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

/** @param {string} rel @param {string} code */
async function run(rel, code) {
  return stylelint.lint({ code, codeFilename: join(root, rel), config: CONFIG });
}

/** @param {string} rel @param {string} code */
async function lint(rel, code) {
  const result = await run(rel, code);
  return result.results[0].warnings.map((w) => `${w.severity}: ${w.text}`);
}

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'stylelint-plugin-'));
  put('src/styles/theme/swatches.css', ':root { --blue-strong: 1; }');
  put('src/styles/theme/base.css', ':root { --base-1: 1; --card: var(--base-1); }');
  put('src/styles/layout/space.css', ':root { --space-sm: 4px; }');
});

afterEach(() => rmSync(root, { recursive: true, force: true }));

test('errors on a component read of a swatch step', async () => {
  expect(await lint(COMPONENT, '.x { a: var(--blue-strong); }')).toEqual([
    expect.stringMatching(/^error: .*raw color token "--blue-strong"/),
  ]);
});

test('errors on a component read of a base step', async () => {
  expect(await lint(COMPONENT, '.x { a: var(--base-1); }')).toEqual([
    expect.stringMatching(/^error: .*raw color token "--base-1"/),
  ]);
});

test('accepts a component read of a role declared in base.css', async () => {
  expect(await lint(COMPONENT, '.x { a: var(--card); }')).toEqual([]);
});

test('accepts a component read of a theme role and a layout token', async () => {
  expect(await lint(COMPONENT, '.x { a: var(--card); b: var(--space-sm); }')).toEqual([]);
});

test('accepts a recipe that declares a custom property from a raw step', async () => {
  expect(await lint('src/styles/recipes/r.css', '.r { --r-bg: var(--blue-strong); }')).toEqual([]);
});

test('errors on a recipe property that reads a raw step', async () => {
  expect(await lint('src/styles/recipes/r.css', '.r { color: var(--blue-strong); }')).toEqual([
    expect.stringMatching(/^error: .*raw color token "--blue-strong"/),
  ]);
});

test('errors when a theme file reads a layout token', async () => {
  expect(await lint('src/styles/theme/b.css', ':root { --y: var(--space-sm); }')).toEqual([
    expect.stringMatching(/^error: A theme token file reads layout token "--space-sm"/),
  ]);
});

test('errors when a layout file reads a theme token', async () => {
  expect(await lint('src/styles/layout/b.css', ':root { --y: var(--card); }')).toEqual([
    expect.stringMatching(/^error: A layout token file reads theme token "--card"/),
  ]);
});

test('accepts a theme file reading a raw step of its own axis', async () => {
  expect(await lint('src/styles/theme/b.css', ':root { --y: var(--base-1); }')).toEqual([]);
});

test('does not check typography.css, components.css or appearance files', async () => {
  const code = ':root { --y: var(--space-sm); --z: var(--blue-strong); }';
  expect(await lint('src/styles/typography.css', code)).toEqual([]);
  expect(await lint('src/styles/components.css', code)).toEqual([]);
  expect(await lint('src/styles/appearance/p.css', code)).toEqual([]);
});

test('errors on .dark in a component', async () => {
  expect(await lint(COMPONENT, '.dark .x { color: red; }')).toEqual([
    expect.stringMatching(/^error: .*\.dark/),
  ]);
});

test('errors on .dark in base.css', async () => {
  expect(await lint('src/styles/base.css', '.dark .x { color: red; }')).toEqual([
    expect.stringMatching(/^error: .*\.dark/),
  ]);
});

test('accepts .dark in utilities.css', async () => {
  expect(await lint('src/styles/utilities.css', '.dark .x { color: red; }')).toEqual([]);
});

test('still errors on a raw color read in utilities.css', async () => {
  expect(await lint('src/styles/utilities.css', '.x { color: var(--blue-strong); }')).toEqual([
    expect.stringMatching(/^error: .*raw color token "--blue-strong"/),
  ]);
});

test('accepts .dark in a theme file', async () => {
  expect(await lint('src/styles/theme/b.css', '.dark { --y: var(--base-1); }')).toEqual([]);
});

test('accepts .dark in an appearance file', async () => {
  expect(await lint('src/styles/appearance/p.css', '.dark { --primary-strong: red; }')).toEqual([]);
});

test('fails loudly when the theme and layout directories cannot be read', async () => {
  rmSync(join(root, 'src/styles/theme'), { recursive: true });
  await expect(lint(COMPONENT, '.x { a: var(--blue-strong); }')).rejects.toThrow();
});
