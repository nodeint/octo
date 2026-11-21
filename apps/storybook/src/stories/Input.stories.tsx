import type { Meta, StoryObj } from '@storybook/react-vite';
import { Inline, Input } from '@workspace/ui';

const SIZES = ['xs', 'sm', 'md', 'lg'] as const;

const meta = {
  title: 'Form/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Type here' },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Inline>
      {SIZES.map((size) => (
        <Input key={size} {...args} data-size={size} defaultValue={size} />
      ))}
    </Inline>
  ),
};

export const WithValue: Story = {
  args: { defaultValue: 'octo@example.com', type: 'email' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Disabled' },
};

export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: 'Invalid value' },
};
