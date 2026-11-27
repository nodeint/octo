import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { paintName } from '../../../lib/paint';
import type { SwatchTone } from '../../../lib/surface-paint';
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
  default: 'base',
  info: 'info',
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
} as const satisfies Record<AlertVariant, string>;

type AlertProps = useRender.ComponentProps<'div'> & {
  variant?: AlertVariant
  /** A swatch hue for a custom callout; replaces the tone the variant implies. */
  tone?: SwatchTone
}

function Alert({
  className,
  variant = 'default',
  tone,
  render,
  ...props
}: AlertProps): React.JSX.Element {
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        role: ALERT_ROLE[variant],
        className: cn('row alert', className),
      },
      props
    ),
    render,
    state: {
      slot: 'alert',
      'row-type': 'content',
      'row-size': 'md',
      variant,
      'paint-static': paintName({ tone: tone ?? ALERT_TONE[variant], emphasis: 'surface' }),
    },
  });
}

function createAlertPart(slot: string, recipe?: string): (props: useRender.ComponentProps<'div'>) => React.JSX.Element {
  return function AlertPart({ className, render, ...props }) {
    return useRender({
      defaultTagName: 'div',
      props: mergeProps<'div'>({ className: cn(recipe, slot) }, { className }, props),
      render,
      state: { slot },
    });
  };
}

const AlertContent = createAlertPart('alert-content', 'row-content');
const AlertTitle = createAlertPart('alert-title', 'row-title');
const AlertDescription = createAlertPart('alert-description', 'row-description');
const AlertAction = createAlertPart('alert-action', 'row-actions');

export { Alert, AlertAction, AlertContent, AlertDescription, AlertTitle };
export type { AlertProps, AlertVariant };
