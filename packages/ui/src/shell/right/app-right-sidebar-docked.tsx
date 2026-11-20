import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { LuPictureInPicture2, LuX } from 'react-icons/lu';

import { useAppShellStyles } from '../../hooks';
import { messages } from '../../messages';
import type { RightSidebarMode } from './use-right-sidebar-mode';

type AppRightSidebarDockedProps = {
  readonly title: string;
  readonly onModeChange: (mode: RightSidebarMode) => void;
  readonly children: React.ReactNode;
};

/** The docked placement: a toolbar to float or close the sidebar, above its content. */
export function AppRightSidebarDocked({
  title,
  onModeChange,
  children,
}: AppRightSidebarDockedProps): React.ReactElement {
  const styles = useAppShellStyles();
  return (
    <Flex as="aside" aria-label={title} direction="column" h="full">
      <Box css={styles.toolbar}>
        <Text css={styles.toolbarTitle}>{title}</Text>
        <IconButton aria-label={messages.rightSidebar.popOut(title)} size="xs" variant="ghost" onClick={() => onModeChange('floating')}>
          <LuPictureInPicture2 />
        </IconButton>
        <IconButton aria-label={messages.rightSidebar.close(title)} size="xs" variant="ghost" onClick={() => onModeChange('closed')}>
          <LuX />
        </IconButton>
      </Box>
      <Box css={styles.sidebarBody}>{children}</Box>
    </Flex>
  );
}
