import { Box, type BoxProps, Flex, type FlexProps, resolveSurfacePaint } from '@workspace/ds';
import type * as React from 'react';

import { cn } from '../../../lib/utils';
import { ScrollArea, type ScrollAreaProps } from '../scroll-area/ScrollArea';
import { Separator } from '../separator/Separator';

/** `variant`, or `tone` with `emphasis`, is the Box paint; without any the pane paints `base` and `outline`. */
type PaneProps = FlexProps

function Pane({
  className,
  p = 'md',
  radius = 'md',
  variant,
  tone,
  emphasis,
  ...props
}: PaneProps): React.JSX.Element {
  const paint = resolveSurfacePaint({ variant, tone, emphasis }, 'outline');
  return (
    <Flex
      p={p}
      radius={radius}
      data-slot="pane"
      tone={paint.tone}
      emphasis={paint.emphasis}
      className={cn('pane', className)}
      {...props}
    />
  );
}

function PaneHeader({ className, ...props }: BoxProps): React.JSX.Element {
  return <Box bleed="x" px="inset" py="inset" data-slot="pane-header" className={cn('pane-header', className)} {...props} />;
}

/** The body takes the free space and scrolls with the design system scrollbar, which sits on the pane edge. */
function PaneBody({ className, children, ...props }: ScrollAreaProps): React.JSX.Element {
  return (
    <ScrollArea data-slot="pane-body" data-box-bleed="x" className={className} {...props}>
      <Box px="inset" className="pane-body-content">{children}</Box>
    </ScrollArea>
  );
}

/** A rule between regions that bleeds to the pane edges. A body next to it pads that side with the inset. */
function PaneSeparator({ className, ...props }: React.ComponentProps<typeof Separator>): React.JSX.Element {
  return <Separator data-slot="pane-separator" data-box-bleed="x" className={cn('pane-separator', className)} {...props} />;
}

function PaneFooter({ className, ...props }: BoxProps): React.JSX.Element {
  return <Box bleed="x" px="inset" py="inset" data-slot="pane-footer" className={cn('pane-footer', className)} {...props} />;
}

export { Pane, PaneBody, PaneFooter, PaneHeader, PaneSeparator };
export type { PaneProps };
