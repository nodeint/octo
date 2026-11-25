import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Separator } from '../../layout/separator/Separator';

type ItemVariant = 'default' | 'outline' | 'muted'
type ItemSize = 'md' | 'sm' | 'xs'

/** The media step an item hands to its media: the row size picks one step of the media scale. */
const ITEM_MEDIA_SIZE = { md: 'lg', sm: 'md', xs: 'xs' } as const satisfies Record<ItemSize, string>;
type ItemMediaVariant = 'default' | 'icon' | 'image'

/** True inside an `ItemGroup`, so a plain row there is a `listitem` of the group's `list`. */
const ItemGroupContext = React.createContext(false);

function ItemGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <ItemGroupContext.Provider value>
      <div
        role="list"
        data-slot="item-group"
        className={cn('item-group', className)}
        {...props}
      />
    </ItemGroupContext.Provider>
  );
}

/**
 * A quiet label for one `ItemGroup`, such as a day in a history list.
 * Give it an `id` and point the group at it with `aria-labelledby`.
 * Give it the `size` of the rows it names, so its text starts on their text edge.
 */
function ItemGroupLabel({
  className,
  size = 'md',
  ...props
}: React.ComponentProps<'div'> & { size?: ItemSize }): React.JSX.Element {
  return (
    <div
      data-slot="item-group-label"
      data-size={size}
      className={cn('item-group-label', className)}
      {...props}
    />
  );
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>): React.JSX.Element {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn('item-separator', className)}
      {...props}
    />
  );
}

type ItemProps = useRender.ComponentProps<'div'> & {
  variant?: ItemVariant
  size?: ItemSize
  /**
   * Drops the padding and the border of the row, for an `Item` inside a container that already pads it,
   * such as a menu row.
   */
  bare?: boolean
}

function Item({
  className,
  variant = 'default',
  size = 'md',
  bare = false,
  render,
  ...props
}: ItemProps): React.JSX.Element {
  const isInGroup = React.useContext(ItemGroupContext);
  // A rendered element (a button, a link) keeps its own role.
  const role = isInGroup && render === undefined ? 'listitem' : undefined;
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        role,
        className: cn('row item', className),
      },
      props
    ),
    render,
    // Base UI maps state keys → data-* (data-slot, data-variant, data-size, data-bare)
    state: {
      slot: 'item',
      variant,
      size,
      bare,
      'media-size': ITEM_MEDIA_SIZE[size],
      'row-size': size,
    },
    });
}

function ItemMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & {
  variant?: ItemMediaVariant
}): React.JSX.Element {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      data-media-fit={variant === 'image' ? 'image' : undefined}
      className={cn(
        'media-frame item-media',
        className
      )}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="item-content"
      className={cn(
        'row-content item-content',
        className
      )}
      {...props}
    />
  );
}

/** Wrap plain text so it can truncate beside the title's marks; an element child keeps its own layout. */
function wrapTitleText(child: React.ReactNode): React.ReactNode {
  if (typeof child === 'string' || typeof child === 'number') {
    return <span className="row-title-text">{child}</span>;
  }
  return child;
}

function ItemTitle({ className, children, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="item-title"
      className={cn('row-title item-title', className)}
      {...props}
    >
      {React.Children.map(children, wrapTitleText)}
    </div>
  );
}

type ItemTriggerProps = useRender.ComponentProps<'button'>

/**
 * The row's primary action: a button (or a rendered link) that stretches over the whole row.
 * Put it in `ItemTitle`. The row itself takes no click handler, so `ItemActions` controls
 * act on their own without stopping propagation, and the row is reachable from the keyboard.
 */
function ItemTrigger({ className, render, children, ...props }: ItemTriggerProps): React.JSX.Element {
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      {
        type: render === undefined ? 'button' : undefined,
        className: cn('row-trigger', className),
        children: React.Children.map(children, wrapTitleText),
      },
      props
    ),
    render,
    state: { slot: 'item-trigger' },
  });
}

/** Metadata under the description, such as a time or a count. One step quieter than `ItemDescription`. */
function ItemMeta({ className, ...props }: React.ComponentProps<'p'>): React.JSX.Element {
  return (
    <p
      data-slot="item-meta"
      className={cn('row-meta', className)}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<'p'>): React.JSX.Element {
  return (
    <p
      data-slot="item-description"
      className={cn(
        'row-description',
        className
      )}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="item-actions"
      className={cn('row-actions item-actions', className)}
      {...props}
    />
  );
}

function ItemHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="item-header"
      className={cn('item-header', className)}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="item-footer"
      className={cn('item-footer', className)}
      {...props}
    />
  );
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemGroupLabel,
  ItemHeader,
  ItemMedia,
  ItemMeta,
  ItemSeparator,
  ItemTitle,
  ItemTrigger,
};
export type { ItemMediaVariant,ItemProps, ItemSize, ItemTriggerProps, ItemVariant };
