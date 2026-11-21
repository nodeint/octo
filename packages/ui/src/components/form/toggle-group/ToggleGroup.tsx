'use client';

import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import type {
  ToggleShape,
  ToggleSize,
  ToggleVariant,
} from '../../form/toggle/Toggle';

type ToggleGroupContextValue = {
  variant?: ToggleVariant
  size?: ToggleSize
  shape?: ToggleShape
  orientation?: 'horizontal' | 'vertical'
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: 'md',
  variant: 'ghost',
  orientation: 'horizontal',
});

function ToggleGroup<Value extends string = string>({
  className,
  variant,
  size,
  shape,
  orientation = 'horizontal',
  wrap = false,
  children,
  ...props
}: ToggleGroupPrimitive.Props<Value> & {
  variant?: ToggleVariant
  size?: ToggleSize
  shape?: ToggleShape
  orientation?: 'horizontal' | 'vertical'
  /** Items wrap onto the next line, and the group can shrink below its content width. */
  wrap?: boolean
}): React.JSX.Element {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-action-size={size}
      data-orientation={orientation}
      data-wrap={wrap ? '' : undefined}
      className={cn('toggle-group', className)}
      {...props}
    >
      <ToggleGroupContext.Provider
        value={{ variant, size, shape, orientation }}
      >
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  shape,
  fillIcon = false,
  ...props
}: TogglePrimitive.Props & {
  variant?: ToggleVariant
  size?: ToggleSize
  shape?: ToggleShape
  /** Fill the glyph while pressed. A stroke icon stays an outline. */
  fillIcon?: boolean
}): React.JSX.Element {
  const context = React.useContext(ToggleGroupContext);
  const resolvedVariant = variant ?? context.variant ?? 'ghost';
  const resolvedSize = size ?? context.size ?? 'md';
  const resolvedShape = shape ?? context.shape ?? 'default';

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={resolvedVariant}
      data-action-size={resolvedSize}
      data-shape={resolvedShape}
      className={cn('toggle toggle-group-item', className)}
      {...props}
      data-fill-icon={fillIcon ? '' : undefined}
    >
      {children}
    </TogglePrimitive>
  );
}

export { ToggleGroup, ToggleGroupItem };
