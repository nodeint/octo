import { Link, Stack } from '@chakra-ui/react';
import { NavLink } from 'react-router';

type AppNavProps = {
  readonly onNavigate?: () => void;
};

export function AppNav({ onNavigate }: AppNavProps): React.ReactElement {
  return (
    <Stack as="nav" aria-label="Main" gap="1">
      <Link asChild px="3" py="2" borderRadius="md" _hover={{ bg: 'bg.muted' }}>
        <NavLink to="/" end onClick={onNavigate}>
          Home
        </NavLink>
      </Link>
    </Stack>
  );
}
