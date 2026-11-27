import type { Meta, StoryObj } from '@storybook/react-vite';
import type { BadgeSize, BadgeVariant } from '@workspace/ui';
import { Badge, Icon, Spinner,Stack } from '@workspace/ui';

const VARIANTS = [
  'primary',
  'secondary',
  'destructive',
  'outline',
  'success',
  'warning',
  'info',
] as const satisfies readonly BadgeVariant[];

const SIZES = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly BadgeSize[];

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'inline-radio', options: SIZES },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * The icon catalog has no badge-check or bookmark glyph, so these stories use the closest names
 * it does have: shield-check for badge-check, star for bookmark.
 */

export const Demo: Story = {
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Stack orientation="horizontal">
      <Badge {...args}>Badge</Badge>
      <Badge {...args} variant="secondary">
        Secondary
      </Badge>
      <Badge {...args} variant="destructive">
        Destructive
      </Badge>
      <Badge {...args} variant="outline">
        Outline
      </Badge>
    </Stack>
  ),
};

export const Variants: Story = {
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Stack orientation="horizontal">
      <Badge {...args}>Default</Badge>
      <Badge {...args} variant="secondary">
        Secondary
      </Badge>
      <Badge {...args} variant="destructive">
        Destructive
      </Badge>
      <Badge {...args} variant="outline">
        Outline
      </Badge>
      <Badge {...args} variant="success">
        Success
      </Badge>
      <Badge {...args} variant="warning">
        Warning
      </Badge>
      <Badge {...args} variant="info">
        Info
      </Badge>
    </Stack>
  ),
};

export const WithIcon: Story = {
  name: 'With Icon',
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Stack orientation="horizontal">
      <Badge {...args} variant="secondary">
        <Icon name="shield-check" />
        Verified
      </Badge>
      <Badge {...args} variant="outline">
        Bookmark
        <Icon name="star" />
      </Badge>
    </Stack>
  ),
};

export const WithSpinner: Story = {
  name: 'With Spinner',
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Stack orientation="horizontal">
      <Badge {...args} variant="destructive">
        <Spinner />
        Deleting
      </Badge>
      <Badge {...args} variant="secondary">
        Generating
        <Spinner />
      </Badge>
    </Stack>
  ),
};

export const AsLink: Story = {
  name: 'Link',
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Badge {...args} render={<a href="#link" />}>
      Open Link
      <Icon name="external-link" />
    </Badge>
  ),
};

export const CustomColors: Story = {
  name: 'Custom Colors',
  render: ({ tone: _tone, emphasis: _emphasis, variant: _variant, ...args }) => (
    <Stack orientation="horizontal">
      <Badge {...args} tone="blue" emphasis="soft">
        Blue
      </Badge>
      <Badge {...args} tone="emerald" emphasis="soft">
        Emerald
      </Badge>
      <Badge {...args} tone="cyan" emphasis="soft">
        Cyan
      </Badge>
      <Badge {...args} tone="purple" emphasis="soft">
        Purple
      </Badge>
      <Badge {...args} tone="rose" emphasis="soft">
        Rose
      </Badge>
    </Stack>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Stack orientation="horizontal" dir="rtl">
      <Badge {...args}>شارة</Badge>
      <Badge {...args} variant="secondary">
        ثانوي
      </Badge>
      <Badge {...args} variant="destructive">
        مدمر
      </Badge>
      <Badge {...args} variant="outline">
        مخطط
      </Badge>
      <Badge {...args} variant="secondary">
        <Icon name="shield-check" />
        متحقق
      </Badge>
      <Badge {...args} variant="outline">
        إشارة مرجعية
        <Icon name="star" />
      </Badge>
    </Stack>
  ),
};
