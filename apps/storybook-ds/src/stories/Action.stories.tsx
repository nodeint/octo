import type { Meta, StoryObj } from '@storybook/react-vite';
import { Action, Box, Stack } from '@workspace/ds/components';
import { expect, fn, userEvent } from 'storybook/test';

const VARIANTS = ['primary', 'secondary', 'destructive', 'outline', 'plain', 'subtle', 'success', 'warning', 'info'] as const;
const TONES = ['base', 'primary', 'destructive', 'success', 'warning', 'info'] as const;
const EMPHASES = ['solid', 'soft', 'outline', 'ghost', 'ghost-subtle'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg'] as const;

function PlusIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

const meta = {
  title: 'Components/Action',
  component: Action,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: [undefined, ...VARIANTS] },
    tone: { control: 'select', options: [undefined, ...TONES] },
    emphasis: { control: 'select', options: [undefined, ...EMPHASES] },
    size: { control: 'inline-radio', options: SIZES },
    shape: { control: 'inline-radio', options: ['default', 'icon'] },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'A native `<button type="button">` styled only by the `action` recipe. Hover and active come from the recipe;',
          'check them in the browser, they are not screenshot-tested.',
          '',
          'Accessibility contract:',
          '',
          '- Content is phrasing content (text, an inline svg) with no interactive descendants.',
          '- An icon-only action (`shape="icon"`) needs `aria-label`.',
          '- A toggle-style action sets `aria-pressed`.',
          '- It is `type="button"` by default, so it never submits a form by accident.',
          '- Disable it with native `disabled`. `aria-disabled` only paints the disabled state; it does not stop',
          '  Enter or Space from running `onClick`.',
          '',
          'An `xs` action keeps body-size text; set the type step with your own class if needed.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Action>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { children: 'Action', size: 'md', shape: 'default' },
};

export const Paint: Story = {
  render: () => (
    <Stack orientation="horizontal" wrap gap="sm">
      {VARIANTS.map((variant) => <Action key={variant} variant={variant}>{variant}</Action>)}
    </Stack>
  ),
};

export const ToneAndEmphasis: Story = {
  parameters: {
    docs: { description: { story: 'The swatch tones (orange, blue, ...) take the same emphases.' } },
  },
  render: () => (
    <Stack gap="sm">
      {TONES.map((tone) => (
        <Stack key={tone} orientation="horizontal" wrap gap="sm">
          {EMPHASES.map((emphasis) => (
            <Action key={emphasis} tone={tone} emphasis={emphasis}>{tone} {emphasis}</Action>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="sm">
      <Stack orientation="horizontal" align="center" gap="sm">
        {SIZES.map((size) => <Action key={size} size={size}>{size}</Action>)}
      </Stack>
      <Stack orientation="horizontal" align="center" gap="sm">
        {SIZES.map((size) => <Action key={size} size={size}><PlusIcon />{size}</Action>)}
      </Stack>
      <Stack orientation="horizontal" align="center" gap="sm">
        {SIZES.map((size) => (
          <Action key={size} size={size} shape="icon" aria-label={`Add ${size}`}><PlusIcon /></Action>
        ))}
      </Stack>
    </Stack>
  ),
};

export const States: Story = {
  render: () => (
    <Stack orientation="horizontal" wrap gap="sm">
      <Action>Rest</Action>
      <Action disabled>Disabled</Action>
      <Action variant="outline" aria-pressed="true">Pressed</Action>
      <Action variant="outline" aria-invalid="true">Invalid</Action>
      <Action variant="outline" disabled>Disabled outline</Action>
    </Stack>
  ),
};

export const DisabledBlocksActivation: Story = {
  args: { onClick: fn() },
  render: (args) => <Action {...args} disabled>Disabled</Action>,
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: 'Disabled' });
    // The recipe sets pointer-events: none on a disabled action; skip that check to still dispatch the click.
    await userEvent.setup({ pointerEventsCheck: 0 }).click(button);
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onClick).not.toHaveBeenCalled();
    await expect(button).not.toHaveFocus();
  },
};

export const FocusVisible: Story = {
  render: () => <Action variant="outline">Focused</Action>,
  play: async ({ canvas }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Focused' })).toHaveFocus();
  },
};

export const Composition: Story = {
  parameters: { storyWidth: 'lg' },
  render: () => (
    <Stack gap="md">
      <Stack orientation="horizontal" gap="sm">
        <Action>Save</Action>
        <Action variant="outline">Cancel</Action>
        <Action variant="plain">Skip</Action>
      </Stack>
      <Box p="md" bordered radius="md">
        <p>Card content</p>
        <Stack orientation="horizontal" gap="sm" style={{ justifyContent: 'flex-end' }}>
          <Action variant="outline">Back</Action>
          <Action>Next</Action>
        </Stack>
      </Box>
      <Stack orientation="horizontal" align="center" gap="sm">
        <Action shape="icon" variant="outline" aria-label="Add"><PlusIcon /></Action>
        <Action variant="secondary"><PlusIcon />Add item</Action>
      </Stack>
    </Stack>
  ),
};
