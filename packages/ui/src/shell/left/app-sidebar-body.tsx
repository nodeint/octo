import { Box, Tabs } from '@chakra-ui/react';

import { useAppShellStyles } from '../../hooks';
import { messages } from '../../messages';
import type { AppActivity } from './app-activity';

type AppSidebarBodyProps = {
  readonly activities: readonly AppActivity[];
};

/** Every activity stays mounted and only the selected one is shown, so views keep their scroll and open state. */
export function AppSidebarBody({ activities }: AppSidebarBodyProps): React.ReactElement {
  const styles = useAppShellStyles();
  return (
    <Box as="aside" aria-label={messages.layout.leftSidebar} css={styles.sidebarBody}>
      {activities.map((activity) => (
        <Tabs.Content key={activity.id} value={activity.id} h="full">
          {activity.content}
        </Tabs.Content>
      ))}
    </Box>
  );
}
