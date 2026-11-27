import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack, Text, type TextRole } from '@workspace/ds/components';
import { expect } from 'storybook/test';

const ROLES = [
  'display', 'title-lg', 'title-md', 'title-sm', 'subtitle', 'body-lg', 'body', 'body-sm',
  'label', 'label-sm', 'action', 'action-sm', 'description', 'caption', 'code', 'field',
] as const satisfies readonly TextRole[];

const ROLE_GROUPS: readonly { name: string; roles: readonly TextRole[] }[] = [
  { name: 'Heading', roles: ['display', 'title-lg', 'title-md', 'title-sm', 'subtitle'] },
  { name: 'Body', roles: ['body-lg', 'body', 'body-sm'] },
  { name: 'Label and action', roles: ['label', 'label-sm', 'action', 'action-sm'] },
  { name: 'Support', roles: ['description', 'caption'] },
  { name: 'Code and field', roles: ['code', 'field'] },
];

const ALIGNS = ['start', 'center', 'end'] as const;
const OVERFLOWS = ['truncate', 'clamp-1', 'clamp-2', 'clamp-3', 'break', 'pre', 'no-wrap'] as const;

const LONG = 'The quick brown fox jumps over the lazy dog while the sun sets slowly behind the distant hills. '
  + 'Meanwhile the river keeps running past the old stone bridge, and the village bells ring out across the quiet '
  + 'valley as evening settles over the fields and the first stars appear in the darkening sky.';

const OVERFLOW_COPY: Partial<Record<(typeof OVERFLOWS)[number], string>> = {
  pre: 'First line\nSecond line\n  Indented third line',
  break: 'Averyveryveryveryverylongunbrokentokenthatdoesnotfitinthebox',
};

const CLAMP_LINES = 2;
const PRE_LINES = 3;
const LINE_TOLERANCE = 1;

const meta = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: [undefined, ...ROLES] },
    align: { control: 'inline-radio', options: [undefined, ...ALIGNS] },
    overflow: { control: 'select', options: [undefined, ...OVERFLOWS] },
    italic: { control: 'boolean' },
    numeric: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'Typography for one run of text. `variant` picks a type role (size, weight, leading, family and,',
          'for some roles, color).',
          '',
          '- Without `variant` the text inherits its font and color from the parent.',
          '- It renders a `span`; pass `render` (for example `render={<h1 />}`) to pick the element that fits the meaning.',
          '- `label-sm` is muted, `description` and `caption` are subtle; the other roles keep the inherited color.',
          '- The `overflow` modes need a bounded width: `truncate`, `clamp-*` and `no-wrap` have nothing to cut',
          '  in a box that grows with its text.',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The computed color of a CSS color value, resolved the way the browser paints it. */
function resolveColor(value: string): string {
  const probe = document.createElement('span');
  probe.style.color = value;
  document.body.append(probe);
  const { color } = getComputedStyle(probe);
  probe.remove();
  return color;
}

/** The computed size or weight that a `--role-*` token resolves to, measured on a probe in the same context. */
function resolveToken(element: HTMLElement, property: 'font-size' | 'font-weight', token: string): string {
  const probe = document.createElement('span');
  probe.style.setProperty(property, `var(${token})`);
  element.append(probe);
  const value = getComputedStyle(probe).getPropertyValue(property);
  probe.remove();
  return value;
}

export const Demo: Story = {
  args: { variant: 'body', children: 'Text sets the type role of a run of text.' },
  play: async ({ canvas }) => {
    const text = canvas.getByText('Text sets the type role of a run of text.');
    await expect(text.tagName).toBe('SPAN');
    await expect(text).toHaveAttribute('data-slot', 'text');
    await expect(text).toHaveClass('text');
    await expect(text).toHaveAttribute('data-variant', 'body');
  },
};

