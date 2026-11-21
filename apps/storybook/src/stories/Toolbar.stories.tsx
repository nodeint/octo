import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Icon,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarSeparator,
  ToolbarToggle,
} from '@workspace/ui';

const meta = {
  title: 'Layout/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Toolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarButton shape="icon" aria-label="Search">
        <Icon name="search" />
      </ToolbarButton>
      <ToolbarButton shape="icon" aria-label="Settings">
        <Icon name="settings" />
      </ToolbarButton>
    </Toolbar>
  ),
};

export const WithGroupsAndSeparator: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarGroup>
        <ToolbarButton shape="icon" aria-label="Add">
          <Icon name="plus" />
        </ToolbarButton>
        <ToolbarButton shape="icon" aria-label="Edit">
          <Icon name="edit" />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton shape="icon" aria-label="Delete">
          <Icon name="trash" />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  ),
};

export const WithToggle: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarToggle aria-label="Favorite">
        <Icon name="star" />
      </ToolbarToggle>
      <ToolbarToggle pressed aria-label="Favorite pressed">
        <Icon name="star" />
      </ToolbarToggle>
      <ToolbarButton>Share</ToolbarButton>
    </Toolbar>
  ),
};

export const WithInput: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarInput placeholder="Search" aria-label="Search" />
      <ToolbarButton shape="icon" aria-label="Search">
        <Icon name="search" />
      </ToolbarButton>
    </Toolbar>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarButton shape="icon" aria-label="Add">
        <Icon name="plus" />
      </ToolbarButton>
      <ToolbarSeparator orientation="horizontal" />
      <ToolbarButton shape="icon" aria-label="Edit">
        <Icon name="edit" />
      </ToolbarButton>
    </Toolbar>
  ),
};
