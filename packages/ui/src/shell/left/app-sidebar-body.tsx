import { Box } from '@chakra-ui/react';

import { useAppShellStyles } from '../../hooks';
import { messages } from '../../messages';
import type { AppActivity } from './app-activity';

type AppSidebarBodyProps = {
  readonly activities: readonly AppActivity[];
  readonly activeId: string | null;
};

/** Every activity stays mounted and only the selected one is shown, so views keep their scroll and open state. */
export function AppSidebarBody({ activities, activeId }: AppSidebarBodyProps): React.ReactElement {
  const styles = useAppShellStyles();
  return (
    <Box as="aside" aria-label={messages.layout.leftSidebar} css={styles.sidebarBody}>
      {activities.map((activity) => (
        <Box key={activity.id} role="tabpanel" aria-label={activity.title} hidden={activity.id !== activeId} h="full">
          {activity.content}
        </Box>
      ))}
    </Box>
  );
}
