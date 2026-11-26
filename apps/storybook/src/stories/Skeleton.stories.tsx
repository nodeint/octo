import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SkeletonSize } from '@workspace/ui';
import { Card, CardContent, CardHeader, CardHeaderContent, Inline, Skeleton, Stack } from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/skeleton:
 * - Shapes use inline `style` (width, height, border radius) because stories do not use Tailwind classes.
 * - The Form story uses `size` for the input heights.
 * - The RTL story uses a `dir="rtl"` wrapper instead of the shadcn translation helper.
 */

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const satisfies readonly SkeletonSize[];

const meta = {
  title: 'Data Display/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: SIZES },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

const ROUND = { borderRadius: '9999px' } as const;

function Lines() {
  return (
    <Stack gap="sm">
      <Skeleton style={{ height: '1rem', width: '15rem' }} />
      <Skeleton style={{ height: '1rem', width: '12rem' }} />
    </Stack>
  );
}

export const Demo: Story = {
  render: () => (
    <Inline gap="md">
      <Skeleton style={{ ...ROUND, height: '3rem', width: '3rem', flexShrink: 0 }} />
      <Lines />
    </Inline>
  ),
};

export const Avatar: Story = {
  render: () => (
    <Inline gap="md">
      <Skeleton style={{ ...ROUND, height: '2.5rem', width: '2.5rem', flexShrink: 0 }} />
      <Stack gap="sm">
        <Skeleton style={{ height: '1rem', width: '9.5rem' }} />
        <Skeleton style={{ height: '1rem', width: '6.5rem' }} />
      </Stack>
    </Inline>
  ),
};

export const CardStory: Story = {
  name: 'Card',
  render: () => (
    <Card>
      <CardHeader>
        <CardHeaderContent>
          <Skeleton style={{ height: '1rem', width: '66%' }} />
          <Skeleton style={{ height: '1rem', width: '50%' }} />
        </CardHeaderContent>
      </CardHeader>
      <CardContent>
        <Skeleton style={{ aspectRatio: '16 / 9', width: '100%' }} />
      </CardContent>
    </Card>
  ),
};

export const Text: Story = {
  render: () => (
    <Stack gap="sm">
      <Skeleton style={{ height: '1rem', width: '100%' }} />
      <Skeleton style={{ height: '1rem', width: '100%' }} />
      <Skeleton style={{ height: '1rem', width: '75%' }} />
    </Stack>
  ),
};

export const Form: Story = {
  render: () => (
    <Stack gap="xl">
      <Stack gap="md">
        <Skeleton style={{ height: '1rem', width: '5rem' }} />
        <Skeleton size="md" />
      </Stack>
      <Stack gap="md">
        <Skeleton style={{ height: '1rem', width: '6rem' }} />
        <Skeleton size="md" />
      </Stack>
      <Skeleton size="md" style={{ width: '6rem' }} />
    </Stack>
  ),
};

export const Table: Story = {
  render: () => (
    <Stack gap="sm">
      {Array.from({ length: 5 }, (_, row) => (
        <Inline key={row} gap="md">
          <Skeleton style={{ height: '1rem', flex: 1 }} />
          <Skeleton style={{ height: '1rem', width: '6rem' }} />
          <Skeleton style={{ height: '1rem', width: '5rem' }} />
        </Inline>
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="sm">
      {SIZES.map((size) => (
        <Skeleton key={size} size={size} />
      ))}
    </Stack>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: () => (
    <div dir="rtl">
      <Inline gap="md">
        <Skeleton style={{ ...ROUND, height: '3rem', width: '3rem', flexShrink: 0 }} />
        <Lines />
      </Inline>
    </div>
  ),
};
