'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';

import { cn } from '../../../lib/utils';

type ToggleVariant = 'ghost' | 'outline' | 'swatch'
type ToggleSize = 'xs' | 'sm' | 'md' | 'lg'
/** `icon` is a square toggle that holds only a glyph. */
type ToggleShape = 'default' | 'icon'

type ToggleProps = TogglePrimitive.Props & {
  variant?: ToggleVariant
  size?: ToggleSize
  shape?: ToggleShape
  /** Fill the glyph while pressed. A stroke icon stays an outline. */
  fillIcon?: boolean
}

function Toggle({
  className,
  variant = 'ghost',
  size = 'md',
  shape = 'default',
  fillIcon = false,
  ...props
}: ToggleProps): React.JSX.Element {
  return (
    <TogglePrimitive
      {...props}
      data-slot="toggle"
      data-variant={variant}
      data-action-size={size}
      data-shape={shape}
      data-fill-icon={fillIcon ? '' : undefined}
      className={cn('toggle', className)}
    />
  );
}

export { Toggle };
export type { ToggleProps, ToggleShape, ToggleSize, ToggleVariant };
