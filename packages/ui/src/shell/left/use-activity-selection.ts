import { useCallback, useEffect, useRef, useState } from 'react';

import { appStorage } from '../../utils';
import { parseActivityId, resolveActivityId, toggleSidebar } from './activity-selection';

const SELECTION_STORAGE_ID = 'octo:app-shell-activity';

type ActivitySelection = {
  /** `null` while the sidebar is collapsed to the activity bar. */
  readonly activeId: string | null;
  readonly select: (id: string | null) => void;
};

type ActivitySelectionOptions = {
  /** Ctrl or Cmd + B collapses and reopens the sidebar, like VS Code. */
  readonly isShortcutEnabled: boolean;
};

/** Browser only: the initial value reads `localStorage`, so call it where the server never renders. */
export function useActivitySelection(
  ids: readonly string[],
  { isShortcutEnabled }: ActivitySelectionOptions,
): ActivitySelection {
  const [stored, setStored] = useState(() => parseActivityId(appStorage.getItem(SELECTION_STORAGE_ID)));
  const activeId = resolveActivityId(stored, ids);
  const lastActiveIdRef = useRef(activeId);

  if (activeId !== null) {
    lastActiveIdRef.current = activeId;
  }

  const select = useCallback((id: string | null) => {
    setStored(id);
    appStorage.setItem(SELECTION_STORAGE_ID, JSON.stringify(id));
  }, []);

  const idsKey = ids.join('\n');
  useEffect(() => {
    if (!isShortcutEnabled) {
      return undefined;
    }
    const currentIds = idsKey === '' ? [] : idsKey.split('\n');
    const onKeyDown = (event: KeyboardEvent): void => {
      const isShortcut = (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey && event.key === 'b';
      if (!isShortcut) {
        return;
      }
      event.preventDefault();
      select(toggleSidebar(resolveActivityId(stored, currentIds), lastActiveIdRef.current, currentIds));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isShortcutEnabled, idsKey, select, stored]);

  return { activeId, select };
}
