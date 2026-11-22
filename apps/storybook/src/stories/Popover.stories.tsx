import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Field,
  FieldGroup,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@workspace/ui';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/popover:
 * - Fixed widths use the `size` prop of `PopoverContent` instead of Tailwind width classes.
 * - The Demo fields use `Field orientation="horizontal"` instead of the Tailwind grid.
 * - The RTL story passes `dir="rtl"` to each `PopoverContent` (it renders in a portal) and uses fixed Arabic
 *   strings instead of the shadcn translation helper.
 */

const meta = {
  title: 'Overlay/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
      <PopoverContent size="md">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <FieldGroup>
          <Field orientation="horizontal">
            <Label htmlFor="popover-demo-width">Width</Label>
            <Input id="popover-demo-width" defaultValue="100%" />
          </Field>
          <Field orientation="horizontal">
            <Label htmlFor="popover-demo-max-width">Max. width</Label>
            <Input id="popover-demo-max-width" defaultValue="300px" />
          </Field>
          <Field orientation="horizontal">
            <Label htmlFor="popover-demo-height">Height</Label>
            <Input id="popover-demo-height" defaultValue="25px" />
          </Field>
          <Field orientation="horizontal">
            <Label htmlFor="popover-demo-max-height">Max. height</Label>
            <Input id="popover-demo-max-height" defaultValue="none" />
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  ),
};

export const Basic: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
      <PopoverContent align="start">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
};

export const Align: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '1.5rem' }}>
      {(['start', 'center', 'end'] as const).map((align) => (
        <Popover key={align} {...args}>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>
            {align.charAt(0).toUpperCase() + align.slice(1)}
          </PopoverTrigger>
          <PopoverContent align={align} size="xs">
            Aligned to {align}
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const WithForm: Story = {
  name: 'With Form',
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger render={<Button variant="outline" />}>Open Popover</PopoverTrigger>
      <PopoverContent align="start" size="sm">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
        </PopoverHeader>
        <FieldGroup>
          <Field orientation="horizontal">
            <Label htmlFor="popover-width">Width</Label>
            <Input id="popover-width" defaultValue="100%" />
          </Field>
          <Field orientation="horizontal">
            <Label htmlFor="popover-height">Height</Label>
            <Input id="popover-height" defaultValue="25px" />
          </Field>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  ),
};

const RTL_SIDES = [
  ['left', 'يسار'],
  ['top', 'أعلى'],
  ['bottom', 'أسفل'],
  ['right', 'يمين'],
  ['inline-start', 'بداية السطر'],
  ['inline-end', 'نهاية السطر'],
] as const;

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <div dir="rtl" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
      {RTL_SIDES.map(([side, label]) => (
        <Popover key={side} {...args}>
          <PopoverTrigger render={<Button variant="outline" />}>{label}</PopoverTrigger>
          <PopoverContent side={side} dir="rtl">
            <PopoverHeader>
              <PopoverTitle>الأبعاد</PopoverTitle>
              <PopoverDescription>تعيين الأبعاد للطبقة.</PopoverDescription>
            </PopoverHeader>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};
