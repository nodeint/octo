import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import * as React from 'react';

import { cn } from '../../../lib/utils';

type BubbleVariant =
  | 'default'
  | 'secondary'
  | 'muted'
  | 'tinted'
  | 'outline'
  | 'ghost'
  | 'destructive'
type BubbleAlign = 'start' | 'end'

type BubbleProps = React.ComponentProps<'div'> & {
  variant?: BubbleVariant
  /** Which inline edge of the row the bubble sits on. */
  align?: BubbleAlign
}

function Bubble({
  className,
  variant = 'default',
  align = 'start',
  ...props
}: BubbleProps): React.JSX.Element {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn('bubble', className)}
      {...props}
    />
  );
}

function BubbleContent({
  className,
  render,
  ...props
}: useRender.ComponentProps<'div'>): React.JSX.Element {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn('bubble-content', className),
      },
      props
    ),
    render,
    state: {
      slot: 'bubble-content',
    },
  });
}

/** Consecutive bubbles from one sender. Set `align` on each bubble, not on the group. */
function BubbleGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="bubble-group"
      className={cn('bubble-group', className)}
      {...props}
    />
  );
}

export { Bubble, BubbleContent, BubbleGroup };
export type { BubbleAlign, BubbleProps, BubbleVariant };
