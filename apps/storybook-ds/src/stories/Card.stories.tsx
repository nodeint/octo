import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Action,
  ActionLink,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderAction,
  CardHeaderContent,
  CardHeaderMedia,
  CardMedia,
  CardMediaAction,
  CardTitle,
  Flex,
  Section,
  SectionHeader,
  SectionHeaderContent,
  SectionTitle,
  Stack,
  Text,
} from '@workspace/ds/components';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Components/Card',
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

function Glyph({ filled = false }: { filled?: boolean }): React.JSX.Element {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" />
    </svg>
  );
}

function CheckGlyph(): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="m5 12 5 5 9-10" />
    </svg>
  );
}

function FavoriteAction(): React.JSX.Element {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Action
      tone="base" emphasis="ghost"
      shape="icon"
      aria-label="Favorite"
      aria-pressed={pressed}
      onClick={() => setPressed((value) => !value)}
    >
      <Glyph filled={pressed} />
    </Action>
  );
}

export const Demo: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardHeaderContent>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeaderContent>
        <CardHeaderAction>
          <ActionLink href="#">Sign Up</ActionLink>
        </CardHeaderAction>
      </CardHeader>
      <CardContent>
        <Stack gap="sm">
          <Text>Email: m@example.com</Text>
          <Text>Password: ••••••••</Text>
        </Stack>
      </CardContent>
      <CardFooter>
        <Stack gap="sm">
          <Action>Login</Action>
          <Action variant="outline">Login with Google</Action>
        </Stack>
      </CardFooter>
    </Card>
  ),
};

export const Basic: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardHeaderContent>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeaderContent>
        <CardHeaderAction>
          <Action variant="outline" size="sm">Action</Action>
        </CardHeaderAction>
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
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardHeaderContent>
          <CardTitle>Scheduled reports</CardTitle>
          <CardDescription>Weekly snapshots. No more manual exports.</CardDescription>
        </CardHeaderContent>
      </CardHeader>
      <CardContent>
        <Stack gap="sm">
          {[
            'Choose a schedule (daily, or weekly).',
            'Send to channels or specific teammates.',
            'Include charts, tables, and key metrics.',
          ].map((text) => (
            <Stack orientation="horizontal" key={text} gap="sm">
              <CheckGlyph />
              <span>{text}</span>
            </Stack>
          ))}
        </Stack>
      </CardContent>
      <CardFooter>
        <Flex direction='column'>
          <Action size="sm">Set up scheduled reports</Action>
          <Action variant="outline" size="sm">See what&apos;s new</Action>
        </Flex>
      </CardFooter>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardHeaderContent>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what you want to be notified about.</CardDescription>
        </CardHeaderContent>
        <CardHeaderAction>
          <Action size="xs" variant="secondary">New</Action>
        </CardHeaderAction>
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
        <CardHeaderContent>
          <CardTitle>Delete project</CardTitle>
          <CardDescription>This action cannot be undone.</CardDescription>
        </CardHeaderContent>
      </CardHeader>
      <CardContent>
        <p>All deployments and settings for this project will be permanently removed.</p>
      </CardContent>
      <CardFooter>
        <Stack orientation="horizontal" gap="sm">
          <Action variant="outline">Cancel</Action>
          <Action variant="destructive">Delete</Action>
        </Stack>
      </CardFooter>
    </Card>
  ),
};

const COVER = 'linear-gradient(135deg, var(--primary-strong) 0%, var(--muted) 100%)';

export const WithHeaderMedia: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardHeaderMedia size="lg">A</CardHeaderMedia>
        <CardHeaderContent>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeaderContent>
        <CardHeaderAction><Action>Edit</Action></CardHeaderAction>
      </CardHeader>
    </Card>
  ),
};

const noGapStyle: React.CSSProperties & Record<'--header-gap', string> = { '--header-gap': '0' };
const wideGapStyle: React.CSSProperties & Record<'--header-gap', string> = { '--header-gap': '2rem' };

type FillCardProps = React.ComponentProps<typeof Card> & { actions: boolean };

function FillCard({ actions, style, ...args }: FillCardProps): React.JSX.Element {
  return (
    <Card {...args} style={style}>
      <CardHeader>
        <CardHeaderMedia size="fill">A</CardHeaderMedia>
        <CardHeaderContent>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeaderContent>
        {actions ? <CardHeaderAction><Action>Edit</Action></CardHeaderAction> : null}
      </CardHeader>
    </Card>
  );
}

