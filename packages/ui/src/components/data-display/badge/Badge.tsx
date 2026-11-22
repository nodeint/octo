import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { cn } from '../../../lib/utils';

type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning'
  | 'info'
/** Control-h steps only: xs → control-xs · sm → control-sm · md → control-md · lg → control-lg. */
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

type BadgeProps = useRender.ComponentProps<'span'> & {
  variant?: BadgeVariant
  /** Default `sm` (compact status chrome). Use `md` to align with control-md rows. */
  size?: BadgeSize
}

function Badge({
  className,
  variant = 'default',
  size = 'xs',
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
