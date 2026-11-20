import type { ComponentType, ReactNode } from 'react';

import { ICON_MAP, ICON_NAMES, type IconName } from '../../../constants';
import { cn } from '../../../lib/utils';


/** Runtime-only component icon (custom SVG). Prefer catalog {@link IconName} + {@link Icon}. */
export type IconComponent = ComponentType<{ className?: string }>;

export type IconSize = 'xs' | 'sm' | 'md';

export type IconProps = React.ComponentProps<'svg'> & {
  /**
   * Closed catalog id. `undefined` / `null` / empty → renders nothing.
   * Host icon id strings accepted; unknown ids throw in development.
   */
  name?: string | null;
  /** Control glyph size token (`--control-glyph-*`). Omit to size via `className`. */
  size?: IconSize;
};

function isPresentName(name: IconProps['name']): name is string {
  return typeof name === 'string' && name.length > 0;
}

function isIconName(value: string): value is IconName {
  return (ICON_NAMES as readonly string[]).includes(value);
}

const NODE_ENV_PRODUCTION = 'production';

function resolveCatalogName(name: string): IconName | null {
  if (!isIconName(name)) {
    if (process.env.NODE_ENV !== NODE_ENV_PRODUCTION) {
      throw new Error(`[Icon] Unknown catalog icon: ${name}`);
    }
    return null;
  }

  return name;
}

/**
 * Product icon paint SSoT — closed catalog only.
 *
 * @example
 * ```tsx
 * <Icon name="search" size="md" />
 * <Icon name={page.icon} size="md" />
 * ```
 */
export function Icon({
  name,
  size,
  className,
  ...svgProps }: IconProps): ReactNode {
  if (!isPresentName(name)) {
    return null;
  }

  const catalogName = resolveCatalogName(name);
  if (!catalogName) {
    return null;
  }

  const Glyph = ICON_MAP[catalogName];

  return (
    <Glyph {...svgProps} data-size={size} className={cn('icon', className)} />
  );
}
