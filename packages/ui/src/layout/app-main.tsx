import { Box } from '@chakra-ui/react';

import { APP_HEADER_HEIGHT, APP_SIDEBAR_WIDTH } from '../constants';

type AppMainProps = {
  readonly children: React.ReactNode;
};

export function AppMain({ children }: AppMainProps): React.ReactElement {
  return (
    <Box
      as="main"
      pt={APP_HEADER_HEIGHT}
      pl={{ base: '0', md: APP_SIDEBAR_WIDTH }}
      minH="100vh"
    >
      <Box p={{ base: '4', md: '6' }}>{children}</Box>
    </Box>
  );
}
