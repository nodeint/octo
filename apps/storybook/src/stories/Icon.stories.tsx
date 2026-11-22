import type { Meta, StoryObj } from '@storybook/react-vite';
import type { IconSize } from '@workspace/ui';
import { Flex, Icon } from '@workspace/ui';

const SIZES = ['xs', 'sm', 'md'] as const satisfies readonly IconSize[];
const NAMES = ['search', 'settings', 'star', 'heart', 'user', 'trash', 'download', 'terminal'] as const;

const meta = {
  title: 'Typography/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: NAMES },
    size: { control: 'inline-radio', options: SIZES },
  },
  args: { name: 'star', size: 'md' },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Flex gap="md" align="center">
      {SIZES.map((size) => (
        <Icon key={size} {...args} size={size} />
      ))}
    </Flex>
  ),
};

export const Catalog: Story = {
  render: (args) => (
    <Flex gap="md" wrap="wrap">
      {NAMES.map((name) => (
        <Icon key={name} {...args} name={name} />
      ))}
    </Flex>
  ),
};
