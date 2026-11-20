import { Box, Flex } from '@chakra-ui/react';
import { useSyncExternalStore } from 'react';
import { Group, Panel, useDefaultLayout } from 'react-resizable-panels';

import { APP_LAYOUT_STORAGE_ID } from '../constants';
import { messages } from '../messages';
import { useAppShellStyles } from '../theme/use-app-shell-styles';
import { AppActivityBar } from './app-activity-bar';
import { AppBlock } from './app-block';
import { AppHeader } from './app-header';
import { AppResizeHandle } from './app-resize-handle';
import { AppRightSidebarDocked } from './app-right-sidebar-docked';
import { AppRightSidebarFloating } from './app-right-sidebar-floating';
import { layoutStorage } from './layout-storage';
import { useRightSidebarMode } from './use-right-sidebar-mode';

export type AppShellProps = {
  readonly title: string;
  readonly activityBar?: React.ReactNode;
  readonly leftSidebar?: React.ReactNode;
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
  // Saved sizes and the sidebar mode only exist in the browser; rendering the body on the server
  // would hydrate with different values and React would keep the server's inline styles.
  const isClient = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );

  return (
    <Box css={styles.root}>
      <AppHeader title={title} />
      <Box css={styles.content}>
        <Box css={styles.workspace}>{isClient && <AppShellBody {...bodyProps} />}</Box>
      </Box>
    </Box>
  );
}

function AppShellBody({
  activityBar,
  leftSidebar,
  rightSidebar,
  rightSidebarTitle = messages.rightSidebar.defaultTitle,
  children,
}: Omit<AppShellProps, 'title'>): React.ReactElement {
  const styles = useAppShellStyles();
  const [rightMode, setRightMode] = useRightSidebarMode();
  const isRightDocked = rightMode === 'docked';
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: APP_LAYOUT_STORAGE_ID,
    // Each panel set saves its own layout, so docking the right sidebar never corrupts the other one.
    panelIds: isRightDocked ? ['left-sidebar', 'main', 'right-sidebar'] : ['left-sidebar', 'main'],
    storage: layoutStorage,
  });

  return (
    <>
      <Group orientation="horizontal" defaultLayout={defaultLayout} onLayoutChanged={onLayoutChanged}>
        <Panel id="left-sidebar" defaultSize="300px" minSize="200px" groupResizeBehavior="preserve-pixel-size">
          <AppBlock overflow="hidden">
            <Flex h="full">
              <AppActivityBar>{activityBar}</AppActivityBar>
              <Box as="aside" aria-label={messages.layout.leftSidebar} css={styles.sidebarBody}>
                {leftSidebar}
              </Box>
            </Flex>
          </AppBlock>
        </Panel>
        <AppResizeHandle />
        <Panel id="main" minSize="240px">
          <AppBlock as="main" p="6">
            {children}
          </AppBlock>
        </Panel>
        {isRightDocked && <AppResizeHandle />}
        {isRightDocked && (
          <Panel id="right-sidebar" defaultSize="320px" minSize="200px" groupResizeBehavior="preserve-pixel-size">
            <AppBlock overflow="hidden">
              <AppRightSidebarDocked title={rightSidebarTitle} onModeChange={setRightMode}>
                {rightSidebar}
              </AppRightSidebarDocked>
            </AppBlock>
          </Panel>
        )}
      </Group>
      <AppRightSidebarFloating title={rightSidebarTitle} mode={rightMode} onModeChange={setRightMode}>
        {rightSidebar}
      </AppRightSidebarFloating>
    </>
  );
}
