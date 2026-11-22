import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CollapsibleToolbar,
  CollapsibleToolbarContent,
  CollapsibleToolbarTrigger,
  Icon,
  ToolbarButton,
} from '@workspace/ui';

const meta = {
  title: 'Layout/CollapsibleToolbar',
  component: CollapsibleToolbar,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    variant: { control: 'inline-radio', options: ['outline', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Rests as its trigger and opens on hover or click. A click pins it open until the trigger is toggled off.',
      },
    },
  },
} satisfies Meta<typeof CollapsibleToolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: (args) => (
    <CollapsibleToolbar {...args}>
      <CollapsibleToolbarContent>
        <ToolbarButton shape="icon" aria-label="Search"><Icon name="search" /></ToolbarButton>
        <ToolbarButton shape="icon" aria-label="Settings"><Icon name="settings" /></ToolbarButton>
        <ToolbarButton shape="icon" aria-label="Add"><Icon name="plus" /></ToolbarButton>
      </CollapsibleToolbarContent>
      <CollapsibleToolbarTrigger aria-label="Toggle toolbar" />
    </CollapsibleToolbar>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: Demo.render,
};

export const CustomTrigger: Story = {
  render: (args) => (
    <CollapsibleToolbar {...args}>
      <CollapsibleToolbarContent>
        <ToolbarButton shape="icon" aria-label="Edit"><Icon name="edit" /></ToolbarButton>
        <ToolbarButton shape="icon" aria-label="Delete"><Icon name="trash" /></ToolbarButton>
      </CollapsibleToolbarContent>
      <CollapsibleToolbarTrigger aria-label="Actions"><Icon name="more-horizontal" /></CollapsibleToolbarTrigger>
    </CollapsibleToolbar>
  ),
};

const VARIANTS = ['outline', 'secondary', 'ghost'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg'] as const;

function ToolbarExample(props: React.ComponentProps<typeof CollapsibleToolbar>): React.JSX.Element {
  return (
    <CollapsibleToolbar {...props}>
      <CollapsibleToolbarContent>
        <ToolbarButton shape="icon" aria-label="Search"><Icon name="search" /></ToolbarButton>
        <ToolbarButton shape="icon" aria-label="Settings"><Icon name="settings" /></ToolbarButton>
      </CollapsibleToolbarContent>
      <CollapsibleToolbarTrigger aria-label="Toggle toolbar" />
    </CollapsibleToolbar>
  );
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      {VARIANTS.map((variant) => (
        <ToolbarExample key={variant} variant={variant} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      {SIZES.map((size) => (
        <ToolbarExample key={size} size={size} />
      ))}
    </div>
  ),
};
