import { Box, Portal, Tabs, Tooltip } from '@chakra-ui/react';
import { useRef } from 'react';

import { useAppShellStyles } from '../../hooks';
import { messages } from '../../messages';
import type { AppActivity } from './app-activity';

type AppActivityBarProps = {
  readonly activities: readonly AppActivity[];
  /** `null` while the sidebar is collapsed: no icon looks selected. */
  readonly activeId: string | null;
  readonly onSelect: (id: string | null) => void;
  /** A second click on the selected icon collapses the sidebar; the drawer has nothing to collapse to. */
  readonly canCollapse: boolean;
};

function formatBadge(count: number): string {
  const maxShown = 99;
  return count > maxShown ? messages.layout.badgeOverflow : String(count);
}

/** Lives in its own narrow block; the selected icon is marked by a bar on its left edge, like VS Code. */
export function AppActivityBar({
  activities,
  activeId,
  onSelect,
  canCollapse,
}: AppActivityBarProps): React.ReactElement {
  const styles = useAppShellStyles();
  const isCollapsingRef = useRef(false);
  const topActivities = activities.filter((activity) => activity.placement !== 'bottom');
  const bottomActivities = activities.filter((activity) => activity.placement === 'bottom');

  const renderActivity = (activity: AppActivity): React.ReactElement => {
    const badge = activity.badge ?? 0;
    return (
      <Tooltip.Root key={activity.id} positioning={{ placement: 'right' }} openDelay={300} closeOnClick>
        <Tooltip.Trigger asChild>
          <Tabs.Trigger
            value={activity.id}
            unstyled
            css={styles.activityItem}
            aria-label={badge > 0 ? messages.layout.activityWithBadge(activity.title, badge) : activity.title}
            onClick={() => {
              if (canCollapse && activity.id === activeId) {
                isCollapsingRef.current = true;
                onSelect(null);
              }
            }}
          >
            {activity.icon}
            {badge > 0 && (
              <Box as="span" aria-hidden css={styles.activityBadge}>
                {formatBadge(badge)}
              </Box>
            )}
          </Tabs.Trigger>
        </Tooltip.Trigger>
        <Portal>
          <Tooltip.Positioner>
            <Tooltip.Content>{activity.title}</Tooltip.Content>
          </Tooltip.Positioner>
        </Portal>
      </Tooltip.Root>
    );
  };

  return (
    <Tabs.Root
      unstyled
      orientation="vertical"
      value={activeId ?? ''}
      onValueChange={(details) => {
        // The click that collapses the sidebar also reports the clicked tab as the new value; ignore that echo.
        if (isCollapsingRef.current) {
          isCollapsingRef.current = false;
          return;
        }
        onSelect(details.value);
      }}
      aria-label={messages.layout.activityBar}
      css={styles.activityBar}
    >
      <Tabs.List unstyled css={styles.activityGroup}>
        {topActivities.map(renderActivity)}
      </Tabs.List>
      <Tabs.List unstyled css={styles.activityGroup}>
        {bottomActivities.map(renderActivity)}
      </Tabs.List>
    </Tabs.Root>
  );
}
