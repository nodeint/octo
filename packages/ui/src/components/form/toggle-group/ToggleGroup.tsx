'use client';

import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';

import { cn } from '../../../lib/utils';
import type { ToggleSize } from '../../form/toggle/Toggle';

type ToggleGroupVariant = 'ghost' | 'outline' | 'secondary'

function ToggleGroup<Value extends string = string>({
  className,
  variant = 'ghost',
  size,
  orientation = 'horizontal',
  wrap = false,
  ...props
}: ToggleGroupPrimitive.Props<Value> & {
  /** Sets the identity colors (fill, text, border) of the toggles inside, over their own variant, as ButtonGroup does. */
  variant?: ToggleGroupVariant
  /** One step of the control scale. The toggles inside take it and cannot override it. Without it each keeps its own. */
  size?: ToggleSize
  orientation?: 'horizontal' | 'vertical'
  /** Toggles wrap onto the next line, and the group can shrink below its content width. */
  wrap?: boolean
}): React.JSX.Element {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-group-variant={variant}
      data-group-size={size}
      data-orientation={orientation}
      data-wrap={wrap ? '' : undefined}
      className={cn('toggle-group', className)}
      {...props}
    />
  );
}

export { ToggleGroup };
export type { ToggleGroupVariant };
