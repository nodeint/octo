import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ToggleSize, ToggleVariant } from '@workspace/ui';
import { Icon, Inline, Toggle } from '@workspace/ui';

const VARIANTS = ['ghost', 'outline', 'swatch'] as const satisfies readonly ToggleVariant[];

const SIZES = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly ToggleSize[];

const meta = {
  title: 'Form/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS },
    size: { control: 'inline-radio', options: SIZES },
    shape: { control: 'inline-radio', options: ['default', 'icon'] },
    fillIcon: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * The icon catalog has no bookmark, italic or bold glyph, so these stories use the closest names
 * it does have: star for bookmark, type for italic, pencil for bold.
 */

export const Demo: Story = {
  args: { 'aria-label': 'Toggle bookmark', size: 'sm', variant: 'outline', fillIcon: true },
  render: (args) => (
    <Toggle {...args}>
      <Icon name="star" />
      Bookmark
    </Toggle>
  ),
};

export const Outline: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Inline>
      <Toggle {...args} aria-label="Toggle italic">
        <Icon name="type" />
        Italic
      </Toggle>
      <Toggle {...args} aria-label="Toggle bold">
        <Icon name="pencil" />
        Bold
      </Toggle>
    </Inline>
  ),
};

export const WithText: Story = {
  name: 'With Text',
  args: { 'aria-label': 'Toggle italic' },
  render: (args) => (
    <Toggle {...args}>
      <Icon name="type" />
      Italic
    </Toggle>
  ),
};

export const Sizes: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Inline>
      <Toggle {...args} aria-label="Toggle small" size="sm">
        Small
      </Toggle>
      <Toggle {...args} aria-label="Toggle default" size="md">
        Default
      </Toggle>
      <Toggle {...args} aria-label="Toggle large" size="lg">
        Large
      </Toggle>
    </Inline>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <Inline>
      <Toggle {...args} aria-label="Toggle disabled">
        Disabled
      </Toggle>
      <Toggle {...args} variant="outline" aria-label="Toggle disabled outline">
        Disabled
      </Toggle>
    </Inline>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  args: { 'aria-label': 'Toggle bookmark', size: 'sm', variant: 'outline', fillIcon: true, dir: 'rtl' },
  render: (args) => (
    <Toggle {...args}>
      <Icon name="star" />
      إشارة مرجعية
    </Toggle>
  ),
};
