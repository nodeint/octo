import { chakra } from '@chakra-ui/react';
import { Separator } from 'react-resizable-panels';

import { useAppShellStyles } from '../theme/use-app-shell-styles';

const StyledSeparator = chakra(Separator);

export function AppResizeHandle(): React.ReactElement {
  const styles = useAppShellStyles();
  return <StyledSeparator css={styles.resizeHandle} />;
}
