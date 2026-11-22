import type { Meta, StoryObj } from '@storybook/react-vite';
import type { InputGroupSize } from '@workspace/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  Kbd,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Stack,
  Textarea,
} from '@workspace/ui';
import * as React from 'react';
import { storyWidthDecorator } from '../story-width';

const SIZES = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly InputGroupSize[];

const meta = {
  title: 'Form/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['field', 'outline', 'secondary', 'ghost'] },
    size: { control: 'inline-radio', options: SIZES },
  },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <Input placeholder="Search..." aria-label="Search" />
      <InputGroupAddon>
        <Icon name="search" />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack gap="lg">
      {SIZES.map((size) => (
        <InputGroup key={size} {...args} size={size}>
          <Input placeholder={size} aria-label={size} />
          <InputGroupAddon>
            <Icon name="search" />
          </InputGroupAddon>
        </InputGroup>
      ))}
    </Stack>
  ),
};

export const IconAddon: Story = {
  name: 'Icon',
  render: (args) => (
    <Stack gap="lg">
      <InputGroup {...args}>
        <Input placeholder="Search..." aria-label="Search" />
        <InputGroupAddon>
          <Icon name="search" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <Input type="email" placeholder="Enter your email" aria-label="Email" />
        <InputGroupAddon>
          <Icon name="inbox" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <Input placeholder="Card number" aria-label="Card number" />
        <InputGroupAddon>
          <Icon name="hash" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Icon name="check" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <Input placeholder="Card number" aria-label="Card number" />
        <InputGroupAddon align="inline-end">
          <Icon name="star" />
          <Icon name="info" />
        </InputGroupAddon>
      </InputGroup>
    </Stack>
  ),
};

export const Text: Story = {
  render: (args) => (
    <Stack gap="lg">
      <InputGroup {...args}>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="0.00" aria-label="Amount" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="example.com" aria-label="Domain" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <Input placeholder="Enter your username" aria-label="Username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@company.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <Textarea placeholder="Enter your message" aria-label="Message" />
        <InputGroupAddon align="block-end">
          <InputGroupText>120 characters left</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Stack>
  ),
};

function ButtonExample(args: React.ComponentProps<typeof InputGroup>): React.JSX.Element {
  const [isCopied, setIsCopied] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <Stack gap="lg">
      <InputGroup {...args}>
        <Input defaultValue="https://x.com/shadcn" readOnly aria-label="Link" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            shape="icon"
            aria-label="Copy"
            title="Copy"
            onClick={() => {
              setIsCopied(true);
              setTimeout(() => setIsCopied(false), 2000);
            }}
          >
            <Icon name={isCopied ? 'check' : 'copy'} />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <InputGroupAddon>
          <Popover>
            <PopoverTrigger
              render={<InputGroupButton variant="secondary" shape="icon" aria-label="Connection info" />}
            >
              <Icon name="info" />
            </PopoverTrigger>
            <PopoverContent align="start">
              <p>Your connection is not secure.</p>
              <p>You should not enter any sensitive information on this site.</p>
            </PopoverContent>
          </Popover>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <Input aria-label="Address" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            shape="icon"
            aria-label="Favorite"
            aria-pressed={isFavorite}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Icon name="star" />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <Input placeholder="Type to search..." aria-label="Search" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="secondary">Search</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Stack>
  );
}

export const Button: Story = {
  render: (args) => <ButtonExample {...args} />,
};

export const WithKbd: Story = {
  name: 'Kbd',
  render: (args) => (
    <InputGroup {...args}>
      <Input placeholder="Search..." aria-label="Search" />
      <InputGroupAddon>
        <Icon name="search" />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Kbd>⌘K</Kbd>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Dropdown: Story = {
  render: (args) => (
    <Stack gap="lg">
      <InputGroup {...args}>
        <Input placeholder="Enter file name" aria-label="File name" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<InputGroupButton variant="ghost" shape="icon" aria-label="More" />}
            >
              <Icon name="more-horizontal" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} alignOffset={-4}>
              <DropdownMenuGroup>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Copy path</DropdownMenuItem>
                <DropdownMenuItem>Open location</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <Input placeholder="Enter search query" aria-label="Search query" />
        <InputGroupAddon align="inline-end">
          <DropdownMenu>
            <DropdownMenuTrigger render={<InputGroupButton variant="ghost" />}>
              Search In... <Icon name="chevron-down" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={8} alignOffset={-4}>
              <DropdownMenuGroup>
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Blog Posts</DropdownMenuItem>
                <DropdownMenuItem>Changelog</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </Stack>
  ),
};

export const WithSpinner: Story = {
  name: 'Spinner',
  render: (args) => (
    <Stack gap="lg">
      <InputGroup {...args}>
        <Input placeholder="Searching..." aria-label="Searching" />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <Input placeholder="Processing..." aria-label="Processing" />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <Input placeholder="Saving changes..." aria-label="Saving changes" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <Input placeholder="Refreshing data..." aria-label="Refreshing data" />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText>Please wait...</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Stack>
  ),
};

export const WithTextarea: Story = {
  name: 'Textarea',
  parameters: { storyWidth: 'lg' },
  render: (args) => (
    <InputGroup {...args}>
      <Textarea
        placeholder="console.log('Hello, world!');"
        aria-label="Code"
        style={{ minHeight: '12.5rem' }}
      />
      <InputGroupAddon align="block-start">
        <InputGroupText>
          <Icon name="code-2" />
          script.js
        </InputGroupText>
        <InputGroupButton shape="icon" aria-label="Refresh" style={{ marginInlineStart: 'auto' }}>
          <Icon name="refresh-cw" />
        </InputGroupButton>
        <InputGroupButton variant="ghost" shape="icon" aria-label="Copy">
          <Icon name="copy" />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupAddon align="block-end">
        <InputGroupText>Line 1, Column 1</InputGroupText>
        <InputGroupButton variant="default" size="sm" style={{ marginInlineStart: 'auto' }}>
          Run
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const CustomInput: Story = {
  parameters: { storyWidth: 'lg' },
  render: (args) => (
    <InputGroup {...args}>
      <Textarea placeholder="Autoresize textarea..." aria-label="Message" />
      <InputGroupAddon align="block-end">
        <InputGroupButton variant="default" size="sm" style={{ marginInlineStart: 'auto' }}>
          Submit
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <Input disabled placeholder="Disabled" aria-label="Disabled" />
      <InputGroupAddon>
        <Icon name="search" />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <Input aria-invalid defaultValue="Invalid value" aria-label="Invalid" />
    </InputGroup>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <Stack gap="lg" dir="rtl">
      <InputGroup {...args}>
        <Input placeholder="بحث..." aria-label="بحث" />
        <InputGroupAddon>
          <Icon name="search" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">١٢ نتيجة</InputGroupAddon>
      </InputGroup>
      <InputGroup {...args}>
        <Input placeholder="جاري حفظ التغييرات..." aria-label="جاري الحفظ" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>جاري الحفظ...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
    </Stack>
  ),
};
