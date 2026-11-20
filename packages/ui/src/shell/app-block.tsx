import { Box, type BoxProps } from '@chakra-ui/react';

import { useAppShellStyles } from '../hooks';

/** A shell region that scrolls independently. */
export function AppBlock(props: BoxProps): React.ReactElement {
  const styles = useAppShellStyles();
  return <Box css={styles.block} {...props} />;
}
