import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import type { OverlayWidth } from '../overlay-width';

function Popover({ ...props }: PopoverPrimitive.Root.Props): React.JSX.Element {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props): React.JSX.Element {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = 'center',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  collisionAvoidance,
  anchor,
  size,
  inset,
  anchorWidth,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'collisionAvoidance' | 'anchor'
  > & {
    /** Fixed width from the overlay scale. Omitted, the popover is as wide as its content. */
    size?: OverlayWidth
    /** `none` drops the padding and gap and caps the height to the viewport, for content that paints its own edges. */
    inset?: 'none'
    /** Match the width of the anchor, for a panel that opens over its own field. Wins over `size`. */
    anchorWidth?: boolean
  }): React.JSX.Element {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionAvoidance={collisionAvoidance}
        anchor={anchor}
        className="floating-positioner popover-positioner"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          data-size={size}
          data-inset={inset}
          data-width={anchorWidth ? 'anchor' : undefined}
          className={cn('floating-content popover-content', className)}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="popover-header"
      className={cn('popover-header', className)}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props): React.JSX.Element {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn('popover-title', className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props): React.JSX.Element {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn('popover-description', className)}
      {...props}
    />
  );
}


/**
 * Positioning anchor for Popover (cell / virtual caret). Base UI Trigger with
 * `nativeButton={false}` — compose via `render={…}` (U7), not Radix `asChild`.
 */
function PopoverAnchor({
  className,
  ...props
}: PopoverPrimitive.Trigger.Props): React.JSX.Element {
  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-anchor"
      nativeButton={false}
      className={className}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
