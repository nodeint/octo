import { Stack, Switch } from '@chakra-ui/react';
import { SidebarView } from '@workspace/ui';

export function SettingsView(): React.ReactElement {
  return (
    <SidebarView title="Settings">
      <Stack p="3" gap="3">
        <Switch.Root size="sm">
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Word wrap</Switch.Label>
        </Switch.Root>
        <Switch.Root size="sm" defaultChecked>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Auto save</Switch.Label>
        </Switch.Root>
      </Stack>
    </SidebarView>
  );
}
