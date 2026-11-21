import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ToggleSize, ToggleVariant } from '@workspace/ui';
import { Icon, Inline, Toggle } from '@workspace/ui';

const VARIANTS = ['default', 'outline', 'swatch'] as const satisfies readonly ToggleVariant[];

const SIZES = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly ToggleSize[];

const meta = {
  title: 'Form/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { children: 'Toggle' },
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS },
    size: { control: 'inline-radio', options: SIZES },
    shape: { control: 'inline-radio', options: ['default', 'icon'] },
    fillIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Inline>
      {(['default', 'outline'] as const).map((variant) => (
        <Toggle key={variant} {...args} variant={variant}>
          {variant}
        </Toggle>
      ))}
    </Inline>
  ),
};

export const Pressed: Story = {
  render: (args) => (
    <Inline>
      {(['default', 'outline'] as const).map((variant) => (
        <Toggle key={variant} {...args} variant={variant} defaultPressed>
          {variant}
        </Toggle>
      ))}
    </Inline>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Inline>
      {SIZES.map((size) => (
        <Toggle key={size} {...args} size={size}>
          {size}
        </Toggle>
      ))}
    </Inline>
  ),
};

export const IconOnly: Story = {
  args: { shape: 'icon', 'aria-label': 'Favorite' },
  render: (args) => (
    <Inline>
      {SIZES.map((size) => (
        <Toggle key={size} {...args} size={size}>
          <Icon name="star" />
        </Toggle>
      ))}
    </Inline>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Inline>
      {(['default', 'outline'] as const).map((variant) => (
        <Toggle key={variant} {...args} variant={variant}>
          {variant}
        </Toggle>
      ))}
    </Inline>
  ),
};
