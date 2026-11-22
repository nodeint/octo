import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Grid, GRID_COLUMN_COUNTS } from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

function Cell({ children }: { children?: React.ReactNode }): React.JSX.Element {
  return (
    <Box
      radius="sm"
      surface="muted"
      border="thin"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '2.5rem', fontSize: '0.75rem' }}
    >
      {children}
    </Box>
  );
}

const { two, three, four, five, six } = GRID_COLUMN_COUNTS;
const COLUMN_OPTIONS = [1, two, three, four, five, six] as const;
const SIX = six;
const THREE = three;
const EIGHT = 8;
const COLUMN_EXAMPLES = [two, three, four, six] as const;

function cells(count: number): React.JSX.Element[] {
  return Array.from({ length: count }, (_, i) => <Cell key={i}>{i + 1}</Cell>);
}

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'select', options: COLUMN_OPTIONS },
    gap: { control: 'select', options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] },
  },
  parameters: { storyWidth: 'lg' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Grid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { columns: THREE, gap: 'sm' },
  render: (args) => <Grid {...args}>{cells(SIX)}</Grid>,
};

export const Columns: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {COLUMN_EXAMPLES.map((columns) => (
        <Grid key={columns} columns={columns}>
          {cells(columns)}
        </Grid>
      ))}
    </div>
  ),
};

export const Responsive: Story = {
  parameters: {
    docs: { description: { story: 'Pass an object to set a column count per breakpoint (`base`, `sm`, `md`, `lg`).' } },
  },
  render: () => <Grid columns={{ base: 1, sm: 2, md: THREE, lg: 4 }}>{cells(EIGHT)}</Grid>,
};

export const Gaps: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {(['xs', 'md', 'xl'] as const).map((gap) => (
        <Grid key={gap} columns={THREE} gap={gap}>
          {cells(THREE)}
        </Grid>
      ))}
    </div>
  ),
};
