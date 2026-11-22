import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Inline } from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const GAPS = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

function Block({ children, wide }: { children?: React.ReactNode; wide?: boolean }): React.JSX.Element {
  return (
    <Box
      radius="sm"
      surface="muted"
      border="thin"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: wide ? '7rem' : '2.5rem',
        height: '2rem',
        fontSize: '0.75rem',
      }}
    >
      {children}
    </Box>
  );
}

const meta = {
  title: 'Layout/Inline',
  component: Inline,
  tags: ['autodocs'],
  argTypes: {
    gap: { control: 'select', options: GAPS },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Inline>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { gap: 'sm' },
  render: (args) => (
    <Inline {...args}>
      <Block>1</Block>
      <Block>2</Block>
      <Block>3</Block>
    </Inline>
  ),
};

export const Gaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {GAPS.map((gap) => (
        <Inline key={gap} gap={gap}>
          <Block>{gap}</Block>
          <Block />
          <Block />
        </Inline>
      ))}
    </div>
  ),
};

export const Wrapping: Story = {
  parameters: {
    docs: { description: { story: 'Children wrap onto the next line when they do not fit the width.' } },
  },
  render: () => (
    <Inline>
      {Array.from({ length: 6 }, (_, i) => (
        <Block key={i} wide>{i + 1}</Block>
      ))}
    </Inline>
  ),
};
