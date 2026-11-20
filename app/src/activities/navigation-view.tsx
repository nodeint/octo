import { Link, Stack } from '@chakra-ui/react';
import { SidebarView } from '@workspace/ui';
import { NavLink } from 'react-router';

export function NavigationView(): React.ReactElement {
  return (
    <SidebarView title="Navigation">
      <Stack as="nav" aria-label="Main" gap="layout.gap.2xs" p="layout.space.sm">
        <Link asChild>
          <NavLink to="/" end>
            Home
          </NavLink>
        </Link>
      </Stack>
    </SidebarView>
  );
}
