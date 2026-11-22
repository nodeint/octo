import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Flex, Spacer } from '@workspace/ui';
import type * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const JUSTIFY_VALUES = ['flex-start', 'center', 'flex-end', 'space-between'] as const;

/** A tinted block that stands in for content. */
function Block({ style, ...props }: React.ComponentProps<typeof Box>): React.JSX.Element {
  return (
    <Box
      radius="sm"
      surface="muted"
      border="thin"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '2.5rem',
        height: '2.5rem',
        fontSize: '0.75rem',
        ...style,
      }}
      {...props}
    />
  );
}

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'column', 'row-reverse', 'column-reverse'] },
    align: { control: 'select', options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'] },
    justify: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
    },
    wrap: { control: 'inline-radio', options: ['nowrap', 'wrap', 'wrap-reverse'] },
    gap: { control: 'select', options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    inline: { control: 'boolean' },
  },
  parameters: { storyWidth: 'lg' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { gap: 'md' },
  render: (args) => (
    <Flex {...args}>
      <Block style={{ flex: 1 }} />
      <Block style={{ flex: 1 }} />
      <Block style={{ flex: 1 }} />
    </Flex>
  ),
};

export const Direction: Story = {
  parameters: {
    docs: { description: { story: 'Use the `direction` prop to change the main axis of the flex.' } },
  },
  render: () => (
    <Flex gap="md" direction="column">
      <Block />
      <Block />
      <Block />
    </Flex>
  ),
};

export const Align: Story = {
  parameters: {
    docs: { description: { story: 'Use the `align` prop to align the children along the cross axis.' } },
  },
  render: () => (
    <Flex gap="md" align="center">
      <Block style={{ height: '1rem' }} />
      <Block style={{ height: '2rem' }} />
      <Block style={{ height: '2.5rem' }} />
    </Flex>
  ),
};

export const Justify: Story = {
  parameters: {
    docs: { description: { story: 'Use the `justify` prop to align the children along the main axis.' } },
  },
  render: () => (
    <Flex direction="column" gap="xl">
      {JUSTIFY_VALUES.map((justify) => (
        <Flex key={justify} gap="md" justify={justify}>
          <Block style={{ width: '5rem' }} />
          <Block style={{ width: '5rem' }}>{justify === 'space-between' ? 'between' : justify.replace('flex-', '')}</Block>
          <Block style={{ width: '5rem' }} />
        </Flex>
      ))}
    </Flex>
  ),
};

export const Order: Story = {
  parameters: {
    docs: { description: { story: 'Set `order` on a child to change where it sits in the flex.' } },
  },
  render: () => (
    <Flex gap="md">
      <Block style={{ order: 1 }}>1</Block>
      <Block style={{ order: 3 }}>2</Block>
      <Block style={{ order: 2 }}>3</Block>
    </Flex>
  ),
};

export const AutoMargin: Story = {
  parameters: {
    docs: { description: { story: 'An auto margin on a flex item pushes it away from its siblings.' } },
  },
  render: () => (
    <Flex gap="md" justify="space-between">
      <Block style={{ width: '6rem' }} />
      <Block style={{ width: '6rem', marginInlineEnd: 'auto' }} />
      <Block style={{ width: '6rem' }} />
    </Flex>
  ),
};

export const WithSpacer: Story = {
  parameters: {
    docs: {
      description: {
        story: '`Spacer` grows to fill the space that is left, pushing the items to opposite ends.',
      },
    },
  },
  render: () => (
    <Flex>
      <Block style={{ padding: '0 1rem' }}>Box 1</Block>
      <Spacer />
      <Block style={{ padding: '0 1rem' }}>Box 2</Block>
    </Flex>
  ),
};

export const Wrap: Story = {
  parameters: {
    docs: { description: { story: 'Use the `wrap` prop to wrap the children when they overflow the parent.' } },
  },
  render: () => (
    <Flex gap="md" wrap="wrap" style={{ maxWidth: '31rem' }}>
      <Block style={{ width: '12.5rem' }} />
      <Block style={{ width: '12.5rem' }} />
      <Block style={{ width: '12.5rem' }} />
    </Flex>
  ),
};
