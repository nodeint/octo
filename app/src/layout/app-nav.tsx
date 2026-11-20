import { Link, Stack } from '@chakra-ui/react';
import { NavLink } from 'react-router';

export function AppNav(): React.ReactElement {
  return (
    <Stack as="nav" aria-label="Main" gap="1">
      <Link asChild px="3" py="2" borderRadius="md" _hover={{ bg: 'bg.muted' }}>
        <NavLink to="/" end>
          Home
        </NavLink>
      </Link>
    </Stack>
  );
}
