import { Box, type BoxProps } from '@chakra-ui/react';

import { useAppShellStyles } from '../hooks';

/** One visually separated card of the shell: rounded, bordered, and scrolling on its own. */
export function AppBlock(props: BoxProps): React.ReactElement {
  const styles = useAppShellStyles();
  return <Box css={styles.block} {...props} />;
}
