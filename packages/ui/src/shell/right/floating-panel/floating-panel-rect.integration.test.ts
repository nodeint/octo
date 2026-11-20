// @vitest-environment happy-dom
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { clampFloatingPanelRect, defaultFloatingPanelRect } from './floating-panel-rect';

beforeEach(() => {
  vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(320);
  vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(480);
});

afterEach(() => {
  vi.restoreAllMocks();
});

test('fits the default panel inside the supplied layout inset', () => {
  expect(defaultFloatingPanelRect(20)).toEqual({ x: 20, y: 20, width: 280, height: 440 });
});

test('clamps oversized saved panels using the supplied layout inset', () => {
  expect(clampFloatingPanelRect({ x: 500, y: 600, width: 900, height: 900 }, 20)).toEqual({
    x: 40, y: 40, width: 280, height: 440,
  });
});
