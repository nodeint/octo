import { Button as ButtonPrimitive } from '@base-ui/react/button';

import { cn } from '../../../lib/utils';

type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'link'
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
/** `icon` is a square button that holds only a glyph. */
type ButtonShape = 'default' | 'icon'

type ButtonProps = ButtonPrimitive.Props & {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
}

function Button({
  className,
  variant = 'default',
  size = 'md',
  shape = 'default',
  ...props
}: ButtonProps): React.JSX.Element {
  return (
    <ButtonPrimitive
      {...props}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      className={cn('button', className)}
    />
  );
}

export { Button };
export type { ButtonProps, ButtonShape, ButtonSize, ButtonVariant };
