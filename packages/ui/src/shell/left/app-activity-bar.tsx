import { Box } from '@chakra-ui/react';

import { useAppShellStyles } from '../../hooks';
import { messages } from '../../messages';


type AppActivityBarProps = {
  readonly children?: React.ReactNode;
};

/** Lives inside the left block, so it has no border or radius of its own; only its color sets it apart. */
export function AppActivityBar({ children }: AppActivityBarProps): React.ReactElement {
  const styles = useAppShellStyles();
  return (
    <Box as="nav" aria-label={messages.layout.activityBar} css={styles.activityBar}>
      {children}
    </Box>
  );
}
