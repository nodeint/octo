import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Field,
  FieldDescription,
  FieldLabel,
  Icon,
  Stack,
  Toggle,
  ToggleGroup,
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
    variant: { control: 'inline-radio', options: ['ghost', 'outline', 'secondary'] },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { variant: 'outline', multiple: true },
  render: (args) => (
    <ToggleGroup {...args}>
      {FORMATS.map((format) => (
        <Toggle key={format.value} value={format.value} shape="icon" aria-label={`Toggle ${format.value}`}>
          <Icon name={format.icon} />
        </Toggle>
      ))}
    </ToggleGroup>
  ),
};

export const Variants: Story = {
  args: { multiple: true, defaultValue: ['bold', 'italic'] },
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'A `variant` on the group sets the fill, text and border of the toggles inside, as ButtonGroup does. Focus, invalid and disabled paint stay with the toggle. The last toggle is disabled.',
      },
    },
  },
  render: (args) => (
    <Stack gap="md">
      {(['ghost', 'outline', 'secondary'] as const).map((variant) => (
        <ToggleGroup key={variant} {...args} variant={variant}>
          {FORMATS.map((format) => (
            <Toggle key={format.value} value={format.value} shape="icon" aria-label={`${variant} ${format.value}`}>
              <Icon name={format.icon} />
            </Toggle>
          ))}
          <Toggle value="disabled" shape="icon" aria-label={`${variant} disabled`} disabled>
            <Icon name="check" />
          </Toggle>
        </ToggleGroup>
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  args: { variant: 'outline', defaultValue: ['top'] },
  render: (args) => (
    <Stack>
      <ToggleGroup {...args} size="sm">
        {SIDES.map((side) => (
          <Toggle key={side.value} value={side.value} aria-label={`Toggle ${side.value}`}>
            {side.label}
          </Toggle>
        ))}
      </ToggleGroup>
      <ToggleGroup {...args} size="md">
        {SIDES.map((side) => (
          <Toggle key={side.value} value={side.value} aria-label={`Toggle ${side.value}`}>
            {side.label}
          </Toggle>
        ))}
      </ToggleGroup>
    </Stack>
  ),
};

export const Vertical: Story = {
  args: {
    multiple: true,
    orientation: 'vertical',
    defaultValue: ['bold', 'italic'],
  },
  render: (args) => (
    <ToggleGroup {...args}>
      {FORMATS.map((format) => (
        <Toggle key={format.value} value={format.value} shape="icon" aria-label={`Toggle ${format.value}`}>
          <Icon name={format.icon} />
        </Toggle>
      ))}
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <ToggleGroup {...args}>
      {FORMATS.map((format) => (
        <Toggle key={format.value} value={format.value} shape="icon" aria-label={`Toggle ${format.value}`}>
          <Icon name={format.icon} />
        </Toggle>
      ))}
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
          <Toggle
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
            <span style={{ fontSize: '0.75rem', color: 'var(--variant-fg-subtle)' }}>{item.label}</span>
          </Toggle>
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
        <Toggle key={view.value} value={view.value} aria-label={view.label}>
          {view.label}
        </Toggle>
      ))}
    </ToggleGroup>
  ),
};
