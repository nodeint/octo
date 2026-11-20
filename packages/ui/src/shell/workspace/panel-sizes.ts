import { appStorage } from '../../utils';

const PANEL_SIZES_STORAGE_PREFIX = 'octo:app-shell-panel-sizes';

function isSizeList(value: unknown, length: number): value is number[] {
  return Array.isArray(value) && value.length === length && value.every((size) => typeof size === 'number');
}

/** Each set of panels saves its own sizes, so docking the right sidebar never corrupts the other set. */
function storageKey(panelIds: readonly string[]): string {
  return `${PANEL_SIZES_STORAGE_PREFIX}:${panelIds.join(',')}`;
}

export function readPanelSizes(panelIds: readonly string[]): number[] | undefined {
  const stored = appStorage.getItem(storageKey(panelIds));
  if (stored === null) {
    return undefined;
  }
  try {
    const parsed: unknown = JSON.parse(stored);
    return isSizeList(parsed, panelIds.length) ? parsed : undefined;
  } catch {
    // A corrupt value is no different from no value: fall back to the defaults.
    return undefined;
  }
}

export function savePanelSizes(panelIds: readonly string[], sizes: readonly number[]): void {
  appStorage.setItem(storageKey(panelIds), JSON.stringify(sizes));
}
