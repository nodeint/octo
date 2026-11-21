import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ToggleSize } from '@workspace/ui';
import { Icon, Stack, ToggleGroup, ToggleGroupItem } from '@workspace/ui';

const SIZES = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly ToggleSize[];

const VIEWS = ['list', 'grid', 'board'] as const;

const meta = {
  title: 'Form/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'outline'] },
    size: { control: 'inline-radio', options: SIZES },
    shape: { control: 'inline-radio', options: ['default', 'icon'] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { defaultValue: ['list'] },
  render: (args) => (
    <ToggleGroup {...args}>
      {VIEWS.map((view) => (
        <ToggleGroupItem key={view} value={view}>
          {view}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      {SIZES.map((size) => (
        <ToggleGroup key={size} {...args} size={size} defaultValue={['list']}>
          {VIEWS.map((view) => (
            <ToggleGroupItem key={view} value={view}>
              {view}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ))}
    </Stack>
  ),
};

export const Outline: Story = {
  args: { variant: 'outline', defaultValue: ['grid'] },
  render: (args) => (
    <ToggleGroup {...args}>
      {VIEWS.map((view) => (
        <ToggleGroupItem key={view} value={view}>
          {view}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ),
};

export const IconOnly: Story = {
  args: { shape: 'icon', defaultValue: ['star'] },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="star" aria-label="Star">
        <Icon name="star" />
      </ToggleGroupItem>
      <ToggleGroupItem value="search" aria-label="Search">
        <Icon name="search" />
      </ToggleGroupItem>
      <ToggleGroupItem value="settings" aria-label="Settings">
        <Icon name="settings" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical', defaultValue: ['list'] },
  render: (args) => (
    <ToggleGroup {...args}>
      {VIEWS.map((view) => (
        <ToggleGroupItem key={view} value={view}>
          {view}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: ['list'] },
  render: (args) => (
    <ToggleGroup {...args}>
      {VIEWS.map((view) => (
        <ToggleGroupItem key={view} value={view}>
          {view}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ),
};
