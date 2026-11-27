import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActionLink, Stack } from '@workspace/ds/components';
import { expect, fn, userEvent, waitFor } from 'storybook/test';

const TONES = ['base', 'primary', 'destructive', 'success', 'warning', 'info'] as const;
const EMPHASES = ['ghost', 'ghost-subtle'] as const;
const UNDERLINES = ['none', 'hover', 'always'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg'] as const;

function PlusIcon(): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

const meta = {
  title: 'Components/ActionLink',
  component: ActionLink,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'select', options: TONES },
    emphasis: { control: 'inline-radio', options: EMPHASES },
    underline: { control: 'inline-radio', options: UNDERLINES },
    size: { control: 'inline-radio', options: SIZES },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'An `<a>` that shares `Action`\'s paint and size steps but never draws a border or a background.',
          'Pass `render` to swap in a router link.',
          '',
          'Accessibility contract:',
          '',
          '- Content is phrasing content with no interactive descendants.',
          '- An icon-only link needs `aria-label`.',
          '- Set `href` for navigation.',
          '- `aria-disabled="true"` only paints the disabled state and blocks the pointer. It does not stop',
          '  Enter from following the link.',
          '- It is meant for short labels: a sized link is `inline-flex`, so its label does not wrap.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof ActionLink>;

export default meta;

type Story = StoryObj<typeof meta>;

type BrowserPointer = typeof import('vitest/browser')['userEvent'];

/**
 * Real browser pointer actions (Playwright). Storybook's `userEvent` is synthetic and never matches `:hover`, `:active`
 * or `:focus-visible`. `vitest/browser` throws outside Vitest, so this returns `undefined` in the interactive
 * Storybook and the pointer-only checks are skipped there (the same `MODE` guard as `.storybook/preview.tsx`).
 */
async function browserPointer(): Promise<BrowserPointer | undefined> {
  if (import.meta.env.MODE !== 'test') return undefined;
  return (await import('vitest/browser')).userEvent;
}

/** The computed color of a paint slot (`--variant-fg-hover`, ...) as the element sees it. */
function slotColor(element: HTMLElement, slot: string): string {
  const probe = document.createElement('span');
  probe.style.color = getComputedStyle(element).getPropertyValue(slot);
  document.body.append(probe);
  const { color } = getComputedStyle(probe);
  probe.remove();
  return color;
}

function bg(element: HTMLElement): string {
  return getComputedStyle(element).backgroundColor;
}

async function expectNoFillNoBorder(element: HTMLElement): Promise<void> {
  const style = getComputedStyle(element);
  await expect(['rgba(0, 0, 0, 0)', 'transparent']).toContain(bg(element));
  for (const side of ['Top', 'Right', 'Bottom', 'Left'] as const) {
    await expect(style[`border${side}Width`]).toBe('0px');
  }
}

export const Demo: Story = {
  args: { children: 'Docs', href: '/docs' },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Docs' });
    await expect(link.tagName).toBe('A');
    await expect(link).toHaveAttribute('href', '/docs');
    await expect(link).toHaveAttribute('data-slot', 'action-link');
    await expect(link).toHaveAttribute('data-paint', 'primary-ghost');
  },
};

