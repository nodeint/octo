import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { Stack, type StackProps } from '@workspace/ds';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Icon } from '../../typography/icon/Icon';

function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'>): React.JSX.Element {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  );
}

function BreadcrumbList(props: StackProps): React.JSX.Element {
  return (
    <Stack
      render={<ol />}
      data-slot="breadcrumb-list"
      orientation="horizontal"
      gap="xs"
      {...props}
    />
  );
}

function BreadcrumbItem(props: StackProps): React.JSX.Element {
  return (
    <Stack
      render={<li />}
      data-slot="breadcrumb-item"
      orientation="horizontal"
      gap="xs"
      {...props}
    />
  );
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<'a'>): React.JSX.Element {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        className: cn(className),
      },
      props
    ),
    render,
    state: {
      slot: 'breadcrumb-link',
      paint: 'base-text-subtle',
      link: true
    },
  });
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  ...props
}: React.ComponentProps<'li'>): React.JSX.Element {
  return (
    <li
      data-slot="breadcrumb-separator"
      data-paint-static="base-ghost-subtle"
      role="presentation"
      aria-hidden="true"
      {...props}
    >
      {children ?? <Icon name="chevron-right" />}
    </li>
  );
}

function BreadcrumbEllipsis({
  ...props
}: React.ComponentProps<'span'>): React.JSX.Element {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      data-icon-size="md"
      {...props}
    >
      <Icon name="more-horizontal" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
