import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, Inline, Media, Stack, Text } from '@workspace/ui';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const VARIANTS = ['subtle', 'plain'] as const;

const meta = {
  title: 'Data Display/Media',
  component: Media,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    variant: { control: 'inline-radio', options: VARIANTS },
  },
} satisfies Meta<typeof Media>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { size: 'md', variant: 'subtle' },
  render: (args) => (
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
          <Text variant="description">{variant}</Text>
        </Stack>
      ))}
    </Inline>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Inline gap="lg">
      {SIZES.map((size) => (
        <Stack key={size} gap="xs">
          <Media size={size}>
            <Icon name="star" />
          </Media>
          <Text variant="description">{size}</Text>
        </Stack>
      ))}
    </Inline>
  ),
};

export const SizeAndVariant: Story = {
  name: 'Size and Variant',
  render: () => (
    <Inline gap="lg">
      {SIZES.flatMap((size) =>
        VARIANTS.map((variant) => (
          <Media key={`${size}-${variant}`} size={size} variant={variant}>
            <Icon name="heart" />
          </Media>
        )),
      )}
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
