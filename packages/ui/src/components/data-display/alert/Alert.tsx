import * as React from 'react';

import { cn } from '../../../lib/utils';

type AlertVariant = 'default' | 'info' | 'success' | 'warning' | 'destructive'

/** Urgent states interrupt a screen reader; the rest wait their turn. */
const ALERT_ROLE: Record<AlertVariant, 'alert' | 'status'> = {
  default: 'alert',
  info: 'status',
  success: 'status',
  warning: 'alert',
  destructive: 'alert',
};

type AlertProps = React.ComponentProps<'div'> & {
  variant?: AlertVariant
}

function Alert({
  className,
  variant = 'default',
  ...props
}: AlertProps): React.JSX.Element {
  return (
    <div
      data-slot="alert"
      data-variant={variant}
      role={ALERT_ROLE[variant]}
      className={cn('alert', className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'alert-title',
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="alert-description"
      className={cn('alert-description', className)}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="alert-action"
      className={cn('alert-action', className)}
      {...props}
    />
  );
}

export { Alert, AlertAction, AlertDescription, AlertTitle };
export type { AlertProps, AlertVariant };
