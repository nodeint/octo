import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { resolveSurfacePaint, type SurfacePaint, type SurfaceVariant } from '../../../lib/surface-paint';
import { cn } from '../../../lib/utils';

type BadgeVariant = SurfaceVariant

/** Control-h steps only: xs → control-xs · sm → control-sm · md → control-md · lg → control-lg. */
type BadgeSize = 'xs' | 'sm' | 'md' | 'lg'

type BadgeProps = useRender.ComponentProps<'span'> & SurfacePaint & {
  /** Default `sm` (compact status chrome). Use `md` to align with control-md rows. */
  size?: BadgeSize
}

function Badge({
  className,
  variant,
  tone,
  emphasis,
  size = 'xs',
  render,
  ...props
}: BadgeProps): React.JSX.Element {
  const paint = resolveSurfacePaint({ variant, tone, emphasis }, 'default');
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn('chip', 'badge', className),
      },
      props
    ),
    render,
    // Base UI maps state keys → data-* (data-slot, data-size, data-tone, data-emphasis)
    state: {
      slot: 'badge',
      size,
      tone: paint.tone,
      emphasis: paint.emphasis,
    },
    });
}

export { Badge };
export type { BadgeProps, BadgeSize,BadgeVariant };
