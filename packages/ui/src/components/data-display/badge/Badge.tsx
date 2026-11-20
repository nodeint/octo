import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { cn } from '../../../lib/utils';

type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'success'
  | 'warning'
  | 'info'
/** Control-h steps only: sm → control-sm · md → control-md. */
type BadgeSize = 'sm' | 'md'

type BadgeProps = useRender.ComponentProps<'span'> & {
  variant?: BadgeVariant
  /** Default `sm` (compact status chrome). Use `md` to align with control-md rows. */
  size?: BadgeSize
}

function Badge({
  className,
  variant = 'default',
  size = 'sm',
  render,
  ...props
}: BadgeProps): React.JSX.Element {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn('badge', className),
      },
      props
    ),
    render,
    // Base UI maps state keys → data-* (data-slot, data-variant, data-size)
    state: {
      slot: 'badge',
      variant,
      size,
    },
    });
}

export { Badge };
export type { BadgeProps, BadgeSize,BadgeVariant };
