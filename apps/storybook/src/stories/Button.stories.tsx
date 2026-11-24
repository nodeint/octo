import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonSize, ButtonVariant } from '@workspace/ui';
import {
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Icon,
  Inline,
  Spinner,
} from '@workspace/ui';

const VARIANTS = [
  'default',
  'outline',
  'secondary',
  'ghost',
  'muted',
  'destructive',
  'link',
] as const satisfies readonly ButtonVariant[];

const SIZES = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly ButtonSize[];

const SIZE_LABELS = {
  xs: 'Extra Small',
  sm: 'Small',
  md: 'Default',
  lg: 'Large',
} as const satisfies Record<ButtonSize, string>;

const meta = {
  title: 'General/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Button' },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'inline-radio', options: SIZES },
    shape: { control: 'inline-radio', options: ['default', 'icon'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { variant: 'outline' },
  render: (args) => (
    <Inline>
      <Button {...args} />
      <Button {...args} shape="icon" aria-label="Submit">
        <Icon name="arrow-up" />
      </Button>
    </Inline>
  ),
};

export const Size: Story = {
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'Use the `size` prop to change the size of the button. Combine it with `shape="icon"` for the square icon-only version.',
      },
    },
  },
  args: { variant: 'outline' },
  render: (args) => (
    <Inline gap="xl">
      {SIZES.map((size) => (
        <Inline key={size}>
          <Button {...args} size={size}>
            {SIZE_LABELS[size]}
          </Button>
          <Button {...args} size={size} shape="icon" aria-label="Submit">
            <Icon name="arrow-up" />
          </Button>
        </Inline>
      ))}
    </Inline>
  ),
};

export const Default: Story = {
  args: { children: 'Button' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Destructive' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link' },
};

export const IconOnly: Story = {
  name: 'Icon',
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'Set `shape="icon"` to render a square button that holds only a glyph. Always provide an `aria-label`.',
      },
    },
  },
  args: { variant: 'outline', shape: 'icon', 'aria-label': 'Upgrade' },
  render: (args) => (
    <Button {...args}>
      <Icon name="sparkles" />
    </Button>
  ),
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'Place an `Icon` before or after the label. The button spaces the glyph from the text automatically.',
      },
    },
  },
  args: { variant: 'outline' },
  render: (args) => (
    <Inline>
      <Button {...args}>
        <Icon name="plus" />
        New Branch
      </Button>
      <Button {...args}>
        Fork
        <Icon name="external-link" />
      </Button>
    </Inline>
  ),
};

export const Loading: Story = {
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'Render a `Spinner` inside the button to show a loading state, before or after the label.',
      },
    },
  },
  render: (args) => (
    <Inline>
      <Button {...args} variant="outline" disabled>
        <Spinner />
        Generating
      </Button>
      <Button {...args} variant="secondary" disabled>
        Downloading
        <Spinner />
      </Button>
    </Inline>
  ),
};

export const InButtonGroup: Story = {
  name: 'Button Group',
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'To create a button group, use the `ButtonGroup` component. See the Button Group documentation for more details.',
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" shape="icon" aria-label="Go Back">
          <Icon name="arrow-left" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Archive</Button>
        <Button variant="outline">Report</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Snooze</Button>
        <DropdownMenu>
          <DropdownMenuTrigger
            variant="outline"
            shape="icon"
            aria-label="More Options"
          >
            <Icon name="more-horizontal" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Icon name="check" />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="file-archive" />
                Archive
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Icon name="history" />
                Snooze
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="calendar" />
                Add to Calendar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="list-filter" />
                Add to List
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Icon name="tag" />
                  Label As...
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup defaultValue="personal">
                    <DropdownMenuRadioItem value="personal">
                      Personal
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="work">
                      Work
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="other">
                      Other
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <Icon name="trash-2" />
                Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </ButtonGroup>
  ),
};
