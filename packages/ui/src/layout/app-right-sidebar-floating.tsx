import { FloatingPanel, IconButton, Portal } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { LuMessageCircle } from 'react-icons/lu';

import { messages } from '../messages';
import { useAppShellStyles } from '../theme/use-app-shell-styles';
import { AppFloatingPanelHeader } from './app-floating-panel-header';
import {
  defaultFloatingPanelRect,
  type FloatingPanelRect,
  readFloatingPanelRect,
  saveFloatingPanelRect,
} from './floating-panel-rect';
import type { RightSidebarMode } from './use-right-sidebar-mode';

type AppRightSidebarFloatingProps = {
  readonly title: string;
  readonly mode: RightSidebarMode;
  readonly onModeChange: (mode: RightSidebarMode) => void;
  readonly children: React.ReactNode;
};

/** The launcher button while closed and a draggable, resizable window while floating; nothing when docked. */
export function AppRightSidebarFloating({
  title,
  mode,
  onModeChange,
  children,
}: AppRightSidebarFloatingProps): React.ReactElement {
  const styles = useAppShellStyles();
  // Controlled so the rect survives docking and reopening; the machine alone falls back to a fixed
  // position whenever it mounts already open.
  const [rect, setRect] = useState<FloatingPanelRect>(readFloatingPanelRect);
  const [isMaximized, setIsMaximized] = useState(false);
  const latestRect = useRef(rect);
  const updateRect = (change: Partial<FloatingPanelRect>): void => {
    latestRect.current = { ...latestRect.current, ...change };
    setRect(latestRect.current);
  };
  // Leaving floating while maximized would keep the full-screen rect in state; the saved rect is always
  // the normal one, so reload it whenever the window goes away.
  const resetRect = (): void => {
    latestRect.current = defaultFloatingPanelRect();
    setRect(latestRect.current);
    saveFloatingPanelRect(latestRect.current);
  };
  const changeMode = (next: RightSidebarMode): void => {
    if (next !== 'floating') {
      latestRect.current = readFloatingPanelRect();
      setRect(latestRect.current);
    }
    onModeChange(next);
  };

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
      <FloatingPanel.Root
        open={mode === 'floating'}
        onOpenChange={(details) => changeMode(details.open ? 'floating' : 'closed')}
        strategy="fixed"
        persistRect
        onStageChange={({ stage }) => setIsMaximized(stage === 'maximized')}
        lazyMount
        unmountOnExit
        position={{ x: rect.x, y: rect.y }}
        size={{ width: rect.width, height: rect.height }}
        minSize={{ width: 280, height: 240 }}
        onPositionChange={({ position }) => updateRect(position)}
        onSizeChange={({ size }) => updateRect(size)}
        onPositionChangeEnd={() => saveFloatingPanelRect(latestRect.current)}
        onSizeChangeEnd={() => saveFloatingPanelRect(latestRect.current)}
      >
        <Portal>
          <FloatingPanel.Positioner>
            <FloatingPanel.Content>
              <AppFloatingPanelHeader
                title={title}
                isMaximized={isMaximized}
                onDock={() => changeMode('docked')}
                onReset={resetRect}
              />
              <FloatingPanel.Body>{children}</FloatingPanel.Body>
              <FloatingPanel.ResizeTriggers />
            </FloatingPanel.Content>
          </FloatingPanel.Positioner>
        </Portal>
      </FloatingPanel.Root>
    </>
  );
}
