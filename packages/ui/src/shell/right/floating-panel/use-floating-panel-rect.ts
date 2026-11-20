import { useEffect, useRef, useState } from 'react';

import { getLayoutSpacePixels } from '../../../theme/layout-space';
import {
  clampFloatingPanelRect,
  defaultFloatingPanelRect,
  type FloatingPanelRect,
  readFloatingPanelRect,
  saveFloatingPanelRect,
} from './floating-panel-rect';

function readInset(): number {
  return getLayoutSpacePixels('spacing.layout.space.lg');
}

type UseFloatingPanelRectOptions = {
  readonly isFloating: boolean;
  readonly isMaximized: boolean;
  /** A pinned window is recomputed from the screen, so it always sits in the same corner. */
  readonly isCompact: boolean;
};

type FloatingPanelRectControls = {
  readonly rect: FloatingPanelRect;
  readonly update: (change: Partial<FloatingPanelRect>) => void;
  readonly saveCurrent: () => void;
  readonly reset: () => void;
  /** Reload the rect for the current screen; call it on every mode change. */
  readonly refresh: () => void;
};

/**
 * Controlled rect for the floating window, so it survives docking and reopening (the machine alone
 * falls back to a fixed position whenever it mounts already open) and never sits off screen.
 */
export function useFloatingPanelRect({
  isFloating,
  isMaximized,
  isCompact,
}: UseFloatingPanelRectOptions): FloatingPanelRectControls {
  const [rect, setRect] = useState<FloatingPanelRect>(() => readFloatingPanelRect(readInset()));
  const latest = useRef(rect);

  const update = (change: Partial<FloatingPanelRect>): void => {
    latest.current = { ...latest.current, ...change };
    setRect(latest.current);
  };
  const replace = (next: FloatingPanelRect): void => {
    latest.current = next;
    setRect(next);
  };

  // Rotating a phone or resizing the window must not strand the window outside the viewport.
  useEffect(() => {
    if (!isFloating || isMaximized) {
      return undefined;
    }
    const keepInViewport = (): void =>
      replace(isCompact ? defaultFloatingPanelRect(readInset()) : clampFloatingPanelRect(latest.current, readInset()));
    keepInViewport();
    window.addEventListener('resize', keepInViewport);
    return () => window.removeEventListener('resize', keepInViewport);
  }, [isFloating, isMaximized, isCompact]);

  return {
    rect,
    update,
    saveCurrent: () => saveFloatingPanelRect(latest.current, readInset()),
    reset: () => {
      replace(defaultFloatingPanelRect(readInset()));
      saveFloatingPanelRect(latest.current, readInset());
    },
    // Leaving floating drops a maximized rect, and opening must not reuse a position from a window
    // that has since been resized.
    refresh: () => replace(isCompact ? defaultFloatingPanelRect(readInset()) : readFloatingPanelRect(readInset())),
  };
}
