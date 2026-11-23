import path from 'node:path';

import { expect, test } from 'vitest';

import { classifyFile } from './plugin.mjs';

test('derives the token directory of a component on a Windows path', () => {
  expect(classifyFile(String.raw`C:\repo\packages\ui\src\components\x\X.css`, path.win32)).toEqual({
    kind: 'consumer',
    tokensDir: String.raw`C:\repo\packages\ui\src\styles\tokens`,
  });
});

test('derives the tier of a token file on a Windows path', () => {
  expect(
    classifyFile(String.raw`C:\repo\packages\ui\src\styles\tokens\primitive\a.css`, path.win32),
  ).toEqual({
    kind: 'token',
    tier: 'primitive',
    tokensDir: String.raw`C:\repo\packages\ui\src\styles\tokens`,
  });
});

test('derives the token directory of a component on a POSIX path', () => {
  expect(classifyFile('/repo/packages/ui/src/components/x/X.css', path.posix)).toEqual({
    kind: 'consumer',
    tokensDir: '/repo/packages/ui/src/styles/tokens',
  });
});

test('classifies base.css and utilities.css as consumers', () => {
  expect(classifyFile('/r/src/styles/utilities.css', path.posix)?.kind).toBe('consumer');
});

test('classifies files under styles/recipes as consumers', () => {
  expect(classifyFile('/r/packages/ui/src/styles/recipes/action.css', path.posix)).toEqual({
    kind: 'consumer',
    recipe: true,
    tokensDir: '/r/packages/ui/src/styles/tokens',
  });
});

test('ignores appearance files and unrelated paths', () => {
  expect(classifyFile('/r/src/styles/appearance/p.css', path.posix)).toBeUndefined();
  expect(classifyFile('/r/other/x.css', path.posix)).toBeUndefined();
});
