import * as React from 'react';

import { cn } from '../../../lib/utils';

type CardSize = 'md' | 'sm'

const CardSizeContext = React.createContext<CardSize>('md');

type CardProps = React.ComponentProps<'div'> & {
  size?: CardSize
}

function Card({
  className,
  size = 'md',
  ...props
}: CardProps): React.JSX.Element {
  return (
    <CardSizeContext.Provider value={size}>
      <div
        data-slot="card"
        data-size={size}
        data-panel-size={size}
        className={cn('panel card', className)}
        data-box-surface="card"
        data-box-border="thin"
        {...props}
      />
    </CardSizeContext.Provider>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-header"
      className={cn('panel-header card-header', className)}
      {...props}
    />
  );
}

function CardHeaderContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  const size = React.useContext(CardSizeContext);
  return (
    <div
      data-slot="card-header-content"
      data-row-type={size === 'sm' ? 'content' : 'header'}
      className={cn('row-content card-header-content', className)}
      {...props}
    />
  );
}

function CardHeaderAction({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-header-action"
      className={cn('row-actions card-header-action', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'row-title card-title',
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-description"
      className={cn('row-description card-description', className)}
      {...props}
    />
  );
}

function CardMedia({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-media"
      className={cn('card-media', className)}
      {...props}
    />
  );
}

function CardMediaAction({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-media-action"
      className={cn('card-media-action', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-content"
      className={cn('card-content', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-footer"
      className={cn('panel-footer card-footer', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderAction,
  CardHeaderContent,
  CardMedia,
  CardMediaAction,
  CardTitle,
};
export type { CardProps, CardSize };
