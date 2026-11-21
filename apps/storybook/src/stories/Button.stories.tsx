import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonSize, ButtonVariant } from '@workspace/ui';
import { Button, Icon, Inline } from '@workspace/ui';

const VARIANTS = [
  'default',
  'outline',
  'secondary',
  'ghost',
  'destructive',
  'link',
] as const satisfies readonly ButtonVariant[];

const SIZES = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly ButtonSize[];

const meta = {
  title: 'Form/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'inline-radio', options: SIZES },
    shape: { control: 'inline-radio', options: ['default', 'icon'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Inline>
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </Inline>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Inline>
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size}>
          {size}
        </Button>
      ))}
    </Inline>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <Inline>
      <Button {...args}>
        <Icon name="plus" />
        New item
      </Button>
      <Button {...args} variant="outline">
        Next
        <Icon name="arrow-right" />
      </Button>
    </Inline>
  ),
};

export const IconOnly: Story = {
  args: { shape: 'icon', 'aria-label': 'Search' },
  render: (args) => (
    <Inline>
      {SIZES.map((size) => (
        <Button key={size} {...args} size={size}>
          <Icon name="search" />
        </Button>
      ))}
    </Inline>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Inline>
      {VARIANTS.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </Inline>
  ),
};
