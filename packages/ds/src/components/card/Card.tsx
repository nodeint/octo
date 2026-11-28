import * as React from 'react';

import { cn } from '../../lib/utils';
import {
  Header,
  HeaderAction,
  HeaderContent,
  HeaderDescription,
  HeaderMedia,
  HeaderTitle,
} from '../header/Header';
import type { MediaProps } from '../media/Media';

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
    <Header
      size={size}
      data-slot="card-header"
      className={cn('panel-header card-header', className)}
      {...props}
    />
  );
}

function CardHeaderMedia({ className, ...props }: MediaProps): React.JSX.Element {
  return (
    <HeaderMedia
      data-slot="card-header-media"
      className={cn('card-header-media', className)}
      {...props}
    />
  );
}

function CardHeaderContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <HeaderContent
      data-slot="card-header-content"
      className={cn('card-header-content', className)}
      {...props}
    />
  );
}

function CardHeaderAction({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <HeaderAction
      data-slot="card-header-action"
      className={cn('card-header-action', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <HeaderTitle
      data-slot="card-title"
      className={cn('card-title', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <HeaderDescription
      data-slot="card-description"
      className={cn('card-description', className)}
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
