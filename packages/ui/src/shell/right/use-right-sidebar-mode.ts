import { useCallback, useState } from 'react';

import { appStorage } from '../../utils';

const MODE_STORAGE_ID = 'octo:app-shell-right-sidebar-mode';

export type RightSidebarMode = 'closed' | 'docked' | 'floating';

function isRightSidebarMode(value: string | null): value is RightSidebarMode {
  return value === 'closed' || value === 'docked' || value === 'floating';
}

function readMode(): RightSidebarMode {
  const stored = appStorage.getItem(MODE_STORAGE_ID);
  return isRightSidebarMode(stored) ? stored : 'closed';
}

/** Browser only: the initial value reads `localStorage`, so call it where the server never renders. */
export function useRightSidebarMode(): readonly [RightSidebarMode, (mode: RightSidebarMode) => void] {
  const [mode, setModeState] = useState<RightSidebarMode>(readMode);

  const setMode = useCallback((next: RightSidebarMode) => {
    setModeState(next);
    appStorage.setItem(MODE_STORAGE_ID, next);
  }, []);

  return [mode, setMode];
}
