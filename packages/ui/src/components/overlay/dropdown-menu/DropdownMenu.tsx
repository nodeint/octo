import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import type { ButtonShape, ButtonSize, ButtonVariant } from '../../form/button/Button';
import { Icon } from '../../typography/icon/Icon';
import type { OverlayWidth } from '../overlay-width';

type DropdownMenuItemVariant = 'default' | 'destructive'

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props): React.JSX.Element {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props): React.JSX.Element {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

type DropdownMenuTriggerProps = MenuPrimitive.Trigger.Props & {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
}

/**
 * A native-button trigger (`nativeButton`, Base UI's default) takes the `Button` skin.
 * Pass `nativeButton={false}` when `render` supplies a non-button element.
 * Attributes from a parent `render` merge after these, so `ToolbarButton` and `Button` keep their own.
 */
function DropdownMenuTrigger({
  className,
  variant = 'secondary',
  size = 'md',
  shape = 'default',
  nativeButton = true,
  ...props
}: DropdownMenuTriggerProps): React.JSX.Element {
  return (
    <MenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      nativeButton={nativeButton}
      {...(nativeButton && {
        'data-variant': variant,
        'data-action-size': size,
        'data-shape': shape,
      })}
      className={nativeButton ? cn('action button', className) : className}
      {...props}
    />
  );
}

function DropdownMenuContent({
  align = 'start',
  alignOffset = 0,
  side = 'bottom',
  sideOffset = 4,
  collisionAvoidance,
  className,
  size,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    'align' | 'alignOffset' | 'side' | 'sideOffset' | 'collisionAvoidance'
  > & {
    /** Fixed width from the overlay scale. Omitted, the menu matches its trigger. */
    size?: OverlayWidth
  }): React.JSX.Element {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="dropdown-menu-positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionAvoidance={collisionAvoidance}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          data-size={size}
          className={cn('menu-content dropdown-menu-content', className)}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({ className, ...props }: MenuPrimitive.Group.Props): React.JSX.Element {
  return (
    <MenuPrimitive.Group
      data-slot="dropdown-menu-group"
      className={cn('menu-group dropdown-menu-group', className)}
      {...props}
    />
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}): React.JSX.Element {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn('menu-label dropdown-menu-label', className)}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = 'default',
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: DropdownMenuItemVariant
}): React.JSX.Element {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        'menu-row menu-item dropdown-menu-item',
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props): React.JSX.Element {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}): React.JSX.Element {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn('menu-row menu-sub-trigger dropdown-menu-sub-trigger', className)}
      {...props}
    >
      {children}
      <Icon name="chevron-right" className="menu-chevron" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  align = 'start',
  alignOffset = -3,
  side = 'right',
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>): React.JSX.Element {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn('dropdown-menu-sub-content', className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}): React.JSX.Element {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn('menu-row menu-checkable dropdown-menu-checkbox-item', className)}
      checked={checked}
      {...props}
    >
      <span
        className="menu-indicator dropdown-menu-item-indicator"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <Icon name="check" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  className,
  ...props
}: MenuPrimitive.RadioGroup.Props): React.JSX.Element {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      className={cn('menu-group dropdown-menu-radio-group', className)}
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}): React.JSX.Element {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn('menu-row menu-checkable dropdown-menu-radio-item', className)}
      {...props}
    >
      <span
        className="menu-indicator dropdown-menu-item-indicator"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <Icon name="check" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator({
  className,
  inset,
  ...props
}: MenuPrimitive.Separator.Props & {
  /** Keeps the line inside the menu padding instead of bleeding to the edges. */
  inset?: boolean
}): React.JSX.Element {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      data-inset={inset}
      className={cn('menu-separator dropdown-menu-separator', className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>): React.JSX.Element {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'menu-shortcut dropdown-menu-shortcut',
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
export type { DropdownMenuItemVariant };
