import { cn } from '../../../lib/utils';

type EmptyVariant = 'default' | 'plain'
type EmptyMediaVariant = 'default' | 'icon'

function Empty({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & {
  /** `plain` sits inside a frame that already has a border. */
  variant?: EmptyVariant
}): React.JSX.Element {
  return (
    <div
      data-slot="empty"
      data-stack-size={variant === 'plain' ? 'sm' : 'lg'}
      data-variant={variant}
      className={cn('stack empty', className)}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="empty-header"
      data-stack-size="xs"
      data-row-type="header"
      className={cn('stack empty-header', className)}
      {...props}
    />
  );
}

function EmptyMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & {
  variant?: EmptyMediaVariant
}): React.JSX.Element {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      data-media-size={variant === 'icon' ? 'md' : undefined}
      className={cn('media-frame empty-media', className)}
      {...props}
    />
  );
}

function EmptyTitle({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="empty-title"
      className={cn('row-title empty-title', className)}
      {...props}
    />
  );
}

function EmptyDescription({ className, ...props }: React.ComponentProps<'p'>): React.JSX.Element {
  return (
    <div
      data-slot="empty-description"
      className={cn('row-description empty-description', className)}
      {...props}
    />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="empty-content"
      data-stack-size="sm"
      className={cn('stack empty-content', className)}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
};
export type { EmptyMediaVariant, EmptyVariant };
