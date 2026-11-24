import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

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

const ALERT_TONE = {
  default: 'neutral',
  info: 'info',
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
} as const satisfies Record<AlertVariant, string>;

type AlertProps = useRender.ComponentProps<'div'> & {
  variant?: AlertVariant
}

function Alert({
  className,
  variant = 'default',
  render,
  ...props
}: AlertProps): React.JSX.Element {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        role: ALERT_ROLE[variant],
        className: cn('alert', className),
      },
      props
    ),
    render,
    state: {
      slot: 'alert',
      variant,
      tone: ALERT_TONE[variant],
      emphasis: 'surface',
    },
  });
}

function createAlertPart(slot: string): (props: useRender.ComponentProps<'div'>) => React.JSX.Element {
  return function AlertPart({ className, render, ...props }) {
    return useRender({
      defaultTagName: 'div',
      props: mergeProps<'div'>({ className: cn(slot) }, { className }, props),
      render,
      state: { slot },
    });
  };
}

const AlertTitle = createAlertPart('alert-title');
const AlertDescription = createAlertPart('alert-description');
const AlertAction = createAlertPart('alert-action');

export { Alert, AlertAction, AlertDescription, AlertTitle };
export type { AlertProps, AlertVariant };
