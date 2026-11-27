import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonSize } from '@workspace/ui';
import {
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
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
  Field,
  FieldDescription,
  FieldLabel,
  Icon,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  Label,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Stack,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@workspace/ui';
import { useState } from 'react';

const SIZES = ['sm', 'md', 'lg'] as const satisfies readonly ButtonSize[];

const SIZE_LABELS = {
  sm: 'Small',
  md: 'Default',
  lg: 'Large',
} as const satisfies Record<(typeof SIZES)[number], string>;

const CURRENCIES = [
  { label: 'US Dollar', value: '$' },
  { label: 'Euro', value: '€' },
  { label: 'British Pound', value: '£' },
] as const;

const meta = {
  title: 'General/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    variant: { control: 'inline-radio', options: ['outline', 'secondary', 'ghost'] },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

function MoreOptionsMenu(): React.JSX.Element {
  const [label, setLabel] = useState('personal');

  return (
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
              <DropdownMenuRadioGroup value={label} onValueChange={setLabel}>
                <DropdownMenuRadioItem value="personal">
                  Personal
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="work">Work</DropdownMenuRadioItem>
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
  );
}

export const Playground: Story = {
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'Nest `ButtonGroup` components to space groups apart, and combine buttons with a `DropdownMenu` for extra actions.',
      },
    },
  },
  render: (args) => (
    <ButtonGroup {...args}>
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
        <MoreOptionsMenu />
      </ButtonGroup>
    </ButtonGroup>
  ),
};

export const Orientation: Story = {
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'Set the `orientation` prop to change the direction of the group.',
      },
    },
  },
  args: { orientation: 'vertical', 'aria-label': 'Media controls' },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline" shape="icon" aria-label="Increase">
        <Icon name="plus" />
      </Button>
      <Button variant="outline" shape="icon" aria-label="Decrease">
        <Icon name="minus" />
      </Button>
    </ButtonGroup>
  ),
};

export const Size: Story = {
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'Control the size of the buttons using the `size` prop on each button.',
      },
    },
  },
  render: () => (
    <Stack gap="xl">
      {SIZES.map((size) => (
        <ButtonGroup key={size}>
          <Button variant="outline" size={size}>
            {SIZE_LABELS[size]}
          </Button>
          <Button variant="outline" size={size}>
            Button
          </Button>
          <Button variant="outline" size={size}>
            Group
          </Button>
          <Button
            variant="outline"
            size={size}
            shape="icon"
            aria-label="Add"
          >
            <Icon name="plus" />
          </Button>
        </ButtonGroup>
      ))}
    </Stack>
  ),
};

export const Nested: Story = {
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          '`ButtonGroup` components can be nested to create complex layouts with spacing between groups.',
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" shape="icon" aria-label="Add">
          <Icon name="plus" />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <Input
            placeholder="Send a message..."
            aria-label="Message"
          />
          <InputGroupAddon align="inline-end">
            <Tooltip>
              <TooltipTrigger
                render={
                  <InputGroupButton shape="icon" aria-label="Voice Mode" />
                }
              >
                <Icon name="sparkles" />
              </TooltipTrigger>
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    </ButtonGroup>
  ),
};

export const Split: Story = {
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'Create a split button by pairing a primary action with an icon button, divided by a `ButtonGroupSeparator`.',
      },
    },
  },
  render: () => (
    <ButtonGroup variant="secondary">
      <Button>Button</Button>
      <ButtonGroupSeparator />
      <Button shape="icon" aria-label="Add">
        <Icon name="plus" />
      </Button>
    </ButtonGroup>
  ),
};

export const WithInput: Story = {
  name: 'Input',
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story: 'Wrap an `Input` component with buttons.',
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <Input placeholder="Search..." aria-label="Search" />
      <Button variant="outline" shape="icon" aria-label="Search">
        <Icon name="search" />
      </Button>
    </ButtonGroup>
  ),
};

