import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { LuMoon, LuSun } from 'react-icons/lu';

export function ColorModeButton(): React.ReactElement {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        variant="ghost"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
      >
        {isDark ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  );
}
