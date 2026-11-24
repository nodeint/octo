import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
  Field,
  FieldGroup,
  FieldLabel,
  Icon,
  Inline,
  Input,
  Stack,
  Toggle,
} from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['md', 'sm'] },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="card-email">Email</FieldLabel>
              <Input id="card-email" type="email" placeholder="m@example.com" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="card-password">Password</FieldLabel>
              <Input id="card-password" type="password" required />
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Stack gap="sm" style={{ width: '100%' }}>
          <Button type="submit" style={{ width: '100%' }}>
            Login
          </Button>
          <Button variant="outline" style={{ width: '100%' }}>
            Login with Google
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  ),
};

export const Basic: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ),
};

export const Small: Story = {
  args: { size: 'sm' },
  parameters: { storyWidth: 'md' },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Scheduled reports</CardTitle>
        <CardDescription>Weekly snapshots. No more manual exports.</CardDescription>
      </CardHeader>
      <CardContent>
        <Stack gap="sm">
          {[
            'Choose a schedule (daily, or weekly).',
            'Send to channels or specific teammates.',
            'Include charts, tables, and key metrics.',
          ].map((text) => (
            <Inline key={text} gap="sm">
              <Icon name="check" size="sm"/>
              <span>{text}</span>
            </Inline>
          ))}
        </Stack>
      </CardContent>
      <CardFooter>
        <Stack gap="sm" style={{ width: '100%' }}>
          <Button size="sm" style={{ width: '100%' }}>
            Set up scheduled reports
          </Button>
          <Button variant="outline" size="sm" style={{ width: '100%' }}>
            See what&apos;s new
          </Button>
        </Stack>
      </CardFooter>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Choose what you want to be notified about.</CardDescription>
        <CardAction>
          <Badge>New</Badge>
        </CardAction>
      </CardHeader>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <p>A card with only content and no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooterActions: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Delete project</CardTitle>
        <CardDescription>This action cannot be undone.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>All deployments and settings for this project will be permanently removed.</p>
      </CardContent>
      <CardFooter>
        <Inline gap="sm">
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete</Button>
        </Inline>
      </CardFooter>
    </Card>
  ),
};

const COVER =
  'linear-gradient(135deg, var(--primary-strong) 0%, var(--muted) 100%)';

export const WithMedia: Story = {
  render: (args) => (
    <Card {...args}>
      <CardMedia>
        <div style={{ aspectRatio: '16 / 9', background: COVER }} />
      </CardMedia>
      <CardHeader>
        <CardTitle>Beautiful landscape</CardTitle>
        <CardDescription>A stunning view that captures the essence of natural beauty.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>View details</Button>
      </CardFooter>
    </Card>
  ),
};

export const MediaWithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardMedia>
        <div style={{ aspectRatio: '16 / 9', background: COVER }} />
        <CardAction>
          <Badge>Featured</Badge>
        </CardAction>
      </CardMedia>
      <CardHeader>
        <CardTitle>Design systems meetup</CardTitle>
        <CardDescription>A practical talk on scaling UI foundations.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const MediaFavoriteOnHover: Story = {
  render: (args) => (
    <Card {...args}>
      <CardMedia>
        <div style={{ aspectRatio: '16 / 9', background: COVER }} />
        <CardAction data-reveal="hover-keep-pressed">
          <Toggle variant="ghost" shape="icon" fillIcon aria-label="Favorite">
            <Icon name="heart" />
          </Toggle>
        </CardAction>
      </CardMedia>
      <CardHeader>
        <CardTitle>Hover to reveal</CardTitle>
        <CardDescription>The favorite toggle shows on hover and stays visible once pressed.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const MediaBottom: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Media at the end</CardTitle>
        <CardDescription>A last-child media region bleeds to the bottom edge.</CardDescription>
      </CardHeader>
      <CardMedia>
        <div style={{ aspectRatio: '16 / 9', background: COVER }} />
      </CardMedia>
    </Card>
  ),
};
