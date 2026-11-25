import { Toolbar as ToolbarPrimitive } from '@base-ui/react/toolbar';

import { type ButtonPaint, resolveButtonPaint, resolveTogglePaint, type TogglePaint } from '../../../lib/action-paint';
import { resolveGroupPaint } from '../../../lib/group-paint';
import { cn } from '../../../lib/utils';
import {
  type ButtonShape,
  type ButtonSize,
  type ButtonVariant,
} from '../button/Button';
import { type ButtonGroupSize, type ButtonGroupVariant } from '../button-group/ButtonGroup';
import { type ToggleSize } from '../../form/toggle/Toggle';

type ToolbarOrientation = 'horizontal' | 'vertical'

type ToolbarProps = ToolbarPrimitive.Root.Props & {
  /**
   * Sets the identity colors of the buttons, toggles and inputs inside, over their own variant,
   * as ButtonGroup does.
   */
  variant?: ButtonGroupVariant
  /** One step of the control scale. The items inside take it and cannot override it. */
  size?: ButtonGroupSize
}

function Toolbar({
  className,
  orientation = 'horizontal',
  variant = 'outline',
  size = 'md',
  ...props
}: ToolbarProps): React.JSX.Element {
  const paint = resolveGroupPaint(variant);
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      data-group-variant={variant}
      data-tone={paint.tone}
      data-emphasis={paint.emphasis}
      data-group-size={size}
      data-orientation={orientation}
      orientation={orientation}
      className={cn('group toolbar', className)}
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

type ToolbarButtonProps = ToolbarPrimitive.Button.Props & ButtonPaint & {
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
  variant,
  tone,
  emphasis,
  size = 'md',
  shape = 'default',
  ...props
}: ToolbarButtonProps): React.JSX.Element {
  const paint = resolveButtonPaint({ variant, tone, emphasis }, 'ghost');
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      data-tone={paint.tone}
      data-emphasis={paint.emphasis}
      data-action-size={size}
      data-shape={shape}
      className={cn('action button toolbar-button', className)}
      focusableWhenDisabled={false}
      {...props}
    />
  );
}

type ToolbarToggleProps = Omit<ToolbarButtonProps, 'aria-pressed' | 'variant' | 'tone' | 'emphasis' | 'size'> & TogglePaint & {
  size?: ToggleSize
  /** Controlled pressed state (two-state toolbar item). */
  pressed?: boolean
  /** Fill the glyph while pressed, as Toggle does. */
  fillIcon?: boolean
}

/**
 * Two-state toolbar item — still a Base UI `Toolbar.Button` (roving focus),
 * with the `toggle` recipe's pressed skin (`aria-pressed` / `data-pressed`).
 * Not a two-segment strip; use one toggle per binary mode.
 * Tooltip: `<TooltipTrigger render={<ToolbarToggle />} />`
 */
function ToolbarToggle({
  className,
  variant,
  emphasis,
  size = 'md',
  shape = 'icon',
  pressed = false,
  fillIcon = false,
  ...props
}: ToolbarToggleProps): React.JSX.Element {
  const paint = resolveTogglePaint({ variant, emphasis }, 'ghost');
  return (
    <ToolbarPrimitive.Button
      type="button"
      data-slot="toolbar-toggle"
      data-tone={paint.tone}
      data-emphasis={paint.emphasis}
      data-action-size={size}
      data-shape={shape}
      data-pressed={pressed ? 'true' : undefined}
      data-fill-icon={fillIcon ? '' : undefined}
      aria-pressed={pressed}
      className={cn(
        'action toggle toolbar-button toolbar-toggle',
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
      data-tone="field"
      data-emphasis="field"
      className={cn('field-control input toolbar-input', className)}
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
  ToolbarProps,
  ToolbarToggleProps,
};
