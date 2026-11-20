import { Badge, Flex, Float, Portal, Tabs, Tooltip, useTabsContext } from '@chakra-ui/react';

import { useAppShellStyles } from '../../hooks';
import { messages } from '../../messages';
import type { AppActivity } from './app-activity';

type AppActivityBarProps = {
  readonly activities: readonly AppActivity[];
};

function formatBadge(count: number): string {
  const maxShown = 99;
  return count > maxShown ? messages.layout.badgeOverflow : String(count);
}

/** Keeps activities in a narrow column using Chakra's default tab styles. */
export function AppActivityBar({ activities }: AppActivityBarProps): React.ReactElement {
  const styles = useAppShellStyles();
  const tabs = useTabsContext();
  const topActivities = activities.filter((activity) => activity.placement !== 'bottom');
  const bottomActivities = activities.filter((activity) => activity.placement === 'bottom');
  // Chakra removes every tab stop when deselected; keep the collapsed rail keyboard-accessible.
  const focusedId = activities.find((activity) => tabs.getTriggerState({ value: activity.id }).focused)?.id;
  const fallbackId = focusedId ?? topActivities.at(0)?.id ?? bottomActivities.at(0)?.id;

  const renderActivity = (activity: AppActivity): React.ReactElement => {
    const badge = activity.badge ?? 0;
    const triggerProps = tabs.getTriggerProps({ value: activity.id });
    return (
      <Tooltip.Root
        key={activity.id}
        ids={{ trigger: triggerProps.id }}
        positioning={{ placement: 'right' }}
        openDelay={300}
        closeOnClick
      >
        <Tooltip.Trigger asChild>
          <Tabs.Trigger
            value={activity.id}
            tabIndex={tabs.value === null && activity.id === fallbackId ? 0 : triggerProps.tabIndex}
            css={styles.activityItem}
            aria-label={badge > 0 ? messages.layout.activityWithBadge(activity.title, badge) : activity.title}
          >
            {activity.icon}
            {badge > 0 && (
              <Float as="span" placement="top-end" offset="layout.space.xs" css={styles.activityBadge}>
                <Badge aria-hidden>{formatBadge(badge)}</Badge>
              </Float>
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
    <Tabs.List asChild aria-label={messages.layout.activityBar}>
      <Flex direction="column" css={styles.activityBar}>
        <Flex direction="column">{topActivities.map(renderActivity)}</Flex>
        <Flex direction="column">{bottomActivities.map(renderActivity)}</Flex>
      </Flex>
    </Tabs.List>
  );
}
