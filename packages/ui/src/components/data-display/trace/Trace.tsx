import type * as React from 'react';

import { cn } from '../../../lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../layout/collapsible/Collapsible';
import { Icon } from '../../typography/icon/Icon';

type TraceStatus = 'running' | 'error' | 'pending'
type TraceEmphasis = 'quiet' | 'strong'

/**
 * Trace — a list of steps, each one line, ported from the shadcn `base-nova` registry.
 *
 * Layout, skin, state, and motion live in `trace.css`. State hangs on `data-slot`,
 * `data-status`, and the Base UI `data-panel-open`.
 *
 * @see https://ui.shadcn.com/docs/components/base/trace
 */
function Trace({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="trace"
      className={cn('trace', className)}
      {...props}
    />
  );
}

function TraceLine({
  className,
  status,
  emphasis,
  ...props
}: React.ComponentProps<'span'> & {
  status?: TraceStatus
  /**
   * quiet = a muted icon, for a step that only reads.
   * strong = a warning icon and a heavier title, for a step that cannot be undone.
   * An error line keeps its own color.
   */
  emphasis?: TraceEmphasis
}): React.JSX.Element {
  return (
    <span
      data-slot="trace-line"
      data-status={status}
      data-emphasis={emphasis}
      className={cn('trace-line', className)}
      {...props}
    />
  );
}

function TraceIcon({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element {
  return (
    <span
      data-slot="trace-icon"
      aria-hidden="true"
      className={cn('trace-icon', className)}
      {...props}
    />
  );
}

function TraceTitle({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element {
  return (
    <span
      data-slot="trace-title"
      className={cn('trace-title', className)}
      {...props}
    />
  );
}

function TraceDescription({
  className,
  ...props
}: React.ComponentProps<'span'>): React.JSX.Element {
  return (
    <span
      data-slot="trace-description"
      className={cn('trace-description', className)}
      {...props}
    />
  );
}

type CollapsibleProps = React.ComponentProps<typeof Collapsible>

/** A controlled row passes `open` and `onOpenChange` together. */
function TraceCollapsible({
  className,
  ...props
}: Omit<CollapsibleProps, 'open'> &
  (
    | { open?: undefined }
    | {
      open: boolean
      onOpenChange: NonNullable<CollapsibleProps['onOpenChange']>
    }
  )): React.JSX.Element {
  return (
    <Collapsible
      data-slot="trace-collapsible"
      className={cn('trace-collapsible', className)}
      {...props}
    />
  );
}

function TraceCollapsibleTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleTrigger>): React.JSX.Element {
  return (
    <CollapsibleTrigger
      data-slot="trace-collapsible-trigger"
      className={cn('trace-collapsible-trigger', className)}
      {...props}
    >
      {children}
      <TraceIcon className="trace-collapsible-chevron">
        <Icon name="chevron-right" />
      </TraceIcon>
    </CollapsibleTrigger>
  );
}

function TraceCollapsibleContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof CollapsibleContent>): React.JSX.Element {
  return (
    <CollapsibleContent
      data-slot="trace-collapsible-content"
      className="trace-collapsible-content"
      {...props}
    >
      <div
        data-slot="trace-collapsible-content-inner"
        className={cn('trace-collapsible-content-inner', className)}
      >
        {children}
      </div>
    </CollapsibleContent>
  );
}

export type { TraceStatus };
export {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
};
