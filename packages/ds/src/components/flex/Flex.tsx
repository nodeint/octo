import * as React from 'react';

import { cn } from '../../lib/utils';
import { Box, type BoxProps } from '../box/Box';

type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
type FlexAlign = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline'
type FlexJustify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

type FlexProps = BoxProps & {
  /** The main axis. Defaults to `row`. */
  direction?: FlexDirection
  /** Alignment of the children along the cross axis. */
  align?: FlexAlign
  /** Alignment of the children along the main axis. */
  justify?: FlexJustify
  /** Whether the children wrap when they overflow. */
  wrap?: FlexWrap
  /** `flex-basis` of the container itself, as any CSS length. */
  basis?: React.CSSProperties['flexBasis']
  /** `flex-grow` of the container itself, when it is a flex item. */
  grow?: React.CSSProperties['flexGrow']
  /** `flex-shrink` of the container itself, when it is a flex item. */
  shrink?: React.CSSProperties['flexShrink']
  /** Render `inline-flex` instead of `flex`. */
  inline?: boolean
}

function Flex({
  className,
  style,
  direction,
  align,
  justify,
  wrap,
  basis,
  grow,
  shrink,
  inline,
  ...props
}: FlexProps): React.JSX.Element {
  return (
    <Box
      data-slot="flex"
      data-flex-direction={direction}
      data-flex-align={align}
      data-flex-justify={justify}
      data-flex-wrap={wrap}
      data-flex-inline={inline ? '' : undefined}
      className={cn('layout-flex', className)}
      style={{ flexBasis: basis, flexGrow: grow, flexShrink: shrink, ...style }}
      {...props}
    />
  );
}

/** Flexible space between flex items: it grows to fill what is left and pushes its siblings apart. */
function Spacer({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="spacer"
      aria-hidden="true"
      className={cn('layout-spacer', className)}
      {...props}
    />
  );
}

export { Flex, Spacer };
export type { FlexAlign, FlexDirection, FlexJustify, FlexProps, FlexWrap };
