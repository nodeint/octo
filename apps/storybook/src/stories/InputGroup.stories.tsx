import type { Meta, StoryObj } from '@storybook/react-vite';
import type { InputGroupSize } from '@workspace/ui';
import {
  Icon,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  Stack,
  Textarea,
} from '@workspace/ui';

const SIZES = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly InputGroupSize[];

const meta = {
  title: 'Form/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['outline', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: SIZES },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <Icon name="search" />
      </InputGroupAddon>
      <Input placeholder="Search" aria-label="Search" />
    </InputGroup>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack>
      {SIZES.map((size) => (
        <InputGroup key={size} {...args} size={size}>
          <InputGroupAddon>
            <Icon name="search" />
          </InputGroupAddon>
          <Input placeholder={size} aria-label={size} />
        </InputGroup>
      ))}
    </Stack>
  ),
};

export const WithButton: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <Input placeholder="Search" aria-label="Search" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton shape="icon" aria-label="Clear">
          <Icon name="x" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithText: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <Input placeholder="example.com" aria-label="Domain" />
    </InputGroup>
  ),
};

export const MultiLine: Story = {
  name: 'Textarea',
  render: (args) => (
    <InputGroup {...args}>
      <Textarea placeholder="Write a message" aria-label="Message" />
    </InputGroup>
  ),
};

export const WithBlockAddon: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <Input placeholder="Ask anything" aria-label="Prompt" />
      <InputGroupAddon align="block-end">
        <InputGroupText>0 / 280</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <Icon name="search" />
      </InputGroupAddon>
      <Input placeholder="Search" aria-label="Search" />
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <InputGroupAddon>
        <Icon name="search" />
      </InputGroupAddon>
      <Input disabled placeholder="Disabled" aria-label="Disabled" />
    </InputGroup>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <Input aria-invalid defaultValue="Invalid value" aria-label="Invalid" />
    </InputGroup>
  ),
};
