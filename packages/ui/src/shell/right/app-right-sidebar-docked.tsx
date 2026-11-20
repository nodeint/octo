import { IconButton } from '@chakra-ui/react';
import { LuPictureInPicture2, LuX } from 'react-icons/lu';

import { Panel } from '../../components';
import { messages } from '../../messages';
import type { RightSidebarMode } from './use-right-sidebar-mode';

type AppRightSidebarDockedProps = {
  readonly title: string;
  readonly onModeChange: (mode: RightSidebarMode) => void;
  readonly children: React.ReactNode;
};

/** The docked placement: a toolbar to float or close the sidebar, above its content. */
export function AppRightSidebarDocked({
  title,
  onModeChange,
  children,
}: AppRightSidebarDockedProps): React.ReactElement {
  return (
    <Panel.Root as="aside" aria-label={title}>
      <Panel.Header>
        <Panel.Title>{title}</Panel.Title>
        <Panel.Actions>
          <IconButton aria-label={messages.rightSidebar.popOut(title)} size="xs" variant="ghost" onClick={() => onModeChange('floating')}>
            <LuPictureInPicture2 />
          </IconButton>
          <IconButton aria-label={messages.rightSidebar.close(title)} size="xs" variant="ghost" onClick={() => onModeChange('closed')}>
            <LuX />
          </IconButton>
        </Panel.Actions>
      </Panel.Header>
      <Panel.Body p="layout.space.none">{children}</Panel.Body>
    </Panel.Root>
  );
}
