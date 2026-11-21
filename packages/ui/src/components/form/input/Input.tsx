import { Input as InputPrimitive } from '@base-ui/react/input';
import * as React from 'react';

import { cn } from '../../../lib/utils';

type InputProps = React.ComponentProps<'input'> & {
  /** Base UI controlled callback. The native `onChange` event is not enough for a controlled input. */
  onValueChange?: (value: string) => void;
};

function Input({ className, type, ...props }: InputProps): React.JSX.Element {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      data-variant="field"
      data-field-size="md"
      className={cn('input', className)}
      {...props}
    />
  );
}

export { Input };
