import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  Icon,
} from '@workspace/ui';

const meta = {
  title: 'Form/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
};

export const WithSeparator: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="secondary">Save</Button>
      <ButtonGroupSeparator />
      <Button variant="secondary">Cancel</Button>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupText>Sort by</ButtonGroupText>
      <Button variant="outline">Name</Button>
      <Button variant="outline">Date</Button>
    </ButtonGroup>
  ),
};

export const IconButtons: Story = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline" shape="icon" aria-label="Add">
        <Icon name="plus" />
      </Button>
      <Button variant="outline" shape="icon" aria-label="Search">
        <Icon name="search" />
      </Button>
    </ButtonGroup>
  ),
};
