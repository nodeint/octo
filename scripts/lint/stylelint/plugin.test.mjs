import path from 'node:path';

import { expect, test } from 'vitest';

import { classifyFile } from './plugin.mjs';

test('derives the styles directory of a component on a Windows path', () => {
  expect(classifyFile(String.raw`C:\repo\packages\ui\src\components\x\X.css`, path.win32)).toEqual({
    kind: 'consumer',
    stylesDir: String.raw`C:\repo\packages\ui\src\styles`,
  });
});

test('derives the axis of a token file on a Windows path', () => {
  expect(classifyFile(String.raw`C:\repo\packages\ui\src\styles\theme\a.css`, path.win32)).toEqual({
    kind: 'token',
    axis: 'theme',
    stylesDir: String.raw`C:\repo\packages\ui\src\styles`,
  });
});

test('derives the axis of a nested token file on a POSIX path', () => {
  expect(classifyFile('/repo/packages/ui/src/styles/layout/a.css', path.posix)).toEqual({
    kind: 'token',
    axis: 'layout',
    stylesDir: '/repo/packages/ui/src/styles',
  });
});

test('classifies base.css as a consumer', () => {
  expect(classifyFile('/r/src/styles/base.css', path.posix)).toEqual({
    kind: 'consumer',
    stylesDir: '/r/src/styles',
  });
});

test('classifies utilities.css as a consumer that may select .dark', () => {
  expect(classifyFile('/r/src/styles/utilities.css', path.posix)).toEqual({
    kind: 'consumer',
    utilities: true,
    stylesDir: '/r/src/styles',
  });
});

test('classifies files under styles/recipes as consumers', () => {
  expect(classifyFile('/r/packages/ui/src/styles/recipes/action.css', path.posix)).toEqual({
    kind: 'consumer',
    recipe: true,
    stylesDir: '/r/packages/ui/src/styles',
  });
});

test('ignores unchecked style files and unrelated paths', () => {
  expect(classifyFile('/r/src/styles/appearance/p.css', path.posix)).toBeUndefined();
  expect(classifyFile('/r/src/styles/typography.css', path.posix)).toBeUndefined();
  expect(classifyFile('/r/src/styles/components.css', path.posix)).toBeUndefined();
  expect(classifyFile('/r/other/x.css', path.posix)).toBeUndefined();
});
