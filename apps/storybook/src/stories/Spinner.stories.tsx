import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Badge,
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Icon,
  Inline,
  Input,
  InputGroup,
  InputGroupAddon,
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
  Spinner,
  Stack,
} from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/spinner:
 * - Spinner has no size prop. The Size story sets `width` and `height` through inline styles.
 * - The Customization example swaps the glyph through a Tailwind class; the component has no such hook, so it
 *   is omitted. The Input Group story uses a disabled `Input`.
 * - The RTL story uses a `dir="rtl"` wrapper instead of the shadcn translation helper.
 */

const meta = {
  title: 'Data Display/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => (
    <Item variant="muted">
      <ItemMedia>
        <Spinner />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Processing payment...</ItemTitle>
      </ItemContent>
      <span>$100.00</span>
    </Item>
  ),
};

export const Size: Story = {
  render: () => (
    <Inline gap="xl">
      {['0.75rem', '1rem', '1.5rem', '2rem'].map((size) => (
        <Spinner key={size} style={{ width: size, height: size }} />
      ))}
    </Inline>
  ),
};

export const InButton: Story = {
  name: 'Button',
  render: () => (
    <Stack gap="md">
      <Button disabled size="sm">
        <Spinner />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner />
        Processing
      </Button>
    </Stack>
  ),
};

export const InBadge: Story = {
  name: 'Badge',
  render: () => (
    <Inline gap="md">
      <Badge>
        <Spinner />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner />
        Processing
      </Badge>
    </Inline>
  ),
};

export const InputGroupStory: Story = {
  name: 'Input Group',
  render: () => (
    <InputGroup>
      <Input aria-label="Message" placeholder="Send a message..." disabled />
      <InputGroupAddon align="inline-end">
        <Spinner />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const InEmpty: Story = {
  name: 'Empty',
  parameters: { storyWidth: 'lg' },
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <Icon name="x" />
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: () => (
    <div dir="rtl">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>جاري معالجة الدفع...</ItemTitle>
        </ItemContent>
        <span>١٠٠.٠٠ دولار</span>
      </Item>
    </div>
  ),
};
