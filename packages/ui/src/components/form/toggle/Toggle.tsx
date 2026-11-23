'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';

import { resolveTogglePaint, type TogglePaint, type ToggleVariant } from '../../../lib/action-paint';
import { cn } from '../../../lib/utils';

type ToggleSize = 'xs' | 'sm' | 'md' | 'lg'
/** `icon` is a square toggle that holds only a glyph. */
type ToggleShape = 'default' | 'icon'

type ToggleProps = TogglePrimitive.Props & TogglePaint & {
  size?: ToggleSize
  shape?: ToggleShape
  /** Fill the glyph while pressed. A stroke icon stays an outline. */
  fillIcon?: boolean
}

function Toggle({
  className,
  variant,
  emphasis,
  size = 'md',
  shape = 'default',
  fillIcon = false,
  ...props
}: ToggleProps): React.JSX.Element {
  const paint = resolveTogglePaint({ variant, emphasis }, 'ghost');
  return (
    <TogglePrimitive
      {...props}
      data-slot="toggle"
      data-tone={paint.tone}
      data-emphasis={paint.emphasis}
      data-action-size={size}
      data-shape={shape}
      data-fill-icon={fillIcon ? '' : undefined}
      className={cn('action', 'toggle', className)}
    />
  );
}

export { Toggle };
export type { ToggleEmphasis } from '../../../lib/action-paint';
export type { ToggleProps, ToggleShape, ToggleSize, ToggleVariant };
