import { Flex } from '@chakra-ui/react';

import type { AppActivity } from './app-activity';
import { AppActivityBar } from './app-activity-bar';
import { AppSidebarBody } from './app-sidebar-body';

type AppLeftSidebarProps = {
  readonly activities: readonly AppActivity[];
  readonly activeId: string | null;
  readonly onSelect: (id: string | null) => void;
};

/** The activity bar and the sidebar body side by side, for the compact drawer where they share one surface. */
export function AppLeftSidebar({ activities, activeId, onSelect }: AppLeftSidebarProps): React.ReactElement {
  return (
    <Flex h="full">
      <AppActivityBar activities={activities} activeId={activeId} onSelect={onSelect} canCollapse={false} />
      <AppSidebarBody activities={activities} activeId={activeId} />
    </Flex>
  );
}
