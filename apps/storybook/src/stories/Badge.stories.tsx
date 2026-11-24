import type { Meta, StoryObj } from '@storybook/react-vite';
import type { BadgeSize, BadgeVariant } from '@workspace/ui';
import { Badge, Icon, Inline, Spinner } from '@workspace/ui';

const VARIANTS = [
  'default',
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
    <Inline>
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
    </Inline>
  ),
};

export const Variants: Story = {
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Inline>
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
    </Inline>
  ),
};

export const WithIcon: Story = {
  name: 'With Icon',
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Inline>
      <Badge {...args} variant="secondary">
        <Icon name="shield-check" />
        Verified
      </Badge>
      <Badge {...args} variant="outline">
        Bookmark
        <Icon name="star" />
      </Badge>
    </Inline>
  ),
};

export const WithSpinner: Story = {
  name: 'With Spinner',
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Inline>
      <Badge {...args} variant="destructive">
        <Spinner />
        Deleting
      </Badge>
      <Badge {...args} variant="secondary">
        Generating
        <Spinner />
      </Badge>
    </Inline>
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
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Inline>
      <Badge {...args} style={{ backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
        Blue
      </Badge>
      <Badge {...args} style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}>
        Green
      </Badge>
      <Badge {...args} style={{ backgroundColor: '#f0f9ff', color: '#0369a1' }}>
        Sky
      </Badge>
      <Badge {...args} style={{ backgroundColor: '#faf5ff', color: '#7e22ce' }}>
        Purple
      </Badge>
      <Badge {...args} style={{ backgroundColor: '#fef2f2', color: '#b91c1c' }}>
        Red
      </Badge>
    </Inline>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Inline dir="rtl">
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
    </Inline>
  ),
};
