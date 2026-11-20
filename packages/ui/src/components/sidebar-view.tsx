import { Box, Flex, Heading, HStack } from '@chakra-ui/react';

import { useAppShellStyles } from '../hooks';

type SidebarViewProps = {
  readonly title: string;
  /** Icon buttons shown on the right of the title bar. */
  readonly actions?: React.ReactNode;
  readonly children: React.ReactNode;
};

/** The content of one activity: a title bar with actions above a scrolling body. */
export function SidebarView({ title, actions, children }: SidebarViewProps): React.ReactElement {
  const styles = useAppShellStyles();
  return (
    <Flex direction="column" css={styles.sidebarView}>
      <HStack css={styles.sidebarHeader}>
        <Heading as="h2" css={styles.sidebarTitle}>
          {title}
        </Heading>
        {actions}
      </HStack>
      <Box css={styles.sidebarViewBody}>{children}</Box>
    </Flex>
  );
}
