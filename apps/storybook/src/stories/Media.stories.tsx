import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, Inline, Media, Stack, Text } from '@workspace/ui';

type MediaTone = NonNullable<React.ComponentProps<typeof Media>['tone']>;

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
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


const meta = {
  title: 'Data Display/Media',
  component: Media,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
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
      'slate',
      'gray',
      'zinc',
      'stone',
      'mauve',
      'olive',
      'mist',
      'taupe',
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
