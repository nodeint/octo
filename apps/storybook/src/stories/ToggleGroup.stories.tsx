import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Field,
  FieldDescription,
  FieldLabel,
  Icon,
  Stack,
  ToggleGroup,
  ToggleGroupItem,
} from '@workspace/ui';
import * as React from 'react';

const SIDES = [
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
] as const;

/*
 * The icon catalog has no bold, italic or underline glyph, so these stories use the closest names
 * it does have: pencil for bold, type for italic, minus for underline.
 */
const FORMATS = [
  { value: 'bold', label: 'Bold', icon: 'pencil' },
  { value: 'italic', label: 'Italic', icon: 'type' },
  { value: 'underline', label: 'Underline', icon: 'minus' },
] as const;

const FONT_WEIGHTS = [
  { value: 'light', label: 'Light', weight: 300 },
  { value: 'normal', label: 'Normal', weight: 400 },
  { value: 'medium', label: 'Medium', weight: 500 },
  { value: 'bold', label: 'Bold', weight: 700 },
] as const;

const RTL_VIEWS = [
  { value: 'list', label: 'قائمة' },
  { value: 'grid', label: 'شبكة' },
  { value: 'cards', label: 'بطاقات' },
] as const;

const meta = {
  title: 'Form/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['ghost', 'outline'] },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['default', 'icon'] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

function FormatItems(): React.JSX.Element {
  return (
    <>
      {FORMATS.map((format) => (
        <ToggleGroupItem key={format.value} value={format.value} aria-label={`Toggle ${format.value}`}>
          <Icon name={format.icon} />
        </ToggleGroupItem>
      ))}
    </>
  );
}

function SideItems(): React.JSX.Element {
  return (
    <>
      {SIDES.map((side) => (
        <ToggleGroupItem key={side.value} value={side.value} aria-label={`Toggle ${side.value}`}>
          {side.label}
        </ToggleGroupItem>
      ))}
    </>
  );
}

export const Demo: Story = {
  args: { variant: 'outline', multiple: true },
  render: (args) => (
    <ToggleGroup {...args}>
      <FormatItems />
    </ToggleGroup>
  ),
};

export const Outline: Story = {
  args: { variant: 'outline', defaultValue: ['all'] },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="all" aria-label="Toggle all">
        All
      </ToggleGroupItem>
      <ToggleGroupItem value="missed" aria-label="Toggle missed">
        Missed
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Sizes: Story = {
  args: { variant: 'outline', defaultValue: ['top'] },
  render: (args) => (
    <Stack>
      <ToggleGroup {...args} size="sm">
        <SideItems />
      </ToggleGroup>
      <ToggleGroup {...args} size="md">
        <SideItems />
      </ToggleGroup>
    </Stack>
  ),
};

export const Spacing: Story = {
  args: { variant: 'outline', size: 'sm', defaultValue: ['top'], style: { gap: '0.5rem' } },
  render: (args) => (
    <ToggleGroup {...args}>
      <SideItems />
    </ToggleGroup>
  ),
};

export const Vertical: Story = {
  args: {
    multiple: true,
    orientation: 'vertical',
    defaultValue: ['bold', 'italic'],
    style: { gap: '0.25rem' },
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <FormatItems />
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <ToggleGroup {...args}>
      <FormatItems />
    </ToggleGroup>
  ),
};

function FontWeightSelector(args: React.ComponentProps<typeof ToggleGroup>): React.JSX.Element {
  const [fontWeight, setFontWeight] = React.useState<string>('normal');

  return (
    <Field>
      <FieldLabel>Font Weight</FieldLabel>
      <ToggleGroup
        {...args}
        value={[fontWeight]}
        onValueChange={(value) => {
          const [next] = value;

          if (next) {
            setFontWeight(next);
          }
        }}
      >
        {FONT_WEIGHTS.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            aria-label={item.label}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              width: '4rem',
              height: '4rem',
            }}
          >
            <span style={{ fontSize: '1.5rem', lineHeight: 1, fontWeight: item.weight }}>Aa</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--role-caption-color)' }}>{item.label}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <FieldDescription>
        Use <code>font-{fontWeight}</code> to set the font weight.
      </FieldDescription>
    </Field>
  );
}

export const Custom: Story = {
  args: { variant: 'outline', size: 'lg', style: { gap: '0.5rem' } },
  render: (args) => <FontWeightSelector {...args} />,
};

export const Rtl: Story = {
  name: 'RTL',
  args: { variant: 'outline', defaultValue: ['list'], dir: 'rtl' },
  render: (args) => (
    <ToggleGroup {...args}>
      {RTL_VIEWS.map((view) => (
        <ToggleGroupItem key={view.value} value={view.value} aria-label={view.label}>
          {view.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  ),
};
