'use client';

import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import * as React from 'react';

import { type ButtonPaint, toButtonPaint } from '../../../lib/action-paint';
import { cn } from '../../../lib/utils';
import { Button } from '../../general/button/Button';

type AlertDialogSize = 'md' | 'sm'

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props): React.JSX.Element {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props): React.JSX.Element {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props): React.JSX.Element {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props): React.JSX.Element {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn('modal-overlay modal-centered-overlay', className)}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  size = 'md',
  ...props
}: AlertDialogPrimitive.Popup.Props & {
  size?: AlertDialogSize
}): React.JSX.Element {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-row-type="header"
        data-size={size}
        className={cn(
          'panel modal-content modal-centered alert-dialog-content',
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        'alert-dialog-header',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        'panel-footer modal-footer alert-dialog-footer',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>): React.JSX.Element {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        'row-title alert-dialog-title',
        className
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>): React.JSX.Element {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('row-description alert-dialog-description', className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>): React.JSX.Element {
  return (
    <Button
      data-slot="alert-dialog-action"
      className={cn(className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  variant,
  tone,
  emphasis,
  size = 'md',
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, 'size'> &
  ButtonPaint): React.JSX.Element {
  const paint = toButtonPaint({ variant, tone, emphasis }, 'outline');
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button {...paint} size={size} />}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
export type { AlertDialogSize };
