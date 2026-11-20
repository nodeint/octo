import { Box, IconButton, Spacer, Text } from '@chakra-ui/react';
import { LuMenu } from 'react-icons/lu';

import { ColorModeButton } from '../components';
import { useAppShellStyles } from '../hooks';
import { messages } from '../messages';

type AppHeaderProps = {
  readonly title: string;
  /** Shown only on compact screens, where the left sidebar lives in a drawer. */
  readonly onOpenNavigation: () => void;
};

export function AppHeader({ title, onOpenNavigation }: AppHeaderProps): React.ReactElement {
  const styles = useAppShellStyles();
  return (
    <Box as="header" css={styles.header}>
      <IconButton
        aria-label={messages.layout.openNavigation}
        variant="ghost"
        css={styles.menuButton}
        onClick={onOpenNavigation}
      >
        <LuMenu />
      </IconButton>
      <Text fontWeight="semibold">{title}</Text>
      <Spacer />
      <ColorModeButton />
    </Box>
  );
}
