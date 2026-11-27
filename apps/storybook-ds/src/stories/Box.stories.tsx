import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack } from '@workspace/ds/components';

import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    radius: { control: 'select', options: [undefined, 'xs', 'sm', 'md', 'lg'] },
    border: { control: 'inline-radio', options: [undefined, 'thin', 'thick'] },
    shadow: { control: 'inline-radio', options: [undefined, 'none', 'sm', 'md', 'lg'] },
    gap: { control: 'select', options: [undefined, 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
    bleed: { control: 'inline-radio', options: [undefined, 'x', 'y', 'all', 'top', 'bottom', 'start', 'end'] },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { radius: 'md', border: 'thin', shadow: 'sm' },
  render: (args) => (
    <Box {...args} p="md">
      <span>A box with a surface, border, radius and shadow.</span>
    </Box>
  ),
};

export const Variants: Story = {
  parameters: {
    docs: { description: { story: '`variant` picks one approved pair of tone and emphasis, as on Badge.' } },
  },
  render: () => (
    <Stack>
      {(['primary', 'secondary', 'destructive', 'outline', 'plain', 'subtle', 'success', 'warning', 'info'] as const).map(
        (variant) => (
          <Box key={variant} variant={variant} radius="md" style={{ padding: '0.5rem 1rem' }}>
            <span>{variant}</span>
          </Box>
        ),
      )}
    </Stack>
  ),
};

export const Radius: Story = {
  render: () => (
    <Stack>
      {(['xs', 'sm', 'md', 'lg'] as const).map((radius) => (
        <Box key={radius} radius={radius} bordered style={{ padding: '0.5rem 1rem' }}>
          <span>{radius}</span>
        </Box>
      ))}
    </Stack>
  ),
};

export const RadiusSides: Story = {
  parameters: {
    docs: {
      description: {
        story: '`radiusTop`, `radiusBottom`, `radiusStart` and `radiusEnd` round a side; `radiusTopStart`, `radiusTopEnd`, `radiusBottomStart` and `radiusBottomEnd` round one corner. A corner beats a side, a side beats `radius`; `0` squares it.',
      },
    },
  },
  render: () => (
    <Stack>
      <Box radiusTop="lg" variant="outline" style={{ padding: '0.5rem 1rem' }}><span>radiusTop="lg"</span></Box>
      <Box radiusBottom="lg" variant="outline" style={{ padding: '0.5rem 1rem' }}><span>radiusBottom="lg"</span></Box>
      <Box radiusStart="lg" variant="outline" style={{ padding: '0.5rem 1rem' }}><span>radiusStart="lg"</span></Box>
      <Box radiusEnd="lg" variant="outline" style={{ padding: '0.5rem 1rem' }}><span>radiusEnd="lg"</span></Box>
      <Box radiusTopStart="lg" radiusBottomEnd="lg" variant="outline" style={{ padding: '0.5rem 1rem' }}><span>radiusTopStart="lg" radiusBottomEnd="lg"</span></Box>
      <Box radius="lg" radiusTopStart="0" variant="outline" style={{ padding: '0.5rem 1rem' }}><span>radius="lg" radiusTopStart="0"</span></Box>
    </Stack>
  ),
};

export const BorderedSides: Story = {
  parameters: {
    docs: {
      description: {
        story: '`bordered` draws every edge; pass one side (`top`, `right`, `bottom` or `left`) to draw only that edge.',
      },
    },
  },
  render: () => (
    <Stack style={{ padding: '4px' }}>
      <Box bordered radius="md" style={{ padding: '0.5rem 1rem' }}><span>bordered</span></Box>
      <Box bordered="top" style={{ padding: '0.5rem 1rem' }}><span>bordered="top"</span></Box>
      <Box bordered="bottom" style={{ padding: '0.5rem 1rem' }}><span>bordered="bottom"</span></Box>
      <Box bordered="left" style={{ padding: '0.5rem 1rem' }}><span>bordered="left"</span></Box>
      <Box variant="outline" bordered="right" style={{ padding: '0.5rem 1rem' }}><span>outline + bordered="right"</span></Box>
    </Stack>
  ),
};

export const BorderStyle: Story = {
  parameters: {
    docs: {
      description: {
        story: '`borderWidth` takes `0`, `thin` or `thick`; `borderType` takes `solid`, `dashed` or `dotted` and applies to `bordered`.',
      },
    },
  },
  render: () => (
    <Stack>
      <Box bordered borderWidth="thick" radius="md" style={{ padding: '0.5rem 1rem' }}><span>thick</span></Box>
      <Box bordered borderType="dashed" radius="md" style={{ padding: '0.5rem 1rem' }}><span>dashed</span></Box>
      <Box bordered borderType="dotted" borderWidth="thick" radius="md" style={{ padding: '0.5rem 1rem' }}>
        <span>dotted thick</span>
      </Box>
      <Box bordered="bottom" borderType="dashed" style={{ padding: '0.5rem 1rem' }}><span>bottom dashed</span></Box>
      <Box variant="outline" borderWidth="thick" radius="md" style={{ padding: '0.5rem 1rem' }}>
        <span>outline thick</span>
      </Box>
    </Stack>
  ),
};

export const Shadows: Story = {
  render: () => (
    <Stack gap="lg">
      {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
        <Box key={shadow} shadow={shadow} radius="md" style={{ padding: '0.5rem 1rem' }}>
          <span>{shadow}</span>
        </Box>
      ))}
    </Stack>
  ),
};

export const Gap: Story = {
  args: { gap: 'lg' },
  render: (args) => (
    <Box {...args} style={{ display: 'flex', flexDirection: 'column' }}>
      {['One', 'Two', 'Three'].map((n) => (
        <Box key={n} radius="sm" style={{ padding: '0.5rem 1rem' }}>
          <span>{n}</span>
        </Box>
      ))}
    </Box>
  ),
};

export const BleedKeepingInset: Story = {
  args: { bleed: 'x', px: 'inset' },
  parameters: {
    docs: { description: { story: '`px="inset"` pads with the container `--inset`, so a bleeding box keeps its content aligned.' } },
  },
  render: (args) => (
    <Box
      bordered
      radius="md"
      style={{ padding: '1rem', ['--inset' as string]: '1rem' }}
    >
      <Stack>
        <span>Content inside the padded container.</span>
        <Box {...args}>
          <span>Bleeds to the edge, text stays aligned</span>
        </Box>
      </Stack>
    </Box>
  ),
};

export const Bleed: Story = {
  args: { bleed: 'x' },
  parameters: {
    docs: { description: { story: 'The container declares `--inset` with its padding; `bleed` cancels it.' } },
  },
  render: (args) => (
    <Box
      bordered
      radius="md"
      p="lg"
    >
      <Stack>
        <Box p="lg" emphasis='outline' tone="base" bordered>
          <span>Bleeds to the container edge</span>
        </Box>
        <Box {...args} p="inset">
          <span>Bleeds to the container edge</span>
        </Box>
      </Stack>
    </Box>
  ),
};

export const WithPadding: Story = {
  render: () => (
    <Box bordered radius="md">
      <Box p="lg">
        <span>Padding comes from the p prop.</span>
      </Box>
    </Box>
  ),
};
