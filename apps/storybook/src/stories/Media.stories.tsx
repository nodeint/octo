import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, Inline, Media, Stack, Text } from '@workspace/ui';

type MediaTone = NonNullable<React.ComponentProps<typeof Media>['tone']>;

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const RATIOS = ['1:1', '4:3', '3:4', '16:9', '9:16'] as const;
const VARIANTS = [
  'default',
  'secondary',
  'destructive',
  'outline',
  'success',
  'warning',
  'info',
  'plain',
  'muted'
] as const;


function picture(color: string): string {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">' +
    `<rect width="160" height="160" fill="${color}"/>` +
    '<circle cx="110" cy="50" r="18" fill="#fff" fill-opacity=".7"/>' +
    '<path d="M0 160 55 80l40 50 25-30 40 60z" fill="#fff" fill-opacity=".5"/></svg>';

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const meta = {
  title: 'Data Display/Media',
  component: Media,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: [...SIZES, 'fill'] },
    ratio: { control: 'inline-radio', options: RATIOS },
    kind: { control: 'inline-radio', options: ['default', 'image'] },
    variant: { control: 'select', options: VARIANTS },
  },
} satisfies Meta<typeof Media>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { size: 'md' },
  render: ({ tone: _tone, emphasis: _emphasis, ...args }) => (
    <Media {...args}>
      <Icon name="sparkles" />
    </Media>
  ),
};

export const Variants: Story = {
  render: () => (
    <Inline gap="lg">
      {VARIANTS.map((variant) => (
        <Stack key={variant} gap="xs">
          <Media variant={variant}>
            <Icon name="star" />
          </Media>
        </Stack>
      ))}
    </Inline>
  ),
};

export const CustomColors: Story = {
  name: 'Custom Colors',
  render: () => {
    const EMPHASES = ['solid', 'soft', 'outline', 'plain'] as const;
    const TONES = [
      'orange',
      'yellow',
      'lime',
      'emerald',
      'cyan',
      'blue',
      'indigo',
      'violet',
      'purple',
      'fuchsia',
      'pink',
      'rose',
      'gray',
    ] as const satisfies readonly MediaTone[];
    return (
      <Stack gap="lg">
        {EMPHASES.map((emphasis) => (
          <Inline key={emphasis} gap="lg">
            {TONES.map((tone) => (
              <Media key={tone} tone={tone} emphasis={emphasis}>
                <Icon name="star" />
              </Media>
            ))}
          </Inline>
        ))}
      </Stack>
    );
  }
};

export const Sizes: Story = {
  render: () => (
    <Inline gap="lg">
      {SIZES.map((size) => (
        <Stack key={size} gap="xs">
          <Media size={size}>
            <Icon name="star" />
          </Media>
        </Stack>
      ))}
    </Inline>
  ),
};

export const BesideText: Story = {
  name: 'Beside Text',
  render: () => (
    <Inline gap="md">
      <Media>
        <Icon name="database" />
      </Media>
      <Stack gap="xxs">
        <Text variant="label">Database</Text>
        <Text variant="description">A small mark beside text.</Text>
      </Stack>
    </Inline>
  ),
};

export const Ratios: Story = {
  render: () => (
    <Inline gap="lg" align="end">
      {RATIOS.map((ratio) => (
        <Stack key={ratio} gap="xs">
          <Media size="xl" ratio={ratio}>
            <Icon name="star" />
          </Media>
          <Text variant="description">{ratio}</Text>
        </Stack>
      ))}
    </Inline>
  ),
};

export const Image: Story = {
  render: () => (
    <Inline gap="lg" align="end">
      {RATIOS.map((ratio) => (
        <Media key={ratio} size="xl" kind="image" ratio={ratio}>
          <img src={picture('#6366f1')} alt="" />
        </Media>
      ))}
    </Inline>
  ),
};

export const Fill: Story = {
  render: () => (
    <Stack gap="lg" style={{ width: '16rem' }}>
      <Media size="fill">
        <Icon name="star" />
      </Media>
      <Media size="fill" ratio="16:9" kind="image">
        <img src={picture('#10b981')} alt="" />
      </Media>
    </Stack>
  ),
};
