import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Stack, Text } from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Layout/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    radius: { control: 'select', options: [undefined, 'xs', 'sm', 'md', 'lg'] },
    surface: { control: 'select', options: [undefined, 'background', 'card', 'muted', 'popover', 'sidebar', 'accent'] },
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
  args: { radius: 'md', surface: 'card', border: 'thin', shadow: 'sm' },
  render: (args) => (
    <Box {...args} style={{ padding: '1rem' }}>
      <Text>A box with a surface, border, radius and shadow.</Text>
    </Box>
  ),
};

export const Surfaces: Story = {
  render: () => (
    <Stack>
      {(['background', 'card', 'muted', 'popover', 'sidebar', 'accent'] as const).map((surface) => (
        <Box key={surface} surface={surface} border="thin" radius="sm" style={{ padding: '0.5rem 1rem' }}>
          <Text variant="label">{surface}</Text>
        </Box>
      ))}
    </Stack>
  ),
};

export const Radius: Story = {
  render: () => (
    <Stack>
      {(['xs', 'sm', 'md', 'lg'] as const).map((radius) => (
        <Box key={radius} radius={radius} surface="muted" border="thin" style={{ padding: '0.5rem 1rem' }}>
          <Text variant="label">{radius}</Text>
        </Box>
      ))}
    </Stack>
  ),
};

export const Shadows: Story = {
  render: () => (
    <Stack gap="lg">
      {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
        <Box key={shadow} shadow={shadow} radius="md" surface="card" style={{ padding: '0.5rem 1rem' }}>
          <Text variant="label">{shadow}</Text>
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
        <Box key={n} surface="muted" radius="sm" style={{ padding: '0.5rem 1rem' }}>
          <Text>{n}</Text>
        </Box>
      ))}
    </Box>
  ),
};

export const BleedKeepingInset: Story = {
  args: { bleed: 'x', px: 'inset', surface: 'muted' },
  parameters: {
    docs: { description: { story: '`px="inset"` pads with the container `--inset`, so a bleeding box keeps its content aligned.' } },
  },
  render: (args) => (
    <Box
      border="thin"
      radius="md"
      style={{ padding: '1rem', ['--inset' as string]: '1rem' }}
    >
      <Stack>
        <Text>Content inside the padded container.</Text>
        <Box {...args}>
          <Text variant="label">Bleeds to the edge, text stays aligned</Text>
        </Box>
      </Stack>
    </Box>
  ),
};

export const Bleed: Story = {
  args: { bleed: 'x', surface: 'muted' },
  parameters: {
    docs: { description: { story: 'The container declares `--inset` with its padding; `bleed` cancels it.' } },
  },
  render: (args) => (
    <Box
      border="thin"
      radius="md"
      style={{ padding: '1rem', ['--inset' as string]: '1rem' }}
    >
      <Stack>
        <Text>Content inside the padded container.</Text>
        <Box {...args} style={{ padding: '0.5rem 1rem' }}>
          <Text variant="label">Bleeds to the container edge</Text>
        </Box>
      </Stack>
    </Box>
  ),
};

export const WithPadding: Story = {
  render: () => (
    <Box surface="card" border="thin" radius="md">
      <Box p="lg">
        <Text>Padding comes from the p prop.</Text>
      </Box>
    </Box>
  ),
};
