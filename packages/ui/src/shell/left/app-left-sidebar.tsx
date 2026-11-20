import { Flex } from '@chakra-ui/react';

import type { AppActivity } from './app-activity';
import { AppActivityBar } from './app-activity-bar';
import { AppSidebarBody } from './app-sidebar-body';

type AppLeftSidebarProps = {
  readonly activities: readonly AppActivity[];
};

/** The activity bar and the sidebar body side by side, for the compact drawer where they share one surface. */
export function AppLeftSidebar({ activities }: AppLeftSidebarProps): React.ReactElement {
  return (
    <Flex h="full">
      <AppActivityBar activities={activities} />
      <AppSidebarBody activities={activities} />
    </Flex>
  );
}
