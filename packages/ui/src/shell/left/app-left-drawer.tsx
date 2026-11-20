import { CloseButton, Drawer, Portal } from '@chakra-ui/react';

import { messages } from '../../messages';

type AppLeftDrawerProps = {
  readonly title: string;
  readonly isOpen: boolean;
  readonly onOpenChange: (isOpen: boolean) => void;
  readonly children: React.ReactNode;
};

/** The left sidebar on compact screens. The shell stays routing-agnostic, so a click on any link closes it. */
export function AppLeftDrawer({ title, isOpen, onOpenChange, children }: AppLeftDrawerProps): React.ReactElement {
  return (
    <Drawer.Root placement="start" open={isOpen} onOpenChange={(details) => onOpenChange(details.open)}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{title}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body
              onClick={(event) => {
                if (event.target instanceof Element && event.target.closest('a[href]')) {
                  onOpenChange(false);
                }
              }}
            >
              {children}
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" aria-label={messages.layout.closeNavigation} />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
