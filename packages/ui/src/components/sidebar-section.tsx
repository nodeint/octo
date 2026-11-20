import { Button, Center, Collapsible, HStack } from '@chakra-ui/react';
import { LuChevronRight } from 'react-icons/lu';

import { useAppShellStyles } from '../hooks';
import { messages } from '../messages';

type SidebarSectionProps = {
  readonly title: string;
  readonly defaultOpen?: boolean;
  /** Icon buttons shown on the right of the section header. */
  readonly actions?: React.ReactNode;
  readonly children: React.ReactNode;
};

/** A collapsible group inside a sidebar view, like Outline or Timeline under the VS Code explorer. */
export function SidebarSection({
  title,
  defaultOpen = true,
  actions,
  children,
}: SidebarSectionProps): React.ReactElement {
  const styles = useAppShellStyles();
  return (
    <Collapsible.Root defaultOpen={defaultOpen}>
      <HStack css={styles.sectionHeader}>
        <Collapsible.Trigger asChild>
          <Button variant="ghost" size="sm" css={styles.sectionTrigger} aria-label={messages.layout.sectionToggle(title)}>
            <Collapsible.Indicator asChild>
              <Center as="span"><LuChevronRight /></Center>
            </Collapsible.Indicator>
            {title}
          </Button>
        </Collapsible.Trigger>
        {actions && <HStack css={styles.sectionActions}>{actions}</HStack>}
      </HStack>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
}
