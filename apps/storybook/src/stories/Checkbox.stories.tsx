// Deviations from the shadcn page: the RTL example uses a `dir="rtl"` wrapper instead of the shadcn translation
// helper, and the Table example uses the `Table` parts from `@workspace/ui` without the `w-8` header class.
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const USERS = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'Admin' },
  { id: '2', name: 'Marcus Rodriguez', email: 'marcus.rodriguez@example.com', role: 'User' },
  { id: '3', name: 'Priya Patel', email: 'priya.patel@example.com', role: 'User' },
  { id: '4', name: 'David Kim', email: 'david.kim@example.com', role: 'Editor' },
] as const;

const DESKTOP_ITEMS = [
  { id: 'hard-disks', label: 'Hard disks', checked: true },
  { id: 'external-disks', label: 'External disks', checked: true },
  { id: 'cds-dvds', label: 'CDs, DVDs, and iPods', checked: false },
  { id: 'servers', label: 'Connected servers', checked: false },
] as const;

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => (
    <FieldGroup>
      <Field orientation="horizontal">
        <Checkbox id="checkbox-demo-1" name="checkbox-demo-1" />
        <Label htmlFor="checkbox-demo-1">Accept terms and conditions</Label>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="checkbox-demo-2" name="checkbox-demo-2" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="checkbox-demo-2">Accept terms and conditions</FieldLabel>
          <FieldDescription>By clicking this checkbox, you agree to the terms.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="checkbox-demo-3" name="checkbox-demo-3" disabled />
        <FieldLabel htmlFor="checkbox-demo-3">Enable notifications</FieldLabel>
      </Field>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="checkbox-demo-4" name="checkbox-demo-4" />
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>You can enable or disable notifications at any time.</FieldDescription>
          </FieldContent>
        </Field>
      </FieldLabel>
    </FieldGroup>
  ),
};

export const CheckedState: Story = {
  render: function CheckedStateStory() {
    const [checked, setChecked] = React.useState(false);

    return (
      <Field orientation="horizontal">
        <Checkbox id="checkbox-checked" checked={checked} onCheckedChange={setChecked} />
        <FieldLabel htmlFor="checkbox-checked">{checked ? 'Checked' : 'Not checked'}</FieldLabel>
      </Field>
    );
  },
};

export const InvalidState: Story = {
  render: () => (
    <Field orientation="horizontal" data-invalid>
      <Checkbox id="checkbox-invalid" name="checkbox-invalid" aria-invalid />
      <FieldLabel htmlFor="checkbox-invalid">Accept terms and conditions</FieldLabel>
    </Field>
  ),
};

export const Basic: Story = {
  render: () => (
    <Field orientation="horizontal">
      <Checkbox id="checkbox-basic" name="checkbox-basic" />
      <FieldLabel htmlFor="checkbox-basic">Accept terms and conditions</FieldLabel>
    </Field>
  ),
};

export const Description: Story = {
  render: () => (
    <Field orientation="horizontal">
      <Checkbox id="checkbox-desc" name="checkbox-desc" defaultChecked />
      <FieldContent>
        <FieldLabel htmlFor="checkbox-desc">Accept terms and conditions</FieldLabel>
        <FieldDescription>By clicking this checkbox, you agree to the terms and conditions.</FieldDescription>
      </FieldContent>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field orientation="horizontal" data-disabled>
      <Checkbox id="checkbox-disabled" name="checkbox-disabled" disabled />
      <FieldLabel htmlFor="checkbox-disabled">Enable notifications</FieldLabel>
    </Field>
  ),
};

export const Group: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend variant="label">Show these items on the desktop:</FieldLegend>
      <FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
      <FieldGroup>
        {DESKTOP_ITEMS.map((item) => (
          <Field key={item.id} orientation="horizontal">
            <Checkbox id={`checkbox-group-${item.id}`} name={`checkbox-group-${item.id}`} defaultChecked={item.checked} />
            <FieldLabel htmlFor={`checkbox-group-${item.id}`}>{item.label}</FieldLabel>
          </Field>
        ))}
      </FieldGroup>
    </FieldSet>
  ),
};

export const InTable: Story = {
  parameters: { storyWidth: 'lg' },
  render: function InTableStory() {
    const [selected, setSelected] = React.useState<ReadonlySet<string>>(new Set(['1']));
    const isAllSelected = selected.size === USERS.length;

    function toggleAll(isChecked: boolean): void {
      setSelected(isChecked ? new Set(USERS.map((user) => user.id)) : new Set());
    }

    function toggleRow(id: string, isChecked: boolean): void {
      const next = new Set(selected);
      if (isChecked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      setSelected(next);
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox id="checkbox-select-all" aria-label="Select all" checked={isAllSelected} onCheckedChange={toggleAll} />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {USERS.map((user) => (
            <TableRow key={user.id} data-state={selected.has(user.id) ? 'selected' : undefined}>
              <TableCell>
                <Checkbox
                  id={`checkbox-row-${user.id}`}
                  aria-label={`Select ${user.name}`}
                  checked={selected.has(user.id)}
                  onCheckedChange={(isChecked) => {
                    toggleRow(user.id, isChecked);
                  }}
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

export const Rtl: Story = {
  render: () => (
    <FieldGroup dir="rtl">
      <Field orientation="horizontal">
        <Checkbox id="checkbox-rtl-1" name="checkbox-rtl-1" />
        <Label htmlFor="checkbox-rtl-1">قبول الشروط والأحكام</Label>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="checkbox-rtl-2" name="checkbox-rtl-2" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="checkbox-rtl-2">قبول الشروط والأحكام</FieldLabel>
          <FieldDescription>بالنقر على هذا المربع، فإنك توافق على الشروط.</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <Checkbox id="checkbox-rtl-3" name="checkbox-rtl-3" disabled />
        <FieldLabel htmlFor="checkbox-rtl-3">تفعيل الإشعارات</FieldLabel>
      </Field>
    </FieldGroup>
  ),
};