export const Roles: Story = {
  render: () => (
    <Stack gap="lg">
      {ROLE_GROUPS.map((group) => (
        <Stack key={group.name} gap="xs">
          <Text variant="label-sm">{group.name}</Text>
          {group.roles.map((role) => (
            <Text key={role} variant={role} data-testid={`role-${role}`}>{role}: Pack my box with five dozen liquor jugs</Text>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
  play: async ({ canvas }) => {
    for (const role of ROLES) {
      const text = canvas.getByTestId(`role-${role}`);
      const style = getComputedStyle(text);
      const sizeToken = role === 'field' && matchMedia('(pointer: coarse)').matches ? 'field-size-coarse' : `${role}-size`;
      await expect(style.fontSize).toBe(resolveToken(text, 'font-size', `--role-${sizeToken}`));
      await expect(style.fontWeight).toBe(resolveToken(text, 'font-weight', `--role-${role}-weight`));
    }
  },
};

const ELEMENTS = [
  ['h1', 'display'], ['h2', 'title-lg'], ['h3', 'title-md'], ['h4', 'title-sm'], ['h5', 'label'], ['h6', 'label-sm'],
  ['p', 'body'], ['label', 'label'], ['code', 'code'],
] as const;

export const SemanticElements: Story = {
  render: () => (
    <Stack gap="xs">
      <Text variant="display" render={<h1 data-testid="el-h1" />}>Heading one</Text>
      <Text variant="title-lg" render={<h2 data-testid="el-h2" />}>Heading two</Text>
      <Text variant="title-md" render={<h3 data-testid="el-h3" />}>Heading three</Text>
      <Text variant="title-sm" render={<h4 data-testid="el-h4" />}>Heading four</Text>
      <Text variant="label" render={<h5 data-testid="el-h5" />}>Heading five</Text>
      <Text variant="label-sm" render={<h6 data-testid="el-h6" />}>Heading six</Text>
      <Text variant="body" render={<p data-testid="el-p" />}>A paragraph of body text.</Text>
      <Text variant="label" render={<label data-testid="el-label" htmlFor="el-label-input" />}>A label</Text>
      <input id="el-label-input" style={{ border: '1px solid currentColor', borderRadius: '4px', padding: '0.25rem 0.5rem', width: '12rem' }} />
      <Text variant="code" render={<code data-testid="el-code" />}>const answer = 42;</Text>
    </Stack>
  ),
  play: async ({ canvas }) => {
    for (const [tag, variant] of ELEMENTS) {
      const element = canvas.getByTestId(`el-${tag}`);
      await expect(element.tagName).toBe(tag.toUpperCase());
      await expect(element).toHaveClass('text');
      await expect(element).toHaveAttribute('data-slot', 'text');
      await expect(element).toHaveAttribute('data-variant', variant);
    }
    await expect(canvas.getByLabelText('A label')).toHaveAttribute('id', 'el-label-input');
  },
};

export const Colors: Story = {
  render: () => (
    <Stack gap="xs">
      <Text variant="body" data-testid="color-body">Body inherits the parent color</Text>
      <Text variant="label-sm" data-testid="color-label-sm">Label small is muted</Text>
      <Text variant="description" data-testid="color-description">Description is subtle</Text>
      <Text variant="caption" data-testid="color-caption">Caption is subtle</Text>
    </Stack>
  ),
  play: async ({ canvas }) => {
    const slot = (id: string, name: string): string =>
      resolveColor(getComputedStyle(canvas.getByTestId(id)).getPropertyValue(name));
    const color = (id: string): string => getComputedStyle(canvas.getByTestId(id)).color;
    await expect(color('color-label-sm')).toBe(slot('color-label-sm', '--variant-fg-muted'));
    await expect(color('color-description')).toBe(slot('color-description', '--variant-fg-subtle'));
    await expect(color('color-caption')).toBe(slot('color-caption', '--variant-fg-subtle'));
    const parent = canvas.getByTestId('color-body').parentElement;
    await expect(parent).not.toBeNull();
    await expect(color('color-body')).toBe(parent ? getComputedStyle(parent).color : '');
  },
};

export const Inherit: Story = {
  render: () => (
    <div data-testid="inherit-parent" style={{ fontSize: '22px', color: 'rgb(200, 30, 60)' }}>
      <Text data-testid="inherit-text">Without a variant the text inherits</Text>
    </div>
  ),
  play: async ({ canvas }) => {
    const style = getComputedStyle(canvas.getByTestId('inherit-text'));
    await expect(style.fontSize).toBe('22px');
    await expect(style.color).toBe('rgb(200, 30, 60)');
  },
};

export const Align: Story = {
  render: () => (
    <Stack gap="md">
      {(['ltr', 'rtl'] as const).map((dir) => (
        <div key={dir} dir={dir} style={{ width: '16rem' }}>
          {ALIGNS.map((align) => (
            <Text key={align} align={align} render={<p data-testid={`align-${dir}-${align}`} />}>
              {dir} {align}
            </Text>
          ))}
        </div>
      ))}
    </Stack>
  ),
  play: async ({ canvas }) => {
    for (const dir of ['ltr', 'rtl']) {
      for (const align of ALIGNS) {
        await expect(getComputedStyle(canvas.getByTestId(`align-${dir}-${align}`)).textAlign).toBe(align);
      }
    }
  },
};

export const Overflow: Story = {
  render: () => (
    <Stack gap="md">
      {OVERFLOWS.map((overflow) => (
        <div key={overflow} style={{ width: '14rem' }}>
          <Text variant="label-sm" render={<div />}>{overflow}</Text>
          <Text
            overflow={overflow}
            render={<p data-testid={`overflow-${overflow}`} />}
          >
            {OVERFLOW_COPY[overflow] ?? LONG}
          </Text>
        </div>
      ))}
    </Stack>
  ),
  play: async ({ canvas }) => {
    const get = (mode: string): HTMLElement => canvas.getByTestId(`overflow-${mode}`);

    const truncate = get('truncate');
    await expect(getComputedStyle(truncate).textOverflow).toBe('ellipsis');
    await expect(getComputedStyle(truncate).whiteSpace).toBe('nowrap');
    await expect(truncate.scrollWidth).toBeGreaterThan(truncate.clientWidth);

    const clamp3 = get('clamp-3');
    await expect(clamp3.scrollHeight).toBeGreaterThan(clamp3.clientHeight);

    const clamp = get('clamp-2');
    const lineHeight = parseFloat(getComputedStyle(clamp).lineHeight);
    await expect(clamp.clientHeight).toBeLessThanOrEqual(lineHeight * CLAMP_LINES + LINE_TOLERANCE);
    await expect(clamp.clientHeight).toBeGreaterThan(lineHeight * (CLAMP_LINES - 1));

    await expect(getComputedStyle(get('pre')).whiteSpace).toBe('pre-wrap');
    await expect(get('pre').clientHeight).toBeGreaterThan(parseFloat(getComputedStyle(get('pre')).lineHeight) * (PRE_LINES - 1));

    const broken = get('break');
    await expect(broken.scrollWidth).toBeLessThanOrEqual(broken.clientWidth);

    await expect(getComputedStyle(get('no-wrap')).whiteSpace).toBe('nowrap');
  },
};

export const Italic: Story = {
  args: { italic: true, children: 'Italic text' },
  play: async ({ canvas }) => {
    const text = canvas.getByText('Italic text');
    await expect(text).toHaveAttribute('data-italic');
    await expect(getComputedStyle(text).fontStyle).toBe('italic');
  },
};

const FIGURES = ['1,111.11', '8,888.88', '1.00', '1,000,000.00'];

export const Numeric: Story = {
  render: () => (
    <Stack orientation="horizontal" gap="xl">
      {[false, true].map((numeric) => (
        <Stack key={String(numeric)} gap="xs" style={{ width: '9rem' }}>
          <Text variant="label-sm">{numeric ? 'numeric' : 'default'}</Text>
          {FIGURES.map((figure) => (
            <Text
              key={figure}
              numeric={numeric}
              align="end"
              render={<div data-testid={`${numeric ? 'num' : 'plain'}-${figure}`} style={{ width: 'max-content', alignSelf: 'flex-end' }} />}
            >
              {figure}
            </Text>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
  play: async ({ canvas }) => {
    for (const figure of FIGURES) {
      await expect(getComputedStyle(canvas.getByTestId(`num-${figure}`)).fontVariantNumeric).toBe('tabular-nums');
      await expect(getComputedStyle(canvas.getByTestId(`plain-${figure}`)).fontVariantNumeric).not.toBe('tabular-nums');
    }
    const equal = canvas.getByTestId('num-1,111.11').getBoundingClientRect().width;
    await expect(canvas.getByTestId('num-8,888.88').getBoundingClientRect().width).toBeCloseTo(equal, 1);
  },
};
