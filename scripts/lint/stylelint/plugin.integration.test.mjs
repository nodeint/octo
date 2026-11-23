import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import stylelint from 'stylelint';
import { afterEach, beforeEach, expect, test } from 'vitest';

const PLUGIN = fileURLToPath(new URL('plugin.mjs', import.meta.url));
const LEGACY_TOKENS = {
  '--space-sm': '4px',
  '--control-height': '2rem',
  '--border-width-1': '1px',
  '--focus-width': '2px',
  '--default-transition-duration': '1s',
  '--motion-fast': '1s',
  '--ease-standard': 'ease',
  '--z-raised': '1',
  '--radius-xs': '1px',
  '--opacity-dim': '.5',
  '--shadow-sm': 'none',
  '--font-weight-bold': '700',
};
const CONFIG = {
  plugins: [PLUGIN],
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
  const legacy = Object.entries(LEGACY_TOKENS)
    .map(([name, value]) => `${name}: ${value};`)
    .join(' ');
  put('src/styles/tokens/primitive/a.css', `:root { --raw: 1px; --radius-sm: 2px; ${legacy} }`);
  put('src/styles/tokens/semantic/a.css', ':root { --role: var(--raw); }');
  put('src/styles/tokens/component/a.css', ':root { --part: var(--role); }');
});

afterEach(() => rmSync(root, { recursive: true, force: true }));

test.each(Object.keys(LEGACY_TOKENS))('warns on a component read of %s', async (token) => {
  expect(await lint(COMPONENT, `.x { a: var(${token}); }`)).toEqual([
    expect.stringMatching(/^warning: .*legacy family/),
  ]);
});

test('errors on a component read of a non-legacy primitive', async () => {
  expect(await lint(COMPONENT, '.x { a: var(--raw); }')).toEqual([
    expect.stringMatching(/^error: .*primitive token "--raw"/),
  ]);
});

test('accepts semantic and component reads in a component', async () => {
  expect(await lint(COMPONENT, '.x { a: var(--role); b: var(--part); }')).toEqual([]);
});

test('errors when a primitive file reads a semantic token', async () => {
  expect(await lint('src/styles/tokens/primitive/b.css', ':root { --y: var(--role); }')).toEqual([
    expect.stringMatching(/^error: A primitive token file reads semantic/),
  ]);
});

test('errors when a semantic file reads a component token', async () => {
  expect(await lint('src/styles/tokens/semantic/b.css', ':root { --y: var(--part); }')).toEqual([
    expect.stringMatching(/^error: A semantic token file reads component/),
  ]);
});

test('accepts a semantic file reading a primitive token', async () => {
  expect(await lint('src/styles/tokens/semantic/b.css', ':root { --y: var(--raw); }')).toEqual([]);
});

test('errors on .dark in a component', async () => {
  expect(await lint(COMPONENT, '.dark .x { color: red; }')).toEqual([
    expect.stringMatching(/^error: .*\.dark/),
  ]);
});

test('errors on .dark in utilities.css', async () => {
  expect(await lint('src/styles/utilities.css', '.dark .x { color: red; }')).toEqual([
    expect.stringMatching(/^error: .*\.dark/),
  ]);
});

test('accepts .dark in a token file', async () => {
  expect(await lint('src/styles/tokens/semantic/b.css', '.dark { --y: var(--raw); }')).toEqual([]);
});

test('accepts .dark in an appearance file', async () => {
  expect(await lint('src/styles/appearance/p.css', '.dark { --primary: red; }')).toEqual([]);
});

test('warnings alone do not fail the lint', async () => {
  const result = await run(COMPONENT, '.x { gap: var(--space-sm); }');
  expect(result.errored).toBe(false);
});

test('fails loudly when the token directory cannot be read', async () => {
  rmSync(join(root, 'src/styles/tokens'), { recursive: true });
  await expect(lint(COMPONENT, '.x { a: var(--raw); }')).rejects.toThrow();
});
