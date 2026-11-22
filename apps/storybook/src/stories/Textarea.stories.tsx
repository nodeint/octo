import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Field, FieldDescription, FieldLabel, Textarea } from '@workspace/ui';
import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'Type your message here.' },
  argTypes: { disabled: { control: 'boolean' } },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {};

export const WithField: Story = {
  name: 'Field',
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
      <FieldDescription>Enter your message below.</FieldDescription>
      <Textarea {...args} id="textarea-message" />
    </Field>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Field data-disabled>
      <FieldLabel htmlFor="textarea-disabled">Message</FieldLabel>
      <Textarea {...args} id="textarea-disabled" />
    </Field>
  ),
};

export const Invalid: Story = {
  args: { 'aria-invalid': true },
  render: (args) => (
    <Field data-invalid>
      <FieldLabel htmlFor="textarea-invalid">Message</FieldLabel>
      <Textarea {...args} id="textarea-invalid" />
      <FieldDescription>Please enter a valid message.</FieldDescription>
    </Field>
  ),
};

export const WithButton: Story = {
  name: 'Button',
  render: (args) => (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      <Textarea {...args} />
      <Button>Send message</Button>
    </div>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  args: { placeholder: 'اكتب ملاحظاتك هنا.', rows: 4, dir: 'rtl' },
  render: (args) => (
    <Field dir="rtl">
      <FieldLabel htmlFor="textarea-rtl" dir="rtl">
        التعليقات
      </FieldLabel>
      <Textarea {...args} id="textarea-rtl" />
      <FieldDescription dir="rtl">شاركنا أفكارك حول خدمتنا.</FieldDescription>
    </Field>
  ),
};
