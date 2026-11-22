'use client';

import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Icon } from '../../typography/icon/Icon';
import type { OverlayWidth } from '../overlay-width';

type ContextMenuItemVariant = 'default' | 'destructive'

function ContextMenu({ ...props }: ContextMenuPrimitive.Root.Props): React.JSX.Element {
  return <ContextMenuPrimitive.Root data-slot="context-menu" {...props} />;
}

function ContextMenuPortal({ ...props }: ContextMenuPrimitive.Portal.Props): React.JSX.Element {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  );
}

function ContextMenuTrigger({
  className,
  ...props
}: ContextMenuPrimitive.Trigger.Props): React.JSX.Element {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn('context-menu-trigger', className)}
      {...props}
    />
  );
}

function ContextMenuContent({
  className,
  align = 'start',
  alignOffset = 4,
  side = 'right',
  sideOffset = 0,
  anchor,
  positionMethod,
  size,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'anchor' | 'positionMethod'
  > & {
    /** Fixed width from the overlay scale. Omitted, the menu is as wide as its items. */
    size?: OverlayWidth
  }): React.JSX.Element {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        className="context-menu-positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        anchor={anchor}
        positionMethod={positionMethod}
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          data-size={size}
          className={cn('context-menu-content', className)}
          {...props}
        />
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

function ContextMenuGroup({
  className,
  ...props
}: ContextMenuPrimitive.Group.Props): React.JSX.Element {
  return (
    <ContextMenuPrimitive.Group
      data-slot="context-menu-group"
      className={cn('context-menu-group', className)}
      {...props}
    />
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}): React.JSX.Element {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn('context-menu-label', className)}
      {...props}
    />
  );
}

function ContextMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: ContextMenuItemVariant
}): React.JSX.Element {
  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn('context-menu-item', className)}
      {...props}
    />
  );
}

function ContextMenuSub({ ...props }: ContextMenuPrimitive.SubmenuRoot.Props): React.JSX.Element {
  return (
    <ContextMenuPrimitive.SubmenuRoot data-slot="context-menu-sub" {...props} />
  );
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}): React.JSX.Element {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      data-inset={inset}
      className={cn('context-menu-sub-trigger', className)}
      {...props}
    >
      {children}
      <Icon name="chevron-right" className="menu-chevron" />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuContent>): React.JSX.Element {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className={cn('context-menu-sub-content', className)}
      side="right"
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}): React.JSX.Element {
  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
      data-inset={inset}
      className={cn('context-menu-checkbox-item', className)}
      checked={checked}
      {...props}
    >
      <span className="context-menu-item-indicator">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <Icon name="check" />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioGroup({
  className,
  ...props
}: ContextMenuPrimitive.RadioGroup.Props): React.JSX.Element {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      className={cn('context-menu-radio-group', className)}
      {...props}
    />
  );
}

function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: ContextMenuPrimitive.RadioItem.Props & {
  inset?: boolean
}): React.JSX.Element {
  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
      data-inset={inset}
      className={cn('context-menu-radio-item', className)}
      {...props}
    >
      <span className="context-menu-item-indicator">
        <ContextMenuPrimitive.RadioItemIndicator>
          <Icon name="check" />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuSeparator({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.Separator.Props & {
  /** Keeps the line inside the menu padding instead of bleeding to the edges. */
  inset?: boolean
}): React.JSX.Element {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="context-menu-separator"
      data-inset={inset}
      className={cn('context-menu-separator', className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>): React.JSX.Element {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        'context-menu-shortcut',
        className
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
export type { ContextMenuItemVariant };
