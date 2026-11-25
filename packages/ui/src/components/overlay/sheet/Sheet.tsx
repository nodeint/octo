import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Button } from '../../general/button/Button';
import { Icon } from '../../typography/icon/Icon';

type SheetSide = 'top' | 'right' | 'bottom' | 'left'
type SheetVariant = 'default' | 'bare'

function Sheet({ ...props }: SheetPrimitive.Root.Props): React.JSX.Element {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props): React.JSX.Element {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props): React.JSX.Element {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn('modal-overlay sheet-overlay', className)}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  variant = 'default',
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: SheetSide
  showCloseButton?: boolean
  /** `bare` drops the surface, gap, and edge so a panel (a pane) can paint the whole sheet. */
  variant?: SheetVariant
}): React.JSX.Element {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-row-type="header"
        data-side={side}
        data-variant={variant}
        className={cn('panel modal-content sheet-content', className)}
        {...props}
      >
        {children}
        {showCloseButton ? <SheetPrimitive.Close
            data-slot="sheet-close"
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
          </SheetPrimitive.Close> : null}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="sheet-header"
      className={cn('sheet-header', className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('panel-footer modal-footer sheet-footer', className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props): React.JSX.Element {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('row-title', className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props): React.JSX.Element {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('row-description', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
export type { SheetSide, SheetVariant };
