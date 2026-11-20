import { appStorage } from '../../../utils';

const DEFAULT_SIZE = { width: 380, height: 560 } as const;
const MARGIN = 16;
const RECT_STORAGE_ID = 'octo:app-shell-floating-panel-rect';
const BOTH_SIDES_MARGIN = MARGIN + MARGIN;

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
  // Shrink to fit first: on a phone the default size is wider than the screen.
  const width = Math.min(DEFAULT_SIZE.width, window.innerWidth - BOTH_SIDES_MARGIN);
  const height = Math.min(DEFAULT_SIZE.height, window.innerHeight - BOTH_SIDES_MARGIN);
  return {
    x: window.innerWidth - width - MARGIN,
    y: window.innerHeight - height - MARGIN,
    width,
    height,
  };
}

/** Fits a rect inside the current viewport, for when the window is smaller than when the rect was made. */
export function clampFloatingPanelRect(rect: FloatingPanelRect): FloatingPanelRect {
  const width = Math.min(rect.width, window.innerWidth - BOTH_SIDES_MARGIN);
  const height = Math.min(rect.height, window.innerHeight - BOTH_SIDES_MARGIN);
  return {
    width,
    height,
    x: clamp(rect.x, 0, window.innerWidth - width),
    y: clamp(rect.y, 0, window.innerHeight - height),
  };
}

/** Reads the saved rect, keeping it inside the current viewport in case the window shrank since. */
export function readFloatingPanelRect(): FloatingPanelRect {
  const stored = appStorage.getItem(RECT_STORAGE_ID);
  let saved: unknown;
  try {
    saved = stored === null ? undefined : JSON.parse(stored);
  } catch {
    // A corrupt value is no different from no value: fall back to the default.
    saved = undefined;
  }
  return clampFloatingPanelRect(isFloatingPanelRect(saved) ? saved : defaultFloatingPanelRect());
}

export function saveFloatingPanelRect(partial: Partial<FloatingPanelRect>): void {
  const next = { ...readFloatingPanelRect(), ...partial };
  appStorage.setItem(
    RECT_STORAGE_ID,
    JSON.stringify({
      x: Math.round(next.x),
      y: Math.round(next.y),
      width: Math.round(next.width),
      height: Math.round(next.height),
    }),
  );
}
