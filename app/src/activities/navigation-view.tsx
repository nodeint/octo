import { Link, Stack } from '@chakra-ui/react';
import { SidebarView } from '@workspace/ui';
import { NavLink } from 'react-router';

export function NavigationView(): React.ReactElement {
  return (
    <SidebarView title="Navigation">
      <Stack as="nav" aria-label="Main" gap="1" p="2">
        <Link asChild px="3" py="2" borderRadius="md" _hover={{ bg: 'bg.muted' }}>
          <NavLink to="/" end>
            Home
          </NavLink>
        </Link>
      </Stack>
    </SidebarView>
  );
}
