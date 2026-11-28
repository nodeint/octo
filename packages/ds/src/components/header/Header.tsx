import { useRender } from '@base-ui/react/use-render';
import * as React from 'react';

import { cn } from '../../lib/utils';
import type { MediaProps } from '../media/Media';
import { Media } from '../media/Media';

type HeaderSize = 'md' | 'sm';

type HeaderProps = React.ComponentProps<'div'> & {
  /** The type set of the title and description. `md` is the default and renders no size attribute. */
  size?: HeaderSize;
};

type HeaderMediaProps = MediaProps;
type HeaderContentProps = React.ComponentProps<'div'>;
type HeaderActionProps = React.ComponentProps<'div'>;
type HeaderTitleProps = useRender.ComponentProps<'div'>;
type HeaderDescriptionProps = useRender.ComponentProps<'div'>;

function Header({ className, size = 'md', ...props }: HeaderProps): React.JSX.Element {
  return (
    <div
      data-slot="header"
      data-header-size={size === 'sm' ? 'sm' : undefined}
      className={cn('header', className)}
      {...props}
    />
  );
}

function HeaderMedia({ className, ...props }: HeaderMediaProps): React.JSX.Element {
  return (
    <Media
      data-slot="header-media"
      className={cn('header-media', className)}
      {...props}
    />
  );
}

function HeaderContent({ className, ...props }: HeaderContentProps): React.JSX.Element {
  return (
    <div
      data-slot="header-content"
      className={cn('header-content', className)}
      {...props}
    />
  );
}

function HeaderAction({ className, ...props }: HeaderActionProps): React.JSX.Element {
  return (
    <div
      data-slot="header-action"
      className={cn('header-actions', className)}
      {...props}
    />
  );
}

function HeaderTitle({ className, render, ...props }: HeaderTitleProps): React.JSX.Element {
  return useRender({
    defaultTagName: 'div',
    props: { 'data-slot': 'header-title', ...props, className: cn('header-title', className) },
    render,
  });
}

function HeaderDescription({ className, render, ...props }: HeaderDescriptionProps): React.JSX.Element {
  return useRender({
    defaultTagName: 'div',
    props: { 'data-slot': 'header-description', ...props, className: cn('header-description', className) },
    render,
  });
}

export { Header, HeaderAction, HeaderContent, HeaderDescription, HeaderMedia, HeaderTitle };
export type {
  HeaderActionProps,
  HeaderContentProps,
  HeaderDescriptionProps,
  HeaderMediaProps,
  HeaderProps,
  HeaderSize,
  HeaderTitleProps,
};
