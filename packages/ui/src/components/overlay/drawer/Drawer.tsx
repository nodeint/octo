import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Button } from '../../general/button/Button';
import { Icon } from '../../typography/icon/Icon';

type DrawerSide = 'top' | 'right' | 'bottom' | 'left'

/** The side a drawer opens from is the direction it is swiped back toward. */
const SWIPE_DIRECTION_BY_SIDE = {
  top: 'up',
  right: 'right',
  bottom: 'down',
  left: 'left',
} as const satisfies Record<DrawerSide, DrawerPrimitive.Root.Props['swipeDirection']>;

const DrawerSideContext = React.createContext<DrawerSide>('right');

function Drawer({
  side = 'right',
  ...props
}: Omit<DrawerPrimitive.Root.Props, 'swipeDirection'> & {
  /** The edge the drawer opens from; swiping toward it closes the drawer. */
  side?: DrawerSide
}): React.JSX.Element {
  return (
    <DrawerSideContext.Provider value={side}>
      <DrawerPrimitive.Root swipeDirection={SWIPE_DIRECTION_BY_SIDE[side]} {...props} />
    </DrawerSideContext.Provider>
  );
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props): React.JSX.Element {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props): React.JSX.Element {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props): React.JSX.Element {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerOverlay({ className, ...props }: DrawerPrimitive.Backdrop.Props): React.JSX.Element {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn('modal-overlay modal-side-overlay', className)}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DrawerPrimitive.Popup.Props & {
  showCloseButton?: boolean
}): React.JSX.Element {
  const side = React.useContext(DrawerSideContext);

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Viewport data-slot="drawer-viewport" data-side={side} className="modal-side-viewport">
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          data-row-type="header"
          data-side={side}
          className={cn('panel modal-content modal-side drawer-content', className)}
          {...props}
        >
          {children}
          {showCloseButton ? <DrawerPrimitive.Close
            data-slot="drawer-close"
            render={
              <Button
                variant="ghost"
                className="modal-close-button"
                size="sm" shape="icon"
              />
            }
          >
            <Icon name="x" />
            <span className="sr-only">Close</span>
          </DrawerPrimitive.Close> : null}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="drawer-header"
      className={cn('drawer-header', className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('panel-footer modal-footer drawer-footer', className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props): React.JSX.Element {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('row-title', className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props): React.JSX.Element {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('row-description', className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
export type { DrawerSide };
