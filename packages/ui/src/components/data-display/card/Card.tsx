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
        {...props}
      />
    </CardSizeContext.Provider>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  const size = React.useContext(CardSizeContext);
  return (
    <div
      data-slot="card-header"
      data-row-type={size === 'sm' ? 'content' : 'header'}
      className={cn('card-header', className)}
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

function CardAction({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-action"
      className={cn('card-action', className)}
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
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
};
export type { CardProps, CardSize };
