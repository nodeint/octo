import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator, Stack, Text } from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Layout/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

function Intro({ title, subtitle, description }: { title: string; subtitle: string; description: string }) {
  return (
    <Stack gap="md">
      <Stack gap="xxs">
        <Text variant="label">{title}</Text>
        <Text variant="description">{subtitle}</Text>
      </Stack>
      <Separator />
      <Text>{description}</Text>
    </Stack>
  );
}

export const Demo: Story = {
  render: () => (
    <Intro
      title="shadcn/ui"
      subtitle="The Foundation for your Design System"
      description="A set of beautifully designed components that you can customize, extend, and build on."
    />
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', height: '1.25rem', alignItems: 'center', gap: '1rem' }}>
      <Text>Blog</Text>
      <Separator orientation="vertical" />
      <Text>Docs</Text>
      <Separator orientation="vertical" />
      <Text>Source</Text>
    </div>
  ),
};

export const Menu: Story = {
  parameters: { storyWidth: 'lg' },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {[
        ['Settings', 'Manage preferences'],
        ['Account', 'Profile & security'],
        ['Help', 'Support & docs'],
      ].map(([title, subtitle], index) => (
        <div key={title} style={{ display: 'contents' }}>
          {index > 0 ? <Separator orientation="vertical" style={{ alignSelf: 'stretch', height: 'auto' }} /> : null}
          <Stack gap="xxs">
            <Text variant="label">{title}</Text>
            <Text variant="caption">{subtitle}</Text>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <Stack>
      {['1', '2', '3'].map((n, index) => (
        <div key={n} style={{ display: 'contents' }}>
          {index > 0 ? <Separator /> : null}
          <dl style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
            <Text>Item {n}</Text>
            <Text variant="description">Value {n}</Text>
          </dl>
        </div>
      ))}
    </Stack>
  ),
};

export const Rtl: Story = {
  render: () => (
    <div dir="rtl">
      <Intro
        title="shadcn/ui"
        subtitle="الأساس لنظام التصميم الخاص بك"
        description="مجموعة من المكونات المصممة بشكل جميل يمكنك تخصيصها وتوسيعها والبناء عليها."
      />
    </div>
  ),
};
