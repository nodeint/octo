import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack } from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const GAPS = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

function Block({ children }: { children?: React.ReactNode }): React.JSX.Element {
  return (
    <Box
      radius="sm"
      surface="muted"
      border="thin"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2rem', fontSize: '0.75rem' }}
    >
      {children}
    </Box>
  );
}

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    gap: { control: 'select', options: GAPS },
    surface: { control: 'select', options: [undefined, 'background', 'card', 'muted', 'accent'] },
    radius: { control: 'select', options: [undefined, 'xs', 'sm', 'md', 'lg'] },
    border: { control: 'inline-radio', options: [undefined, 'thin', 'thick'] },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { gap: 'sm' },
  render: (args) => (
    <Stack {...args}>
      <Block>1</Block>
      <Block>2</Block>
      <Block>3</Block>
    </Stack>
  ),
};

export const Gaps: Story = {
  parameters: { storyWidth: 'lg' },
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
      {GAPS.map((gap) => (
        <Stack key={gap} gap={gap} style={{ flex: 1 }}>
          <Block>{gap}</Block>
          <Block />
          <Block />
        </Stack>
      ))}
    </div>
  ),
};

export const Nested: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack gap="xs">
        <Block>a</Block>
        <Block>b</Block>
      </Stack>
      <Stack gap="xs">
        <Block>c</Block>
        <Block>d</Block>
      </Stack>
    </Stack>
  ),
};
