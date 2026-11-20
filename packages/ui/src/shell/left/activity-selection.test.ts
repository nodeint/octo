import { expect, test } from 'vitest';

import { parseActivityId, resolveActivityId, toggleSidebar } from './activity-selection';

const ids = ['explorer', 'search'];

test('opens the first activity when nothing was chosen yet', () => {
  expect(resolveActivityId(undefined, ids)).toBe('explorer');
});

test('keeps a collapsed sidebar collapsed', () => {
  expect(resolveActivityId(null, ids)).toBeNull();
});

test('falls back to the first activity when the saved id no longer exists', () => {
  expect(resolveActivityId('removed', ids)).toBe('explorer');
});

test('resolves to nothing when there are no activities', () => {
  expect(resolveActivityId(undefined, [])).toBeNull();
});

test('reads a saved id, a saved collapse, and ignores anything else', () => {
  expect(parseActivityId('"search"')).toBe('search');
  expect(parseActivityId('null')).toBeNull();
  expect(parseActivityId(null)).toBeUndefined();
  expect(parseActivityId('{oops')).toBeUndefined();
  expect(parseActivityId('42')).toBeUndefined();
});

test('collapses an open sidebar', () => {
  expect(toggleSidebar('search', 'search', ids)).toBeNull();
});

test('reopens the last open activity, or the first when it is gone', () => {
  expect(toggleSidebar(null, 'search', ids)).toBe('search');
  expect(toggleSidebar(null, 'removed', ids)).toBe('explorer');
  expect(toggleSidebar(null, null, ids)).toBe('explorer');
});
