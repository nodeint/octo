import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Inset, Text } from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const SIDES = ['0', ...SIZES] as const;

function Frame({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <Box surface="muted" border="thin" radius="sm">
      <Box surface="card" radius="sm">
        {children}
      </Box>
    </Box>
  );
}

const meta = {
  title: 'Layout/Inset',
  component: Inset,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: [undefined, ...SIZES] },
    x: { control: 'select', options: [undefined, ...SIDES] },
    y: { control: 'select', options: [undefined, ...SIDES] },
    t: { control: 'select', options: [undefined, ...SIDES] },
    b: { control: 'select', options: [undefined, ...SIDES] },
    s: { control: 'select', options: [undefined, ...SIDES] },
    e: { control: 'select', options: [undefined, ...SIDES] },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Inset>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { size: 'md' },
  render: (args) => (
    <Frame>
      <Inset {...args}><Text>Padded content</Text></Inset>
    </Frame>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {SIZES.map((size) => (
        <Frame key={size}>
          <Inset size={size}><Text variant="label">{size}</Text></Inset>
        </Frame>
      ))}
    </div>
  ),
};

export const Axes: Story = {
  parameters: { docs: { description: { story: '`x` and `y` set an axis and win over `size`.' } } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Frame><Inset x="xl" y="xs"><Text>x="xl" y="xs"</Text></Inset></Frame>
      <Frame><Inset x="xs" y="xl"><Text>x="xs" y="xl"</Text></Inset></Frame>
    </div>
  ),
};

export const Sides: Story = {
  parameters: {
    docs: { description: { story: 'A side (`t`, `b`, `s`, `e`) wins over its axis and `size`; `0` clears it.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Frame><Inset size="lg" t="0"><Text>size="lg" t="0"</Text></Inset></Frame>
      <Frame><Inset size="sm" s="xl"><Text>size="sm" s="xl"</Text></Inset></Frame>
      <Frame><Inset y="md" e="xl"><Text>y="md" e="xl"</Text></Inset></Frame>
    </div>
  ),
};
