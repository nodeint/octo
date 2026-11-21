import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from '@workspace/ui';

const meta = {
  title: 'Form/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'Type your message' },
  argTypes: { disabled: { control: 'boolean' } },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithValue: Story = {
  args: { defaultValue: 'A longer message\nthat spans two lines.' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Disabled' },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: 'Invalid value' },
};
