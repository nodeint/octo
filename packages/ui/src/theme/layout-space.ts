import type { Token } from '@chakra-ui/react';

import { system } from './system';

type LayoutSpaceToken = Extract<Token, `spacing.layout.space.${string}`>;

/** Reads a resolved layout length at the DOM boundary for geometry APIs that require pixels. */
export function getLayoutSpacePixels(token: LayoutSpaceToken): number {
  const reference: unknown = system.token.var(token);
  if (typeof reference !== 'string' || !reference.startsWith('var(') || !reference.endsWith(')')) {
    throw new Error(`Cannot resolve layout spacing ${token}: missing CSS variable`);
  }
  const styles = getComputedStyle(document.documentElement);
  const value = styles.getPropertyValue(reference.slice('var('.length, -1)).trim();
  if (value === '0') {
    return 0;
  }
  const match = /^(\d+(?:\.\d+)?)(px|rem)$/.exec(value);
  if (!match) {
    throw new Error(`Cannot resolve layout spacing ${token}: expected px or rem, received "${value}"`);
  }
  const scale = match[2] === 'rem' ? Number.parseFloat(styles.fontSize) : 1;
  const pixels = Number(match[1]) * scale;
  if (!Number.isFinite(pixels)) {
    throw new Error(`Cannot resolve layout spacing ${token}: invalid root font size "${styles.fontSize}"`);
  }
  return pixels;
}
