// @vitest-environment happy-dom
import { afterEach, beforeEach, expect, test } from 'vitest';

import { getLayoutSpacePixels } from './layout-space';
import { system } from './system';

const TOKEN = 'spacing.layout.space.lg';
let originalStyle: string;

beforeEach(() => {
  originalStyle = document.documentElement.style.cssText;
  document.documentElement.style.fontSize = '20px';
});

afterEach(() => {
  document.documentElement.style.cssText = originalStyle;
});

function setSpacing(value: string): void {
  const variable = system.token.var(TOKEN).slice('var('.length, -1);
  document.documentElement.style.setProperty(variable, value);
}

test('converts rem spacing using the current root font size', () => {
  setSpacing('1.5rem');
  expect(getLayoutSpacePixels(TOKEN)).toBe(30);
});

test('keeps pixel spacing independent of the root font size', () => {
  setSpacing('12px');
  expect(getLayoutSpacePixels(TOKEN)).toBe(12);
});

test('resolves a unitless zero spacing', () => {
  setSpacing('0');
  expect(getLayoutSpacePixels(TOKEN)).toBe(0);
});

test('rejects a length the geometry adapter cannot resolve', () => {
  setSpacing('calc(1rem + 2px)');
  expect(() => getLayoutSpacePixels(TOKEN)).toThrow('expected px or rem');
});
