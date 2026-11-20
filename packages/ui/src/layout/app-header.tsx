import { Flex, IconButton, Spacer, Text } from '@chakra-ui/react';
import { LuMenu } from 'react-icons/lu';

import { ColorModeButton } from '../color-mode';
import { APP_HEADER_HEIGHT } from '../constants';

type AppHeaderProps = {
  readonly title: string;
  readonly onOpenSidebar: () => void;
};

export function AppHeader({ title, onOpenSidebar }: AppHeaderProps): React.ReactElement {
  return (
    <Flex
      as="header"
      position="fixed"
      top="0"
      insetX="0"
      zIndex="sticky"
      h={APP_HEADER_HEIGHT}
      px="4"
      align="center"
      gap="3"
      bg="bg"
      borderBottomWidth="1px"
    >
      <IconButton
        aria-label="Open navigation"
        variant="ghost"
        display={{ base: 'inline-flex', md: 'none' }}
        onClick={onOpenSidebar}
      >
        <LuMenu />
      </IconButton>
      <Text fontWeight="semibold">{title}</Text>
      <Spacer />
      <ColorModeButton />
    </Flex>
  );
}
