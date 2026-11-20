import type * as React from 'react';

import { cn } from '../../../lib/utils';

function Pane({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="pane"
      className={cn('pane', className)}
      {...props}
    />
  );
}

function PaneHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="pane-header"
      className={cn('pane-header', className)}
      {...props}
    />
  );
}

function PaneContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="pane-content"
      className={cn('pane-content', className)}
      {...props}
    />
  );
}

function PaneFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="pane-footer"
      className={cn('pane-footer', className)}
      {...props}
    />
  );
}

export { Pane, PaneContent, PaneFooter, PaneHeader };
