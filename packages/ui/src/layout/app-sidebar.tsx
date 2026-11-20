import { Box, CloseButton, Drawer, Portal } from '@chakra-ui/react';

import { APP_HEADER_HEIGHT, APP_SIDEBAR_WIDTH } from '../constants';

type AppSidebarProps = {
  readonly title: string;
  readonly isOpen: boolean;
  readonly onOpenChange: (isOpen: boolean) => void;
  readonly renderNavigation: (onNavigate?: () => void) => React.ReactNode;
};

export function AppSidebar({
  title,
  isOpen,
  onOpenChange,
  renderNavigation,
}: AppSidebarProps): React.ReactElement {
  return (
    <>
      <Box
        position="fixed"
        top={APP_HEADER_HEIGHT}
        bottom="0"
        left="0"
        w={APP_SIDEBAR_WIDTH}
        p="3"
        overflowY="auto"
        bg="bg"
        borderRightWidth="1px"
        display={{ base: 'none', md: 'block' }}
      >
        {renderNavigation()}
      </Box>
      <Drawer.Root
        placement="start"
        open={isOpen}
        onOpenChange={(event) => onOpenChange(event.open)}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>{title}</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>{renderNavigation(() => onOpenChange(false))}</Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
}
