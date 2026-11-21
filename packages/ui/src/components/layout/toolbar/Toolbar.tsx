import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';

import { cn } from '../../../lib/utils';
import {
  type ButtonShape,
  type ButtonSize,
  type ButtonVariant,
} from '../../form/button/Button';

type ToolbarOrientation = 'horizontal' | 'vertical'

function Toolbar({
  className,
  orientation = 'horizontal',
  ...props
}: ToolbarPrimitive.Root.Props): React.JSX.Element {
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn('toolbar', className)}
      {...props}
    />
  );
}

function ToolbarGroup({
  className,
  ...props
}: ToolbarPrimitive.Group.Props): React.JSX.Element {
  return (
    <ToolbarPrimitive.Group
      data-slot="toolbar-group"
      className={cn('toolbar-group', className)}
      {...props}
    />
  );
}

type ToolbarButtonProps = ToolbarPrimitive.Button.Props & {
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
}

/**
 * Toolbar item button. Compose popups via Base UI `render`:
 * `<ToolbarButton render={<DropdownMenuTrigger />} />`
 * Tooltip: `<TooltipTrigger render={<ToolbarButton />} />`
 */
function ToolbarButton({
  className,
  variant = 'ghost',
  size = 'sm',
  shape = 'default',
  ...props
}: ToolbarButtonProps): React.JSX.Element {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      data-variant={variant}
      data-action-size={size}
      data-shape={shape}
      className={cn('button toolbar-button', className)}
      focusableWhenDisabled={false}
      {...props}
    />
  );
}

type ToolbarToggleProps = Omit<ToolbarButtonProps, 'aria-pressed'> & {
  /** Controlled pressed state (two-state toolbar item). */
  pressed?: boolean
}

/**
 * Two-state toolbar item — still a Base UI `Toolbar.Button` (roving focus),
 * with the `toggle` recipe's pressed skin (`aria-pressed` / `data-pressed`).
 * Not a two-segment strip; use one toggle per binary mode.
 * Tooltip: `<TooltipTrigger render={<ToolbarToggle />} />`
 */
function ToolbarToggle({
  className,
  variant = 'ghost',
  size = 'md',
  shape = 'icon',
  pressed = false,
  ...props
}: ToolbarToggleProps): React.JSX.Element {
  return (
    <ToolbarPrimitive.Button
      type="button"
      data-slot="toolbar-toggle"
      data-variant={variant}
      data-action-size={size}
      data-shape={shape}
      data-pressed={pressed ? 'true' : undefined}
      aria-pressed={pressed}
      className={cn(
        'toggle toolbar-button toolbar-toggle',
        className
      )}
      {...props}
    />
  );
}

function ToolbarLink({
  className,
  ...props
}: ToolbarPrimitive.Link.Props): React.JSX.Element {
  return (
    <ToolbarPrimitive.Link
      data-slot="toolbar-link"
      className={cn('toolbar-link', className)}
      {...props}
    />
  );
}

function ToolbarInput({
  className,
  ...props
}: ToolbarPrimitive.Input.Props): React.JSX.Element {
  return (
    <ToolbarPrimitive.Input
      data-slot="toolbar-input"
      data-field-size="sm"
      className={cn('toolbar-input input', className)}
      {...props}
    />
  );
}

function ToolbarSeparator({
  className,
  orientation = 'vertical',
  ...props
}: ToolbarPrimitive.Separator.Props): React.JSX.Element {
  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      orientation={orientation}
      className={cn('toolbar-separator separator', className)}
      {...props}
    />
  );
}

export {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggle,
};
type ToolbarButtonSize = ButtonSize
type ToolbarButtonShape = ButtonShape
type ToolbarButtonVariant = ButtonVariant

export type {
  ToolbarButtonProps,
  ToolbarButtonShape,
  ToolbarButtonSize,
  ToolbarButtonVariant,
  ToolbarOrientation,
  ToolbarToggleProps,
};
