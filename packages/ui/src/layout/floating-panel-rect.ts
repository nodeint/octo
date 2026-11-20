import { APP_FLOATING_PANEL_MARGIN, APP_FLOATING_PANEL_RECT_STORAGE_ID, APP_FLOATING_PANEL_SIZE } from '../constants';
import { layoutStorage } from './layout-storage';

const BOTH_SIDES_MARGIN = APP_FLOATING_PANEL_MARGIN + APP_FLOATING_PANEL_MARGIN;

export type FloatingPanelRect = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
};

function isFloatingPanelRect(value: unknown): value is FloatingPanelRect {
  return (
    typeof value === 'object' &&
    value !== null &&
    'x' in value &&
    typeof value.x === 'number' &&
    'y' in value &&
    typeof value.y === 'number' &&
    'width' in value &&
    typeof value.width === 'number' &&
    'height' in value &&
    typeof value.height === 'number'
  );
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

/** The default rect docks to the bottom right corner of the viewport. */
export function defaultFloatingPanelRect(): FloatingPanelRect {
  const { width, height } = APP_FLOATING_PANEL_SIZE;
  return {
    x: window.innerWidth - width - APP_FLOATING_PANEL_MARGIN,
    y: window.innerHeight - height - APP_FLOATING_PANEL_MARGIN,
    width,
    height,
  };
}

/** Reads the saved rect, keeping it inside the current viewport in case the window shrank since. */
export function readFloatingPanelRect(): FloatingPanelRect {
  const stored = layoutStorage.getItem(APP_FLOATING_PANEL_RECT_STORAGE_ID);
  let saved: unknown;
  try {
    saved = stored === null ? undefined : JSON.parse(stored);
  } catch {
    // A corrupt value is no different from no value: fall back to the default.
    saved = undefined;
  }
  const base = isFloatingPanelRect(saved) ? saved : defaultFloatingPanelRect();
  const width = Math.min(base.width, window.innerWidth - BOTH_SIDES_MARGIN);
  const height = Math.min(base.height, window.innerHeight - BOTH_SIDES_MARGIN);
  return {
    width,
    height,
    x: clamp(base.x, 0, window.innerWidth - width),
    y: clamp(base.y, 0, window.innerHeight - height),
  };
}

export function saveFloatingPanelRect(partial: Partial<FloatingPanelRect>): void {
  const next = { ...readFloatingPanelRect(), ...partial };
  layoutStorage.setItem(
    APP_FLOATING_PANEL_RECT_STORAGE_ID,
    JSON.stringify({
      x: Math.round(next.x),
      y: Math.round(next.y),
      width: Math.round(next.width),
      height: Math.round(next.height),
    }),
  );
}
