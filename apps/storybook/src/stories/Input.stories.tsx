import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Badge,
  Button,
  ButtonGroup,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Grid,
  Icon,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const SIZES = ['xs', 'sm', 'md', 'lg'] as const;

const COUNTRIES = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
] as const;

const meta = {
  title: 'Form/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Enter text' },
  argTypes: {
    type: { control: 'select', options: ['text', 'email', 'password', 'number', 'search', 'url', 'tel'] },
    disabled: { control: 'boolean' },
  },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <FieldGroup>
      {SIZES.map((size) => (
        <Input key={size} {...args} data-field-size={size} placeholder={size} aria-label={size} />
      ))}
    </FieldGroup>
  ),
};

export const WithField: Story = {
  name: 'Field',
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
      <Input {...args} id="input-field-username" type="text" placeholder="Enter your username" />
      <FieldDescription>Choose a unique username for your account.</FieldDescription>
    </Field>
  ),
};

export const WithFieldGroup: Story = {
  name: 'Field Group',
  render: (args) => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
        <Input {...args} id="fieldgroup-name" placeholder="Jordan Lee" />
      </Field>
      <Field>
        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
        <Input {...args} id="fieldgroup-email" type="email" placeholder="name@example.com" />
        <FieldDescription>We&apos;ll send updates to this address.</FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </Field>
    </FieldGroup>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Field data-disabled>
      <FieldLabel htmlFor="input-demo-disabled">Email</FieldLabel>
      <Input {...args} id="input-demo-disabled" type="email" placeholder="Email" disabled />
      <FieldDescription>This field is currently disabled.</FieldDescription>
    </Field>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Field data-invalid>
      <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
      <Input {...args} id="input-invalid" placeholder="Error" aria-invalid />
      <FieldDescription>This field contains validation errors.</FieldDescription>
    </Field>
  ),
};

export const File: Story = {
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input {...args} id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  ),
};

export const Inline: Story = {
  render: (args) => (
    <Field orientation="horizontal">
      <Input {...args} type="search" placeholder="Search..." aria-label="Search" />
      <Button>Search</Button>
    </Field>
  ),
};

export const WithGrid: Story = {
  name: 'Grid',
  parameters: { storyWidth: 'md' },
  render: (args) => (
    <Grid columns={2} gap="md">
      <Field>
        <FieldLabel htmlFor="first-name">First Name</FieldLabel>
        <Input {...args} id="first-name" placeholder="Jordan" />
      </Field>
      <Field>
        <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
        <Input {...args} id="last-name" placeholder="Lee" />
      </Field>
    </Grid>
  ),
};

export const Required: Story = {
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="input-required">
        Required Field <span style={{ color: 'var(--destructive)' }}>*</span>
      </FieldLabel>
      <Input {...args} id="input-required" placeholder="This field is required" required />
      <FieldDescription>This field must be filled out.</FieldDescription>
    </Field>
  ),
};

export const WithBadge: Story = {
  name: 'Badge',
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="input-badge">
        Webhook URL{' '}
        <Badge variant="secondary" style={{ marginInlineStart: 'auto' }}>
          Beta
        </Badge>
      </FieldLabel>
      <Input {...args} id="input-badge" type="url" placeholder="https://api.example.com/webhook" />
    </Field>
  ),
};

export const WithInputGroup: Story = {
  name: 'Input Group',
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="input-group-url">Website URL</FieldLabel>
      <InputGroup>
        <Input {...args} id="input-group-url" placeholder="example.com" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Icon name="info" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  ),
};

export const WithButtonGroup: Story = {
  name: 'Button Group',
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="input-button-group">Search</FieldLabel>
      <ButtonGroup>
        <Input {...args} id="input-button-group" placeholder="Type to search..." />
        <Button variant="outline">Search</Button>
      </ButtonGroup>
    </Field>
  ),
};

export const Form: Story = {
  parameters: { storyWidth: 'md' },
  render: (args) => (
    <form>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Name</FieldLabel>
          <Input {...args} id="form-name" type="text" placeholder="Evil Rabbit" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input {...args} id="form-email" type="email" placeholder="john@example.com" />
          <FieldDescription>We&apos;ll never share your email with anyone.</FieldDescription>
        </Field>
        <Grid columns={2} gap="md">
          <Field>
            <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
            <Input {...args} id="form-phone" type="tel" placeholder="+1 (555) 123-4567" />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-country">Country</FieldLabel>
            <Select items={COUNTRIES} defaultValue="us">
              <SelectTrigger id="form-country">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </Grid>
        <Field>
          <FieldLabel htmlFor="form-address">Address</FieldLabel>
          <Input {...args} id="form-address" type="text" placeholder="123 Main St" />
        </Field>
        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <Field dir="rtl">
      <FieldLabel htmlFor="input-rtl-api-key">مفتاح API</FieldLabel>
      <Input {...args} id="input-rtl-api-key" type="password" placeholder="sk-..." dir="rtl" />
      <FieldDescription>مفتاح API الخاص بك مشفر ومخزن بأمان.</FieldDescription>
    </Field>
  ),
};
