import { Box, Flex } from '@chakra-ui/react';

import { useAppShellStyles } from '../../hooks';
import { messages } from '../../messages';
import { AppActivityBar } from './app-activity-bar';

type AppLeftSidebarProps = {
  readonly activityBar?: React.ReactNode;
  readonly children?: React.ReactNode;
};

/** The activity bar and the sidebar panel side by side; shared by the docked block and the compact drawer. */
export function AppLeftSidebar({ activityBar, children }: AppLeftSidebarProps): React.ReactElement {
  const styles = useAppShellStyles();
  return (
    <Flex h="full">
      <AppActivityBar>{activityBar}</AppActivityBar>
      <Box as="aside" aria-label={messages.layout.leftSidebar} css={styles.sidebarBody}>
        {children}
      </Box>
    </Flex>
  );
}
