import { FloatingPanel, IconButton, Menu, Portal } from '@chakra-ui/react';
import { LuEllipsis, LuMaximize2, LuMinimize2, LuPanelRight, LuRotateCcw, LuX } from 'react-icons/lu';

import { messages } from '../messages';

type AppFloatingPanelHeaderProps = {
  readonly title: string;
  readonly isMaximized: boolean;
  readonly onDock: () => void;
  readonly onReset: () => void;
};

/** Title plus a "more" menu for the rare actions; closing stays one click away. */
export function AppFloatingPanelHeader({
  title,
  isMaximized,
  onDock,
  onReset,
}: AppFloatingPanelHeaderProps): React.ReactElement {
  return (
    <FloatingPanel.Header>
      <FloatingPanel.DragTrigger>
        <FloatingPanel.Title>{title}</FloatingPanel.Title>
      </FloatingPanel.DragTrigger>
      <FloatingPanel.Control>
        <FloatingPanel.Context>
          {(panel) => (
            <Menu.Root positioning={{ placement: 'bottom-end' }}>
              <Menu.Trigger asChild>
                <IconButton aria-label={messages.floatingPanel.moreActions} size="xs" variant="ghost">
                  <LuEllipsis />
                </IconButton>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      value="reset"
                      onSelect={() => {
                        // Leave the maximized stage first, or the reset rect would not show.
                        panel.restore();
                        onReset();
                      }}
                    >
                      <LuRotateCcw /> {messages.floatingPanel.resetRect}
                    </Menu.Item>
                    <Menu.Item value="dock" onSelect={onDock}>
                      <LuPanelRight /> {messages.floatingPanel.dock}
                    </Menu.Item>
                    <Menu.Item value="stage" onSelect={isMaximized ? panel.restore : panel.maximize}>
                      {isMaximized ? <LuMinimize2 /> : <LuMaximize2 />}{' '}
                      {isMaximized ? messages.floatingPanel.restore : messages.floatingPanel.maximize}
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )}
        </FloatingPanel.Context>
        <FloatingPanel.CloseTrigger asChild>
          <IconButton aria-label={messages.rightSidebar.close(title)} size="xs" variant="ghost">
            <LuX />
          </IconButton>
        </FloatingPanel.CloseTrigger>
      </FloatingPanel.Control>
    </FloatingPanel.Header>
  );
}
