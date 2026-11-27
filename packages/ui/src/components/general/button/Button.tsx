import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { type ButtonPaint, type ButtonVariant, paintName, resolveButtonPaint } from '@workspace/ds';

import { cn } from '../../../lib/utils';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
/** `icon` is a square button that holds only a glyph. */
type ButtonShape = 'default' | 'icon'

type ButtonProps = ButtonPrimitive.Props & ButtonPaint & {
  size?: ButtonSize
  shape?: ButtonShape
}

function Button({
  className,
  variant,
  tone,
  emphasis,
  size = 'md',
  shape = 'default',
  ...props
}: ButtonProps): React.JSX.Element {
  const paint = resolveButtonPaint({ variant, tone, emphasis }, 'default');
  return (
    <ButtonPrimitive
      {...props}
      data-slot="button"
      data-paint={paintName(paint)}
      data-action-size={size}
      data-shape={shape}
      className={cn('action', 'button', className)}
    />
  );
}

export { Button };
export type { ActionEmphasis as ButtonEmphasis, ActionTone as ButtonTone } from '@workspace/ds';
export type { ButtonProps, ButtonShape, ButtonSize, ButtonVariant };
