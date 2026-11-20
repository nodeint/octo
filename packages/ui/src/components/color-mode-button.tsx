import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { flushSync } from 'react-dom';
import { LuMoon, LuSun } from 'react-icons/lu';

import { messages } from '../messages';

const TRANSITION_DURATION_MS = 300;

const HALF = 0.5;

type Origin = { readonly x: number; readonly y: number };

export function getCenter(element: Element): Origin {
  const { left, top, width, height } = element.getBoundingClientRect();
  return { x: left + width * HALF, y: top + height * HALF };
}

function canAnimate(): boolean {
  return (
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Distance from the origin to the farthest viewport corner, so the circle always covers the screen. */
function getCoverRadius({ x, y }: Origin): number {
  return Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
}

/**
 * Runs `applyTheme` inside a view transition that expands a circle from `origin`.
 * Falls back to applying the theme immediately when view transitions are unavailable
 * or the user prefers reduced motion.
 */
async function startColorModeTransition(origin: Origin, applyTheme: () => void): Promise<void> {
  if (!canAnimate()) {
    applyTheme();
    return;
  }

  // flushSync makes React update the DOM before the browser captures the new state.
  const transition = document.startViewTransition(() => flushSync(applyTheme));
  await transition.ready;

  const radius = getCoverRadius(origin);
  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${origin.x}px ${origin.y}px)`,
        `circle(${radius}px at ${origin.x}px ${origin.y}px)`,
      ],
    },
    {
      duration: TRANSITION_DURATION_MS,
      easing: 'ease-out',
      pseudoElement: '::view-transition-new(root)',
    },
  );
}

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
        aria-label={isDark ? messages.colorMode.switchToLight : messages.colorMode.switchToDark}
        variant="ghost"
        onClick={handleClick}
      >
        {isDark ? <LuSun /> : <LuMoon />}
      </IconButton>
    </ClientOnly>
  );
}
