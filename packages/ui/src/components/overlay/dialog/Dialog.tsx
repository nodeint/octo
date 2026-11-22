import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Button } from '../../form/button/Button';
import { Box } from '../../layout/box/Box';
import { ScrollArea } from '../../layout/scroll-area/ScrollArea';
import { Icon } from '../../typography/icon/Icon';

/** Tells DialogBody whether the panel has a fixed height, so the body is the part that scrolls. */
const DialogFillContext = React.createContext(false);

function Dialog({ ...props }: DialogPrimitive.Root.Props): React.JSX.Element {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props): React.JSX.Element {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props): React.JSX.Element {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props): React.JSX.Element {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props): React.JSX.Element {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn('dialog-overlay', className)}
      {...props}
    />
  );
}

type DialogSize = 'sm' | 'md' | 'lg' | 'xl'

type DialogFooterLayout = 'end' | 'stack'

type DialogVariant = 'default' | 'bare'

function DialogContent({
  className,
  children,
  showCloseButton = true,
  size = 'md',
  fill = false,
  variant = 'default',
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
  /** Panel width from the overlay scale. */
  size?: DialogSize
  /** Fixed viewport height; the body scrolls inside instead of the dialog growing. */
  fill?: boolean
  /** `bare` drops the padding and gap so an app shell (sidebar page, palette) can own the whole panel. */
  variant?: DialogVariant
}): React.JSX.Element {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        data-size={size}
        data-fill={fill ? '' : undefined}
        data-variant={variant}
        className={cn('dialog-content', className)}
        {...props}
      >
        <DialogFillContext.Provider value={fill}>{children}</DialogFillContext.Provider>
        {showCloseButton ? <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="dialog-close-button"
                size="sm" shape="icon"
              />
            }
          >
            <Icon name="x" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close> : null}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({
  className,
  leading,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  /** A control before the title, such as a back button. */
  leading?: React.ReactNode
}): React.JSX.Element {
  return (
    <div
      data-slot="dialog-header"
      data-leading={leading ? '' : undefined}
      className={cn('dialog-header', className)}
      {...props}
    >
      {leading}
      {leading ? <div className="dialog-header-text">{children}</div> : children}
    </div>
  );
}

function DialogBody({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  const fill = React.useContext(DialogFillContext);
  const content = (
    <Box
      bleed={fill ? undefined : 'x'}
      data-slot={fill ? undefined : 'dialog-body'}
      className={cn('dialog-body', className)}
      {...props}
    />
  );
  // A fixed-height panel scrolls here. The scroll area bleeds to the panel edge so the scrollbar sits on it,
  // and the content inside re-pads with --panel-inset.
  return fill ? (
    <ScrollArea data-slot="dialog-body" data-box-bleed="x">
      {content}
    </ScrollArea>
  ) : (
    content
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  layout = 'end',
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean
  /** `end` right-aligns actions in a row; `stack` lays them out in a column. */
  layout?: DialogFooterLayout
}): React.JSX.Element {
  return (
    <div
      data-slot="dialog-footer"
      data-layout={layout}
      className={cn('dialog-footer', className)}
      {...props}
    >
      {children}
      {showCloseButton ? <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close> : null}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props): React.JSX.Element {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('dialog-title', className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props): React.JSX.Element {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('dialog-description', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
export type { DialogFooterLayout, DialogSize, DialogVariant };