export const WithHeaderMediaFill: Story = {
  render: (args) => <FillCard {...args} actions />,
};

export const WithHeaderMediaFillNoActions: Story = {
  render: (args) => <FillCard {...args} actions={false} />,
};

export const WithHeaderMediaFillNoGap: Story = {
  render: (args) => <FillCard {...args} actions style={noGapStyle} />,
};

export const WithHeaderMediaFillNoGapNoActions: Story = {
  render: (args) => <FillCard {...args} actions={false} style={noGapStyle} />,
};

export const HeaderGapOverride: Story = {
  render: (args) => (
    <Card {...args} style={wideGapStyle}>
      <CardHeader>
        <CardHeaderMedia size="lg">A</CardHeaderMedia>
        <CardHeaderContent>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeaderContent>
        <CardHeaderAction><Action>Edit</Action></CardHeaderAction>
      </CardHeader>
    </Card>
  ),
};

export const HeaderNarrow: Story = {
  parameters: { storyWidth: 'sm' },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardHeaderMedia size="xl">A</CardHeaderMedia>
        <CardHeaderContent>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description stays visible</CardDescription>
        </CardHeaderContent>
        <CardHeaderAction><Action>Edit</Action><Action>More</Action></CardHeaderAction>
      </CardHeader>
    </Card>
  ),
};

export const TextOutsideHeader: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <CardTitle>Title outside a header</CardTitle>
        <CardDescription>
          A description outside a header is unclamped and muted, so this long sentence runs over as many lines as it
          needs without being cut off after two or three lines of text in the card.
        </CardDescription>
      </CardContent>
    </Card>
  ),
};

export const NestedSmallCardInSectionHeader: Story = {
  render: () => (
    <Section>
      <SectionHeader>
        <SectionHeaderContent>
          <SectionTitle>Outer section</SectionTitle>
          <Card size="sm">
            <CardHeader>
              <CardHeaderContent>
                <CardTitle>Inner small card</CardTitle>
                <CardDescription>Title uses the parent body font, not the heading font.</CardDescription>
              </CardHeaderContent>
            </CardHeader>
          </Card>
        </SectionHeaderContent>
      </SectionHeader>
    </Section>
  ),
};

export const WithMedia: Story = {
  render: (args) => (
    <Card {...args}>
      <CardMedia>
        <div style={{ aspectRatio: '16 / 9', background: COVER }} />
      </CardMedia>
      <CardHeader>
        <CardHeaderContent>
          <CardTitle>Beautiful landscape</CardTitle>
          <CardDescription>A stunning view that captures the essence of natural beauty.</CardDescription>
        </CardHeaderContent>
      </CardHeader>
      <CardFooter>
        <Action>View details</Action>
      </CardFooter>
    </Card>
  ),
};

export const MediaWithAction: Story = {
  render: (args) => (
    <Card {...args}>
      <CardMedia>
        <div style={{ aspectRatio: '16 / 9', background: COVER }} />
        <CardMediaAction>
          <Action size="sm" variant="secondary">Featured</Action>
        </CardMediaAction>
      </CardMedia>
      <CardHeader>
        <CardHeaderContent>
          <CardTitle>Design systems meetup</CardTitle>
          <CardDescription>A practical talk on scaling UI foundations.</CardDescription>
        </CardHeaderContent>
      </CardHeader>
    </Card>
  ),
};

export const MediaFavoriteOnHover: Story = {
  render: (args) => (
    <Card {...args}>
      <CardMedia>
        <div style={{ aspectRatio: '16 / 9', background: COVER }} />
        <CardMediaAction data-reveal="hover-keep-pressed">
          <FavoriteAction />
        </CardMediaAction>
      </CardMedia>
      <CardHeader>
        <CardHeaderContent>
          <CardTitle>Hover to reveal</CardTitle>
          <CardDescription>The favorite action shows on hover and stays visible once pressed.</CardDescription>
        </CardHeaderContent>
      </CardHeader>
    </Card>
  ),
};

export const MediaBottom: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardHeaderContent>
          <CardTitle>Media at the end</CardTitle>
          <CardDescription>A last-child media region bleeds to the bottom edge.</CardDescription>
        </CardHeaderContent>
      </CardHeader>
      <CardMedia>
        <div style={{ aspectRatio: '16 / 9', background: COVER }} />
      </CardMedia>
    </Card>
  ),
};
