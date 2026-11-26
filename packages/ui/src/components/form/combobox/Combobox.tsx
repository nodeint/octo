'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import * as React from 'react';

import { cn } from '../../../lib/utils';
import { Input } from '../../form/input/Input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from '../../form/input-group/InputGroup';
import { Button } from '../../general/button/Button';
import { Icon } from '../../typography/icon/Icon';

const Combobox = ComboboxPrimitive.Root;

/**
 * Ref for the chips row, passed to `ComboboxChips` and to `ComboboxContent`'s `anchor`
 * so the popup opens under the row.
 */
function useComboboxAnchor(): React.RefObject<HTMLDivElement | null> {
  return React.useRef<HTMLDivElement | null>(null);
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props): React.JSX.Element {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props): React.JSX.Element {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      data-field-size="md"
      data-paint="field"
      className={cn('field-control', 'combobox-trigger', className)}
      {...props}
    >
      {children}
      <Icon name="chevron-down" size="sm" className="combobox-icon-muted" />
    </ComboboxPrimitive.Trigger>
  );
}

function ComboboxClear({ className, ...props }: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="muted" size="xs" shape="icon" />}
      className={cn(className)}
      {...props}
    >
      <Icon name="x" className="combobox-icon" />
    </ComboboxPrimitive.Clear>
  );
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}): React.JSX.Element {
  return (
    <ComboboxPrimitive.InputGroup
      render={<InputGroup variant="field" />}
      className={cn('w-auto', className)}
      // Base UI only reads `disabled` from the root, so a field disabled here would still open on a press in the group.
      onMouseDown={(event) => {
        if (disabled) {
          event.preventBaseUIHandler();
        }
      }}
    >
      <ComboboxPrimitive.Input
        render={<Input disabled={disabled} />}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        {showTrigger ? (
          <InputGroupButton
            size="xs" shape="icon"
            variant="ghost"
            // ComboboxTrigger is a bordered field; inside the input the trigger is the group's icon button.
            render={<ComboboxPrimitive.Trigger />}
            data-slot="input-group-button"
            className="combobox-pressed-reset"
            disabled={disabled}
          >
            <Icon name="chevron-down" size="sm" className="combobox-icon-muted" />
          </InputGroupButton>
        ) : null}
        {showClear ? <ComboboxClear disabled={disabled} /> : null}
      </InputGroupAddon>
      {children}
    </ComboboxPrimitive.InputGroup>
  );
}

function ComboboxChips({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof ComboboxPrimitive.Chips> &
  ComboboxPrimitive.Chips.Props): React.JSX.Element {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      data-field-size="md"
      data-paint="field"
      className={cn('field-control', 'state-ring-group', 'combobox-chips', className)}
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}): React.JSX.Element {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn('chip', 'combobox-chip', className)}
      {...props}
    >
      {children}
      {showRemove ? (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="muted" size="xs" shape="icon" />}
          className="combobox-chip-remove"
          data-slot="combobox-chip-remove"
        >
          <Icon name="x" className="combobox-icon" />
        </ComboboxPrimitive.ChipRemove>
      ) : null}
    </ComboboxPrimitive.Chip>
  );
}

function ComboboxChipsInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props): React.JSX.Element {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn('combobox-chips-input', className)}
      {...props}
    />
  );
}

function ComboboxContent({
  className,
  side = 'bottom',
  sideOffset = 4,
  align = 'start',
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
  >): React.JSX.Element {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="floating-positioner"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-width="anchor"
          data-chips={!!anchor}
          className={cn(
            'floating-content combobox-content',
            className
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props): React.JSX.Element {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn('menu-content combobox-list', className)}
      {...props}
    />
  );
}

function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props): React.JSX.Element {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn('menu-row menu-checkable combobox-item', className)}
      {...props}
    >
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={<span className="menu-indicator" />}
      >
        <Icon name="check" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}

function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props): React.JSX.Element {
  return (
    <ComboboxPrimitive.Group
      data-slot="combobox-group"
      className={cn('menu-group', className)}
      {...props}
    />
  );
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props): React.JSX.Element {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn('menu-label', className)}
      {...props}
    />
  );
}

function ComboboxCollection({ ...props }: ComboboxPrimitive.Collection.Props): React.JSX.Element {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}

function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props): React.JSX.Element {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        'combobox-empty',
        className
      )}
      {...props}
    />
  );
}

function ComboboxSeparator({
  className,
  ...props
}: ComboboxPrimitive.Separator.Props): React.JSX.Element {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn('menu-separator', className)}
      {...props}
    />
  );
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
};
