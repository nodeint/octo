import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonSize, ButtonVariant } from '@workspace/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Inline,
} from '@workspace/ui';

const VARIANTS = ['default', 'outline', 'secondary', 'ghost'] as const satisfies readonly ButtonVariant[];

const SIZES = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly ButtonSize[];

const meta = {
  title: 'Overlay/DropdownMenu',
  component: DropdownMenuTrigger,
  tags: ['autodocs'],
  args: { children: 'Open menu' },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'inline-radio', options: SIZES },
    shape: { control: 'inline-radio', options: ['default', 'icon'] },
  },
} satisfies Meta<typeof DropdownMenuTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const TriggerVariants: Story = {
  render: (args) => (
    <Inline>
      {VARIANTS.map((variant) => (
        <DropdownMenu key={variant}>
          <DropdownMenuTrigger {...args} variant={variant}>
            {variant}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </Inline>
  ),
};

export const TriggerSizes: Story = {
  render: (args) => (
    <Inline>
      {SIZES.map((size) => (
        <DropdownMenu key={size}>
          <DropdownMenuTrigger {...args} size={size}>
            {size}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </Inline>
  ),
};
