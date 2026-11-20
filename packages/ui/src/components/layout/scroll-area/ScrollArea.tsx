import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area';
import * as React from 'react';

import { cn } from '../../../lib/utils';

/** `none` keeps the scroll offset when content above the viewport changes size. */
type ScrollAreaAnchor = 'auto' | 'none';

/** The axis that scrolls. `horizontal` sizes to its content instead of taking the free space of a column. */
type ScrollAreaOrientation = 'vertical' | 'horizontal';

/** `hidden` keeps the scrolling and draws no scrollbar, for a strip that reads as a row of chips. */
type ScrollAreaScrollbar = 'auto' | 'hidden';

type ScrollAreaMaxHeight = 'sm' | 'md' | 'lg' | 'xl';

type ScrollAreaProps = ScrollAreaPrimitive.Root.Props & {
  /** The element that scrolls. */
  viewportRef?: React.Ref<HTMLDivElement>;
  /** How the browser reacts when content above the viewport changes size. */
  anchor?: ScrollAreaAnchor;
  /** Caps the viewport at a step of the overlay height scale, for a list that grows inside a floating panel. */
  maxHeight?: ScrollAreaMaxHeight;
  /** The axis that scrolls. */
  orientation?: ScrollAreaOrientation;
  /** Whether the scrollbar is drawn. */
  scrollbar?: ScrollAreaScrollbar;
};

function ScrollArea({
  className,
  children,
  viewportRef,
  anchor = 'auto',
  maxHeight,
  orientation = 'vertical',
  scrollbar = 'auto',
  ...props
}: ScrollAreaProps): React.JSX.Element {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      data-orientation={orientation}
      className={cn('scroll-area', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={viewportRef}
        data-slot="scroll-area-viewport"
        data-anchor={anchor}
        data-max-height={maxHeight}
        data-orientation={orientation}
        className="scroll-area-viewport"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {scrollbar === 'hidden' ? null : <ScrollBar orientation={orientation} />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props): React.JSX.Element {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn('scroll-area-scrollbar', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
export type { ScrollAreaAnchor, ScrollAreaOrientation, ScrollAreaProps, ScrollAreaScrollbar };
