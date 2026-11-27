import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack } from '@workspace/ds/components';

import { storyWidthDecorator } from '../story-width';

const ALIGNS = ['start', 'center', 'end'] as const;
const ORIENTATIONS = ['vertical', 'horizontal'] as const;
const GAPS = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const;

function Block(
  { children, width, height = '2rem' }: { children?: React.ReactNode; width?: string; height?: string },
): React.JSX.Element {
  return (
    <Box
      radius="sm"
      variant="secondary"
      bordered
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width, height, fontSize: '0.75rem' }}
    >
      {children}
    </Box>
  );
}

const meta = {
  title: 'Components/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ORIENTATIONS },
    gap: { control: 'select', options: GAPS },
    wrap: { control: 'boolean' },
    align: { control: 'inline-radio', options: [undefined, ...ALIGNS] },
    variant: {
      control: 'select',
      options: [undefined, 'primary', 'secondary', 'destructive', 'outline', 'plain', 'subtle', 'success', 'warning', 'info'],
    },
    radius: { control: 'select', options: [undefined, 'xs', 'sm', 'md', 'lg'] },
    bordered: { control: 'boolean' },
    borderWidth: { control: 'inline-radio', options: [undefined, '0', 'thin', 'thick'] },
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

export const Align: Story = {
  parameters: { storyWidth: 'lg' },
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
      {ALIGNS.map((align) => (
        <Stack key={align} align={align} style={{ flex: 1 }}>
          <Block width="4rem">{align}</Block>
          <Block width="6rem" />
          <Block width="2rem" />
        </Stack>
      ))}
    </div>
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

export const Horizontal: Story = {
  args: { orientation: 'horizontal', gap: 'sm' },
  render: (args) => (
    <Stack {...args}>
      <Block width="4rem">1</Block>
      <Block width="4rem">2</Block>
      <Block width="4rem">3</Block>
    </Stack>
  ),
};

export const HorizontalAlign: Story = {
  parameters: {
    docs: { description: { story: 'Children are centered on the cross axis unless `align` says otherwise.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {ALIGNS.map((align) => (
        <Stack key={align} orientation="horizontal" align={align}>
          <Block width="4rem" height="2rem">{align}</Block>
          <Block width="4rem" height="3.5rem" />
          <Block width="4rem" height="1.5rem" />
        </Stack>
      ))}
    </div>
  ),
};

export const HorizontalGaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {GAPS.map((gap) => (
        <Stack key={gap} orientation="horizontal" gap={gap}>
          <Block width="2.5rem">{gap}</Block>
          <Block width="2.5rem" />
          <Block width="2.5rem" />
        </Stack>
      ))}
    </div>
  ),
};

export const HorizontalWrapping: Story = {
  parameters: {
    docs: { description: { story: 'Children wrap onto the next line when they do not fit the width. Set `wrap` to allow it.' } },
  },
  render: () => (
    <Stack orientation="horizontal" wrap>
      {Array.from({ length: 6 }, (_, i) => (
        <Block key={i} width="7rem">{i + 1}</Block>
      ))}
    </Stack>
  ),
};

export const MixedOrientation: Story = {
  render: () => (
    <Stack gap="md">
      <Stack orientation="horizontal" gap="xs">
        <Block width="4rem">a</Block>
        <Block width="4rem">b</Block>
      </Stack>
      <Stack orientation="horizontal" gap="xs">
        <Block width="4rem">c</Block>
        <Block width="4rem">d</Block>
      </Stack>
    </Stack>
  ),
};
