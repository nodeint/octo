import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useState, useSyncExternalStore } from 'react';

import { Panel } from '../components';
import { useAppShellStyles } from '../hooks';
import { messages } from '../messages';
import { AppHeader } from './app-header';
import type { AppActivity } from './left';
import { resolveActivityId } from './left/activity-selection';
import { AppActivityBar } from './left/app-activity-bar';
import { AppActivityProvider } from './left/app-activity-provider';
import { AppLeftDrawer } from './left/app-left-drawer';
import { AppLeftSidebar } from './left/app-left-sidebar';
import { AppSidebarBody } from './left/app-sidebar-body';
import { useActivitySelection } from './left/use-activity-selection';
import { AppRightSidebarDocked } from './right/app-right-sidebar-docked';
import { AppRightSidebarFloating } from './right/app-right-sidebar-floating';
import { useRightSidebarMode } from './right/use-right-sidebar-mode';
import { AppResizeHandle } from './workspace/app-resize-handle';
import { AppWorkspace } from './workspace/app-workspace';

export type AppShellProps = {
  readonly title: string;
  /** VS Code style activities: icons in the activity bar, each opening its content in the left sidebar. */
  readonly activities?: readonly AppActivity[];
  readonly rightSidebar?: React.ReactNode;
  /** Names the right sidebar in its toolbar, window title, and launcher button. */
  readonly rightSidebarTitle?: string;
  readonly children: React.ReactNode;
};

function subscribeNever(): () => void {
  return () => undefined;
}

export function AppShell({ title, ...bodyProps }: AppShellProps): React.ReactElement {
  const styles = useAppShellStyles();
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  // Saved sizes and the sidebar mode only exist in the browser; rendering the body on the server
  // would hydrate with different values and React would keep the server's inline styles.
  const isClient = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );

  return (
    <Flex direction="column" css={styles.root}>
      <AppHeader title={title} onOpenNavigation={() => setIsNavigationOpen(true)} />
      <Box css={styles.content}>
        <Box css={styles.workspace}>
          {isClient && (
            <AppShellBody
              title={title}
              isNavigationOpen={isNavigationOpen}
              onNavigationOpenChange={setIsNavigationOpen}
              {...bodyProps}
            />
          )}
        </Box>
      </Box>
    </Flex>
  );
}

type AppShellBodyProps = AppShellProps & {
  readonly isNavigationOpen: boolean;
  readonly onNavigationOpenChange: (isOpen: boolean) => void;
};

function AppShellBody({
  title,
  activities = [],
  rightSidebar,
  rightSidebarTitle = messages.rightSidebar.defaultTitle,
  children,
  isNavigationOpen,
  onNavigationOpenChange,
}: AppShellBodyProps): React.ReactElement {
  const styles = useAppShellStyles();
  const isCompact = useBreakpointValue({ base: true, md: false }, { ssr: false }) ?? false;
  const [storedMode, setRightMode] = useRightSidebarMode();
  const { activeId, select } = useActivitySelection(
    activities.map((activity) => activity.id),
    { isShortcutEnabled: !isCompact },
  );
  // The drawer has no collapsed state: it opens on the last chosen activity, or the first.
  const drawerActiveId = activeId ?? resolveActivityId(undefined, activities.map((activity) => activity.id));
  // A docked panel needs width a compact screen does not have, so it shows as the launcher instead.
  const rightMode = isCompact && storedMode === 'docked' ? 'closed' : storedMode;

  useEffect(() => {
    if (!isCompact) {
      onNavigationOpenChange(false);
    }
  }, [isCompact, onNavigationOpenChange]);

  const main = (
    // Leave room under the content so the launcher button never covers its last line.
    <Panel.Root as="main">
      <Panel.Body p="layout.space.xl" pb={rightMode === 'closed' ? 'appShell.launcherClearance' : undefined}>
        {children}
      </Panel.Body>
    </Panel.Root>
  );

  return (
    <AppActivityProvider activeId={isCompact ? drawerActiveId : activeId} onSelect={select} canCollapse={!isCompact}>
      <Flex direction="column" css={styles.workspace}>
        {isCompact ? (
          <>
            <Box h="full">{main}</Box>
            <AppLeftDrawer title={title} isOpen={isNavigationOpen} onOpenChange={onNavigationOpenChange}>
              <AppLeftSidebar activities={activities} />
            </AppLeftDrawer>
          </>
        ) : (
          <Flex h="full" gap="appShell.gutter">
            {activities.length > 0 && (
              <Panel.Root>
                <AppActivityBar activities={activities} />
              </Panel.Root>
            )}
            <AppWorkspace
              hasLeftSidebar={activeId !== null}
              hasRightSidebar={rightMode === 'docked'}
              renderHandle={(id) => <AppResizeHandle id={id} />}
              renderLeft={() => (
                <Panel.Root>
                  <AppSidebarBody activities={activities} />
                </Panel.Root>
              )}
              renderMain={() => main}
              renderRight={() => (
                <AppRightSidebarDocked title={rightSidebarTitle} onModeChange={setRightMode}>
                  {rightSidebar}
                </AppRightSidebarDocked>
              )}
            />
          </Flex>
        )}
        <AppRightSidebarFloating
          title={rightSidebarTitle}
          mode={rightMode}
          isCompact={isCompact}
          onModeChange={setRightMode}
        >
          {rightSidebar}
        </AppRightSidebarFloating>
      </Flex>
    </AppActivityProvider>
  );
}
