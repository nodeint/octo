import { useCallback, useState } from 'react';

import { APP_RIGHT_SIDEBAR_MODE_STORAGE_ID } from '../constants';
import { layoutStorage } from './layout-storage';

export type RightSidebarMode = 'closed' | 'docked' | 'floating';

function isRightSidebarMode(value: string | null): value is RightSidebarMode {
  return value === 'closed' || value === 'docked' || value === 'floating';
}

function readMode(): RightSidebarMode {
  const stored = layoutStorage.getItem(APP_RIGHT_SIDEBAR_MODE_STORAGE_ID);
  return isRightSidebarMode(stored) ? stored : 'closed';
}

/** Browser only: the initial value reads `localStorage`, so call it where the server never renders. */
export function useRightSidebarMode(): readonly [RightSidebarMode, (mode: RightSidebarMode) => void] {
  const [mode, setModeState] = useState<RightSidebarMode>(readMode);

  const setMode = useCallback((next: RightSidebarMode) => {
    setModeState(next);
    layoutStorage.setItem(APP_RIGHT_SIDEBAR_MODE_STORAGE_ID, next);
  }, []);

  return [mode, setMode];
}
