import type { Meta, StoryObj } from '@storybook/react-vite';
import type { TextAlign, TextOverflow, TextRole } from '@workspace/ui';
import { Stack, Text } from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const VARIANTS = [
  'display',
  'title-lg',
  'title-md',
  'title-sm',
  'subtitle',
  'body-lg',
  'body',
  'body-sm',
  'label',
  'action',
  'action-sm',
  'label-sm',
  'description',
  'caption',
  'code',
  'field',
] as const satisfies readonly TextRole[];

const ALIGNS = ['start', 'center', 'end'] as const satisfies readonly TextAlign[];

const OVERFLOWS = [
  'truncate',
  'clamp-1',
  'clamp-2',
  'clamp-3',
  'break',
  'pre',
  'no-wrap',
] as const satisfies readonly TextOverflow[];

const LONG_TEXT =
  'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump.';

const meta = {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    align: { control: 'inline-radio', options: ALIGNS },
    overflow: { control: 'select', options: OVERFLOWS },
    italic: { control: 'boolean' },
    numeric: { control: 'boolean' },
    as: { control: 'select', options: ['span', 'p', 'h1', 'h2', 'label', 'code'] },
  },
  args: { children: 'The quick brown fox jumps over the lazy dog' },
  parameters: { storyWidth: 'lg' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = { args: { variant: 'body' } };

export const Variants: Story = {
  render: () => (
    <Stack gap="sm">
      {VARIANTS.map((variant) => (
        <Text key={variant} as="p" variant={variant}>
          {variant}
        </Text>
      ))}
    </Stack>
  ),
};

export const Align: Story = {
  render: () => (
    <Stack gap="sm">
      {ALIGNS.map((align) => (
        <Text key={align} as="p" align={align}>
          {align}
        </Text>
      ))}
    </Stack>
  ),
};

export const Overflow: Story = {
  render: () => (
    <Stack gap="md">
      {OVERFLOWS.map((overflow) => (
        <Text key={overflow} as="p" overflow={overflow}>
          {overflow}: {LONG_TEXT}
        </Text>
      ))}
    </Stack>
  ),
};

export const Italic: Story = { args: { italic: true } };

export const Numeric: Story = {
  render: () => (
    <Stack gap="xs">
      <Text as="p" numeric>1111.11</Text>
      <Text as="p" numeric>8888.88</Text>
    </Stack>
  ),
};
