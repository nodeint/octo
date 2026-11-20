import { FloatingPanel, IconButton, Portal, useFloatingPanel } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LuMessageCircle } from 'react-icons/lu';

import { useAppShellStyles } from '../../hooks';
import { messages } from '../../messages';
import { AppFloatingPanelHeader } from './floating-panel/app-floating-panel-header';
import { useFloatingPanelRect } from './floating-panel/use-floating-panel-rect';
import type { RightSidebarMode } from './use-right-sidebar-mode';

type AppRightSidebarFloatingProps = {
  readonly title: string;
  readonly mode: RightSidebarMode;
  /** Compact screens pin the window in place: no dragging, resizing, maximizing, or docking. */
  readonly isCompact: boolean;
  readonly onModeChange: (mode: RightSidebarMode) => void;
  readonly children: React.ReactNode;
};

/** The launcher button while closed and a draggable, resizable window while floating; nothing when docked. */
export function AppRightSidebarFloating({
  title,
  mode,
  isCompact,
  onModeChange,
  children,
}: AppRightSidebarFloatingProps): React.ReactElement {
  const styles = useAppShellStyles();
  const [isMaximized, setIsMaximized] = useState(false);
  const { rect, update, saveCurrent, reset, refresh } = useFloatingPanelRect({
    isFloating: mode === 'floating',
    isMaximized,
    isCompact,
  });
  // Declared before the panel so its callbacks can use it; the panel only calls it later, from events.
  function changeMode(next: RightSidebarMode): void {
    refresh();
    onModeChange(next);
  }
  const panel = useFloatingPanel({
    open: mode === 'floating',
    onOpenChange: (details) => changeMode(details.open ? 'floating' : 'closed'),
    strategy: 'fixed',
    persistRect: true,
    draggable: !isCompact,
    // Stays on even when pinned: Zag ignores maximize and restore while resizable is false. Without
    // resize handles (below) the window still cannot be resized by hand.
    resizable: true,
    onStageChange: ({ stage }) => setIsMaximized(stage === 'maximized'),
    position: { x: rect.x, y: rect.y },
    size: { width: rect.width, height: rect.height },
    minSize: { width: 280, height: 240 },
    onPositionChange: ({ position }) => update(position),
    onSizeChange: ({ size }) => update(size),
    onPositionChangeEnd: saveCurrent,
    onSizeChangeEnd: saveCurrent,
  });

  // Closing while maximized leaves the stage maximized, and the machine ignores a restore once closed,
  // so every opening starts from the normal stage.
  useEffect(() => {
    if (mode === 'floating') {
      panel.restore();
    }
  }, [mode]);

  return (
    <>
      {mode === 'closed' && (
        <IconButton
          aria-label={messages.rightSidebar.open(title)}
          size="lg"
          css={styles.launcher}
          onClick={() => changeMode('floating')}
        >
          <LuMessageCircle />
        </IconButton>
      )}
      <FloatingPanel.RootProvider value={panel} lazyMount unmountOnExit>
        <Portal>
          <FloatingPanel.Positioner>
            <FloatingPanel.Content>
              <AppFloatingPanelHeader
                title={title}
                isMaximized={isMaximized}
                isCompact={isCompact}
                onDock={() => changeMode('docked')}
                onReset={reset}
              />
              <FloatingPanel.Body>{children}</FloatingPanel.Body>
              {!isCompact && <FloatingPanel.ResizeTriggers />}
            </FloatingPanel.Content>
          </FloatingPanel.Positioner>
        </Portal>
      </FloatingPanel.RootProvider>
    </>
  );
}
