import * as React from 'react';

import { cn } from '../../lib/utils';
import type { MediaProps } from '../media/Media';
import { Media } from '../media/Media';

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
        data-panel-transition=""
        data-panel-media-bleed=""
        data-panel-reveal-scope=""
        className={cn('panel card', className)}
        data-box-surface="card"
        data-box-bordered="all"
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
      data-header-size={size === 'sm' ? 'sm' : undefined}
      className={cn('panel-header header card-header', className)}
      {...props}
    />
  );
}

function CardHeaderMedia({ className, ...props }: MediaProps): React.JSX.Element {
  return (
    <Media
      data-slot="card-header-media"
      className={cn('header-media card-header-media', className)}
      {...props}
    />
  );
}

function CardHeaderContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-header-content"
      className={cn('header-content card-header-content', className)}
      {...props}
    />
  );
}

function CardHeaderAction({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-header-action"
      className={cn('header-actions card-header-action', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'header-title card-title',
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
      className={cn('header-description card-description', className)}
      {...props}
    />
  );
}

function CardMedia({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-media"
      className={cn('panel-media card-media', className)}
      {...props}
    />
  );
}

function CardMediaAction({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="card-media-action"
      className={cn('panel-media-action card-media-action', className)}
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
  CardHeaderMedia,
  CardMedia,
  CardMediaAction,
  CardTitle,
};
export type { CardProps, CardSize };
