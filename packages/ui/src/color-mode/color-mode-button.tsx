import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { LuMoon, LuSun } from 'react-icons/lu';

import { getCenter, startColorModeTransition } from './start-color-mode-transition';

export function ColorModeButton(): React.ReactElement {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    // Use the button centre so keyboard activation (clientX/Y = 0) still animates from the button.
    const origin = getCenter(event.currentTarget);
    void startColorModeTransition(origin, () => setTheme(isDark ? 'light' : 'dark'));
  };

  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        variant="ghost"
        onClick={handleClick}
      >
        {isDark ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  );
}
