import { EmptyState, Input, Stack } from '@chakra-ui/react';
import { SidebarView } from '@workspace/ui';
import { LuSearch } from 'react-icons/lu';

export function SearchView(): React.ReactElement {
  return (
    <SidebarView title="Search">
      <Stack p="3" gap="4">
        <Input size="sm" placeholder="Search" aria-label="Search" />
        <EmptyState.Root size="sm">
          <EmptyState.Content>
            <EmptyState.Indicator>
              <LuSearch />
            </EmptyState.Indicator>
            <EmptyState.Title>No results</EmptyState.Title>
            <EmptyState.Description>Type to search the workspace</EmptyState.Description>
          </EmptyState.Content>
        </EmptyState.Root>
      </Stack>
    </SidebarView>
  );
}
