'use client';

import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';

import { cn } from '../../../lib/utils';

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props): React.JSX.Element {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn('radio-group', className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: RadioPrimitive.Root.Props): React.JSX.Element {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      className={cn('radio-group-item', className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="radio-group-indicator"
      />
    </RadioPrimitive.Root>
  );
}

export { RadioGroup, RadioGroupItem };