export const WithInputGroup: Story = {
  name: 'Input Group',
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'Wrap an `InputGroup` component to create complex input layouts.',
      },
    },
  },
  render: function Render() {
    const [voiceEnabled, setVoiceEnabled] = useState(false);

    return (
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" shape="icon" aria-label="Add">
            <Icon name="plus" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <InputGroup>
            <Input
              aria-label="Message"
              placeholder={
                voiceEnabled ? 'Record and send audio...' : 'Send a message...'
              }
              disabled={voiceEnabled}
            />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <InputGroupButton
                      shape="icon"
                      aria-label="Voice Mode"
                      aria-pressed={voiceEnabled}
                      onClick={() => setVoiceEnabled(!voiceEnabled)}
                    />
                  }
                >
                  <Icon name="sparkles" />
                </TooltipTrigger>
                <TooltipContent>Voice Mode</TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
        </ButtonGroup>
      </ButtonGroup>
    );
  },
};

export const WithDropdownMenu: Story = {
  name: 'Dropdown Menu',
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'Create a split button group with a `DropdownMenu` component.',
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Follow</Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          variant="outline"
          shape="icon"
          aria-label="More Options"
        >
          <Icon name="chevron-down" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" size="xs">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon name="eye-off" />
              Mute Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="check" />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="triangle-alert" />
              Report Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="octagon-x" />
              Block User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="external-link" />
              Share Conversation
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="copy" />
              Copy Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem variant="destructive">
              <Icon name="trash" />
              Delete Conversation
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  ),
};

export const WithSelect: Story = {
  name: 'Select',
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story: 'Pair a `Select` with an `Input` and a button.',
      },
    },
  },
  render: function Render() {
    const [currency, setCurrency] = useState('$');

    return (
      <ButtonGroup>
        <ButtonGroup>
          <Select
            value={currency}
            onValueChange={(value) => {
              if (value !== null) {
                setCurrency(value);
              }
            }}
          >
            <SelectTrigger aria-label="Currency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {CURRENCIES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.value} {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input placeholder="10.00" pattern="[0-9]*" aria-label="Amount" />
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" shape="icon" aria-label="Send">
            <Icon name="arrow-right" />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    );
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'A `variant` on the group sets the fill, text and border of the fields and actions inside, over their own variant. Focus, invalid and disabled paint stay with the child.',
      },
    },
  },
  render: () => (
    <Stack gap="md">
      {(['outline', 'secondary', 'ghost'] as const).map((variant) => (
        <ButtonGroup key={variant} variant={variant}>
          <Select defaultValue="$">
            <SelectTrigger aria-label="Currency" >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {CURRENCIES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.value} {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input placeholder="10.00" aria-label="Amount" />
          <Button shape="icon" aria-label="Send">
            <Icon name="arrow-right" />
          </Button>
          <Button shape="icon" aria-label="Clear" disabled>
            <Icon name="check" />
          </Button>
        </ButtonGroup>
      ))}
    </Stack>
  ),
};

export const WithPopover: Story = {
  name: 'Popover',
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story: 'Use a `Popover` component with a button group.',
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <Button variant="outline">
        <Icon name="bot" />
        Copilot
      </Button>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              shape="icon"
              aria-label="Open Popover"
            />
          }
        >
          <Icon name="chevron-down" />
        </PopoverTrigger>
        <PopoverContent align="end">
          <PopoverHeader>
            <PopoverTitle>Start a new task with Copilot</PopoverTitle>
            <PopoverDescription>
              Describe your task in natural language.
            </PopoverDescription>
          </PopoverHeader>
          <Field>
            <FieldLabel htmlFor="task" className="sr-only">
              Task Description
            </FieldLabel>
            <Textarea id="task" placeholder="I need to..." />
            <FieldDescription>
              Copilot will open a pull request for review.
            </FieldDescription>
          </Field>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  ),
};

export const WithText: Story = {
  name: 'Text',
  parameters: {
    docs: {
      source: { type: 'dynamic' },
      description: {
        story:
          'Use `ButtonGroupText` to display text within a group. Pass `render` to compose it with another element such as a `Label`.',
      },
    },
  },
  render: () => (
    <ButtonGroup>
      <ButtonGroupText render={<Label htmlFor="name" />}>Text</ButtonGroupText>
      <Input placeholder="Type something here..." id="name" />
    </ButtonGroup>
  ),
};
