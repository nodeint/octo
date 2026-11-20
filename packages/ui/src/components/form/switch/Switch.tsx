import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

import { cn } from '../../../lib/utils';

type SwitchSize = 'md' | 'sm'

type SwitchProps = SwitchPrimitive.Root.Props & {
  size?: SwitchSize
}

function Switch({
  className,
  size = 'md',
  ...props
}: SwitchProps): React.JSX.Element {
  return (
    <SwitchPrimitive.Root
      {...props}
      data-slot="switch"
      data-size={size}
      className={cn('peer switch', className)}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
export type { SwitchProps, SwitchSize };
