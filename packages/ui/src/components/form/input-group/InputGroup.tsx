import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Button } from '../../form/button/Button';

type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'
type InputGroupVariant = 'field' | 'outline' | 'secondary' | 'ghost'
type InputGroupButtonSize = 'xs' | 'sm' | 'md'
type InputGroupSize = 'xs' | 'sm' | 'md' | 'lg'

function isClickInsideButton(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && target.closest('button') !== null;
}

function focusGroupedInput(event: React.MouseEvent<HTMLDivElement>) {
  if (isClickInsideButton(event.target)) {
    return;
  }
  event.currentTarget.parentElement?.querySelector('input')?.focus();
}

function InputGroup({
  className,
  variant = 'outline',
  size = 'md',
  ...props
}: React.ComponentProps<'div'> & {
  /**
   * Sets the border and fill of the group and the colors of its addons. Defaults to outline.
   * A direct Input or Textarea draws none of its own and takes the group's size.
   */
  variant?: InputGroupVariant
  /** One step of the control scale. The input or textarea inside takes it too. */
  size?: InputGroupSize
}): React.JSX.Element {
  return (
    <div
      data-slot="input-group"
      data-group-variant={variant}
      data-field-size={size}
      role="group"
      className={cn('input-group', className)}
      {...props}
    />
  );
}

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & {
  align?: InputGroupAddonAlign
}): React.JSX.Element {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn('input-group-addon', className)}
      onClick={focusGroupedInput}
      {...props}
    />
  );
}

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size' | 'type'> & {
  type?: 'button' | 'submit' | 'reset'
  size?: InputGroupButtonSize
}): React.JSX.Element {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={cn('input-group-button', className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element {
  return (
    <span
      className={cn('input-group-text', className)}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
};
export type { InputGroupAddonAlign, InputGroupButtonSize, InputGroupSize };
