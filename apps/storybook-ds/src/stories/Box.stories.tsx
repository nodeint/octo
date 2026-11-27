import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, type BoxProps, Stack } from '@workspace/ds/components';

import { storyWidthDecorator } from '../story-width';

const PADDING_PROPS = ['p', 'px', 'py', 'pt', 'pb', 'ps', 'pe', 'bleed'] as const;

const TONES = ['base', 'primary', 'destructive', 'success', 'warning', 'info'] as const;
const EMPHASES = ['solid', 'soft', 'ghost', 'ghost-subtle', 'outline'] as const;
const VARIANTS = [
  'primary',
  'secondary',
  'destructive',
  'outline',
  'plain',
  'subtle',
  'success',
  'warning',
  'info',
] as const;

/**
 * A labelled Box. It pads with `p="sm"` only when the caller sets no padding prop or `bleed`: an axis or side
 * overrides `p` and resets `--inset`, so a default would change the caller's padding.
 */
function Sample({ label, children, ...props }: BoxProps & { label?: string }): React.JSX.Element {
  const hasPadding = PADDING_PROPS.some((name) => props[name] !== undefined);
  return (
    <Box {...(hasPadding ? {} : { p: 'sm' })} {...props}>
      {children ?? <span>{label}</span>}
    </Box>
  );
}

const meta = {
  title: 'Components/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: [undefined, ...VARIANTS] },
    radius: { control: 'select', options: [undefined, '0', 'xs', 'sm', 'md', 'lg'] },
    bordered: { control: 'boolean' },
    borderWidth: { control: 'inline-radio', options: [undefined, '0', 'thin', 'thick'] },
    borderType: { control: 'inline-radio', options: [undefined, 'solid', 'dashed', 'dotted'] },
    shadow: { control: 'inline-radio', options: [undefined, 'none', 'sm', 'md', 'lg'] },
    p: { control: 'select', options: [undefined, 'xs', 'sm', 'md', 'lg', 'xl', 'inset'] },
    bleed: { control: 'inline-radio', options: [undefined, 'x', 'y', 'all', 'top', 'bottom', 'start', 'end'] },
  },
  parameters: {
    storyWidth: 'md',
    docs: {
      description: {
        component:
          '`gap` applies only to a flex or grid box, so a plain Box ignores it. Use Stack or Grid to space children.',
      },
    },
  },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { variant: 'outline', radius: 'md', shadow: 'sm', p: 'md' },
  render: (args) => <Sample {...args} label="A box with paint, radius and shadow." />,
};

export const Paint: Story = {
  parameters: {
    docs: { description: { story: '`variant` picks one approved pair of tone and emphasis, as on Badge.' } },
  },
  render: () => (
    <Stack>
      {VARIANTS.map((variant) => <Sample key={variant} variant={variant} radius="md" label={variant} />)}
    </Stack>
  ),
};

export const ToneAndEmphasis: Story = {
  parameters: {
    storyWidth: 'lg',
    docs: {
      description: {
        story:
          '`tone` with `emphasis` paints a box. Every emphasis takes every tone: the semantic tones are shown here, and the 21 swatch tones take the same emphases.',
      },
    },
  },
  render: () => (
    <Stack gap="xs">
      {TONES.map((tone) => (
        <Stack key={tone} orientation="horizontal" gap="xs">
          {EMPHASES.map((emphasis) => (
            <Sample
              key={emphasis}
              tone={tone}
              emphasis={emphasis}
              radius="sm"
              style={{ flex: 1, fontSize: '0.625rem' }}
            >
              <span>{tone}<br />{emphasis}</span>
            </Sample>
          ))}
        </Stack>
      ))}
    </Stack>
  ),
};

export const Radius: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`radius` rounds every corner. `radiusTop`, `radiusBottom`, `radiusStart` and `radiusEnd` round a side; `radiusTopStart`, `radiusTopEnd`, `radiusBottomStart` and `radiusBottomEnd` round one corner. A corner beats a side, a side beats `radius`; `0` squares it.',
      },
    },
  },
  render: () => (
    <Stack>
      {(['xs', 'sm', 'md', 'lg'] as const).map((radius) => (
        <Sample key={radius} radius={radius} bordered label={`radius="${radius}"`} />
      ))}
      <Sample radiusTop="lg" variant="outline" label='radiusTop="lg"' />
      <Sample radiusBottom="lg" variant="outline" label='radiusBottom="lg"' />
      <Sample radiusStart="lg" variant="outline" label='radiusStart="lg"' />
      <Sample radiusEnd="lg" variant="outline" label='radiusEnd="lg"' />
      <Sample radiusTopStart="lg" radiusBottomEnd="lg" variant="outline" label='radiusTopStart="lg" radiusBottomEnd="lg"' />
      <Sample radius="lg" radiusTopStart="0" variant="outline" label='radius="lg" radiusTopStart="0"' />
    </Stack>
  ),
};

export const Border: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`bordered` draws every edge; pass one side (`top`, `right`, `bottom` or `left`) to draw only that edge. `borderWidth` takes `0`, `thin` or `thick`; `borderType` takes `solid`, `dashed` or `dotted` and applies to `bordered`.',
      },
    },
  },
  render: () => (
    <Stack style={{ padding: '4px' }}>
      <Sample bordered radius="md" label="bordered" />
      <Sample bordered="top" label='bordered="top"' />
      <Sample bordered="bottom" label='bordered="bottom"' />
      <Sample bordered="left" label='bordered="left"' />
      <Sample bordered="right" label='bordered="right"' />
      <Sample bordered borderWidth="thick" radius="md" label="thick" />
      <Sample bordered borderType="dashed" radius="md" label="dashed" />
      <Sample bordered borderType="dotted" borderWidth="thick" radius="md" label="dotted thick" />
      <Sample bordered="bottom" borderType="dashed" label="bottom dashed" />
      <Sample variant="outline" borderWidth="thick" radius="md" label="outline thick" />
    </Stack>
  ),
};

export const Shadow: Story = {
  render: () => (
    <Stack gap="lg">
      {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
        <Sample key={shadow} shadow={shadow} radius="md" label={`shadow="${shadow}"`} />
      ))}
    </Stack>
  ),
};

export const Padding: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`p` sets every side at one step. A side wins over its axis. To pad sides unevenly, set axes or sides instead of `p`: adding an axis or side drops the padding `p` gives the other sides.',
      },
    },
  },
  render: () => (
    <Stack>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((p) => (
        <Sample key={p} p={p} bordered label={`p="${p}"`} />
      ))}
      <Sample px="lg" py="xs" bordered label='px="lg" py="xs"' />
      <Sample px="lg" ps="0" bordered label='px="lg" ps="0"' />
      <Sample py="md" pb="0" bordered label='py="md" pb="0"' />
    </Stack>
  ),
};

export const Bleed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The container declares `--inset` with its padding; `bleed` cancels it. `p="inset"` pads a bleeding box with the full inset, edge to edge. `px="inset"` keeps its content aligned with the container text.',
      },
    },
  },
  render: () => (
    <Sample bordered radius="md" p="lg">
      <Stack>
        <Sample bordered label="Inside the container padding" />
        <Sample bleed="x" p="inset" variant="secondary" label='bleed="x" p="inset"' />
        <Sample bleed="x" px="inset" variant="secondary" label='bleed="x" px="inset"' />
      </Stack>
    </Sample>
  ),
};
