import { Box, Spacer, Text } from '@chakra-ui/react';

import { ColorModeButton } from '../color-mode';
import { useAppShellStyles } from '../theme/use-app-shell-styles';

type AppHeaderProps = {
  readonly title: string;
};

export function AppHeader({ title }: AppHeaderProps): React.ReactElement {
  const styles = useAppShellStyles();
  return (
    <Box as="header" css={styles.header}>
      <Text fontWeight="semibold">{title}</Text>
      <Spacer />
      <ColorModeButton />
    </Box>
  );
}
