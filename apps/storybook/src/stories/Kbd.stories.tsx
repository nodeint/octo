import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputGroupAddon,
  Kbd,
  KbdGroup,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Typography/Kbd',
  component: Kbd,
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => (
    <Flex gap="md" direction="column" align="center">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </Flex>
  ),
};

export const Group: Story = {
  parameters: {
    docs: { description: { story: 'Use `KbdGroup` to group keyboard keys together.' } },
  },
  render: () => (
    <p>
      Use{' '}
      <KbdGroup>
        <Kbd>Ctrl + B</Kbd>
        <Kbd>Ctrl + K</Kbd>
      </KbdGroup>{' '}
      to open the command palette
    </p>
  ),
};

export const WithButton: Story = {
  name: 'Button',
  parameters: {
    docs: { description: { story: 'Place `Kbd` inside a `Button` to show its shortcut.' } },
  },
  render: () => (
    <Button variant="outline">
      Accept <Kbd>⏎</Kbd>
    </Button>
  ),
};

export const WithTooltip: Story = {
  name: 'Tooltip',
  parameters: {
    docs: { description: { story: 'Show a shortcut inside a `TooltipContent`.' } },
  },
  render: () => (
    <Flex gap="md">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Save</TooltipTrigger>
        <TooltipContent>
          Save Changes <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>Print</TooltipTrigger>
        <TooltipContent>
          Print Document{' '}
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        </TooltipContent>
      </Tooltip>
    </Flex>
  ),
};

export const WithInputGroup: Story = {
  name: 'Input Group',
  parameters: {
    storyWidth: 'md',
    docs: { description: { story: 'Show a shortcut in an `InputGroupAddon`.' } },
  },
  decorators: [storyWidthDecorator],
  render: () => (
    <InputGroup>
      <Input placeholder="Search..." aria-label="Search" />
      <InputGroupAddon>
        <Icon name="search" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: () => (
    <Flex gap="md" direction="column" align="center" dir="rtl">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </Flex>
  ),
};