export const ToneAndEmphasis: Story = {
  render: () => (
    <Stack gap="sm">
      {TONES.map((tone) => (
        <Stack key={tone} orientation="horizontal" wrap gap="md">
          {EMPHASES.map((emphasis) => (
            <ActionLink key={emphasis} href="#" tone={tone} emphasis={emphasis}>{tone} {emphasis}</ActionLink>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

export const Underline: Story = {
  render: () => (
    <Stack orientation="horizontal" gap="md">
      {UNDERLINES.map((underline) => (
        <ActionLink key={underline} href="#" underline={underline}>{underline}</ActionLink>
      ))}
    </Stack>
  ),
};

export const UnderlineOnHover: Story = {
  args: { children: 'Hover me', href: '#', underline: 'hover' },
  play: async ({ canvas }) => {
    const pointer = await browserPointer();
    const link = canvas.getByRole('link', { name: 'Hover me' });
    await expect(getComputedStyle(link).textDecorationLine).toBe('none');
    await expect(getComputedStyle(link).textUnderlineOffset).toBe('4px');
    if (!pointer) return;
    await pointer.hover(link);
    await waitFor(() => expect(getComputedStyle(link).textDecorationLine).toBe('underline'));
    await pointer.unhover(link);
    await waitFor(() => expect(getComputedStyle(link).textDecorationLine).toBe('none'));
  },
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="sm">
      <Stack orientation="horizontal" align="center" gap="md">
        {SIZES.map((size) => <ActionLink key={size} href="#" size={size}>{size}</ActionLink>)}
      </Stack>
      <Stack orientation="horizontal" align="center" gap="md">
        {SIZES.map((size) => <ActionLink key={size} href="#" size={size}><PlusIcon />{size}</ActionLink>)}
      </Stack>
    </Stack>
  ),
  play: async ({ canvas }) => {
    for (const link of canvas.getAllByRole('link')) {
      const style = getComputedStyle(link);
      await expect(style.paddingLeft).toBe('0px');
      await expect(style.paddingRight).toBe('0px');
    }
  },
};

/** Hover and active with a real browser pointer: the text follows the paint slots and no fill or border appears. */
async function checkPointerStates(
  pointer: BrowserPointer,
  link: HTMLElement,
  shouldChangeOnHover: boolean,
): Promise<void> {
  const restColor = getComputedStyle(link).color;

  const hoverColor = slotColor(link, '--variant-fg-hover');
  await pointer.hover(link);
  await waitFor(() => expect(getComputedStyle(link).color).toBe(hoverColor));
  await expectNoFillNoBorder(link);
  if (shouldChangeOnHover) await expect(hoverColor).not.toBe(restColor);

  const activeColor = slotColor(link, '--variant-fg-active');
  await pointer.pointer({ target: link, keys: '[MouseLeft>]' });
  await waitFor(() => expect(getComputedStyle(link).color).toBe(activeColor));
  await expectNoFillNoBorder(link);
  await pointer.pointer({ keys: '[/MouseLeft]' });
  await pointer.unhover(link);
}

export const NoFillNoBorder: Story = {
  render: () => (
    <Stack orientation="horizontal" gap="md">
      <ActionLink href="#" emphasis="ghost" tone="primary" onClick={(event) => event.preventDefault()}>Ghost</ActionLink>
      <ActionLink href="#" emphasis="ghost-subtle" tone="base" onClick={(event) => event.preventDefault()}>Subtle</ActionLink>
      <ActionLink href="#" emphasis="ghost" aria-disabled="true">Disabled</ActionLink>
    </Stack>
  ),
  play: async ({ canvas }) => {
    for (const name of ['Ghost', 'Subtle']) {
      await expectNoFillNoBorder(canvas.getByRole('link', { name }));
    }
    const disabled = canvas.getByRole('link', { name: 'Disabled' });
    await expectNoFillNoBorder(disabled);
    await expect(getComputedStyle(disabled).color).toBe(slotColor(disabled, '--variant-fg-disabled'));

    const pointer = await browserPointer();
    if (!pointer) return;
    for (const name of ['Ghost', 'Subtle']) {
      await checkPointerStates(pointer, canvas.getByRole('link', { name }), name === 'Subtle');
    }
    // Keyboard focus on a link the pointer passes: a real Tab continues from the last clicked link.
    await pointer.tab();
    const focused = document.activeElement;
    await expect(focused).toBeInstanceOf(HTMLAnchorElement);
    if (focused instanceof HTMLElement) await expectNoFillNoBorder(focused);
  },
};

export const FocusVisible: Story = {
  render: () => <ActionLink href="#">Focused</ActionLink>,
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'Focused' });
    // A real Tab, so the browser matches :focus-visible. Outside Vitest there is none, so the check is skipped.
    const pointer = await browserPointer();
    if (!pointer) return;
    await pointer.tab();
    await expect(link).toHaveFocus();
    // box-shadow transitions in, so wait for the halo to appear.
    await waitFor(() => expect(getComputedStyle(link).boxShadow).not.toBe('none'));
    await expect(getComputedStyle(link).borderTopWidth).toBe('0px');
  },
};

export const DisabledBlocksPointer: Story = {
  args: { onClick: fn() },
  render: (args) => <ActionLink {...args} href="#" aria-disabled="true">Disabled</ActionLink>,
  play: async ({ canvas, args }) => {
    const link = canvas.getByRole('link', { name: 'Disabled' });
    await expect(getComputedStyle(link).pointerEvents).toBe('none');
    await expect(getComputedStyle(link).color).toBe(slotColor(link, '--variant-fg-disabled'));
    // user-event refuses to click an element with pointer-events: none, like a real pointer.
    await expect(userEvent.click(link)).rejects.toThrow(/pointer-events/);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

export const RenderSwap: Story = {
  render: () => (
    <ActionLink href="/x" render={<button type="button" />}>Swapped</ActionLink>
  ),
  play: async ({ canvas }) => {
    const element = canvas.getByText('Swapped');
    await expect(element.tagName).toBe('BUTTON');
    await expect(element).toHaveAttribute('href', '/x');
    await expect(element).toHaveAttribute('data-slot', 'action-link');
    await expect(element).toHaveAttribute('data-paint', 'primary-ghost');
  },
};
