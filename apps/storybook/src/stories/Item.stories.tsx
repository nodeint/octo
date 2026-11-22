import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  Icon,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemTitle,
  ItemTrigger,
  Stack,
} from '@workspace/ui';
import * as React from 'react';

import evilrabbitAvatar from '../assets/avatars/evilrabbit.png';
import maxleiterAvatar from '../assets/avatars/maxleiter.png';
import shadcnAvatar from '../assets/avatars/shadcn.jpg';
import song1 from '../assets/avatars/song-1.png';
import song2 from '../assets/avatars/song-2.png';
import song3 from '../assets/avatars/song-3.png';
import model1 from '../assets/models/model-1.jpg';
import model2 from '../assets/models/model-2.jpg';
import model3 from '../assets/models/model-3.jpg';
import { storyWidthDecorator } from '../story-width';

const PEOPLE = [
  { username: 'shadcn', email: 'shadcn@vercel.com' },
  { username: 'maxleiter', email: 'maxleiter@vercel.com' },
  { username: 'evilrabbit', email: 'evilrabbit@vercel.com' },
] as const;

const AVATARS: Record<string, string> = {
  shadcn: shadcnAvatar,
  maxleiter: maxleiterAvatar,
  evilrabbit: evilrabbitAvatar,
};

const MUSIC = [
  { title: 'Midnight City Lights', artist: 'Neon Dreams', album: 'Electric Nights', duration: '3:45' },
  { title: 'Coffee Shop Conversations', artist: 'The Morning Brew', album: 'Urban Stories', duration: '4:05' },
  { title: 'Digital Rain', artist: 'Cyber Symphony', album: 'Binary Beats', duration: '3:30' },
] as const;

const SONG_COVERS: Record<string, string> = {
  'Midnight City Lights': song1,
  'Coffee Shop Conversations': song2,
  'Digital Rain': song3,
};

const MODELS = [
  {
    name: 'v0-1.5-sm',
    description: 'Everyday tasks and UI generation.',
    image: model1,
  },
  {
    name: 'v0-1.5-lg',
    description: 'Advanced thinking or reasoning.',
    image: model2,
  },
  {
    name: 'v0-2.0-mini',
    description: 'Open Source model for everyone.',
    image: model3,
  },
] as const;

/*
 * The icon catalog has no badge-check or shield-alert glyph, so these stories use circle-check and shield-check.
 */

const meta = {
  title: 'Data Display/Item',
  component: Item,
  tags: ['autodocs'],
  parameters: { storyWidth: 'lg' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Item>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Demo: Story = {
  render: () => (
    <Stack gap="lg">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>A simple item with title and description.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">Action</Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" render={<a href="#item-demo" />}>
        <ItemMedia>
          <Icon name="circle-check" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Your profile has been verified.</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Icon name="chevron-right" />
        </ItemActions>
      </Item>
    </Stack>
  ),
};

export const Variant: Story = {
  render: () => (
    <Stack gap="lg">
      <Item>
        <ItemMedia variant="icon">
          <Icon name="inbox" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>Transparent background with no border.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Icon name="inbox" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>Outlined style with a visible border.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemMedia variant="icon">
          <Icon name="inbox" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>Muted background for secondary content.</ItemDescription>
        </ItemContent>
      </Item>
    </Stack>
  ),
};

export const Size: Story = {
  render: () => (
    <Stack gap="lg">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Icon name="inbox" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default Size</ItemTitle>
          <ItemDescription>The standard size for most use cases.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <Icon name="inbox" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Small Size</ItemTitle>
          <ItemDescription>A compact size for dense layouts.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <Icon name="inbox" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Extra Small Size</ItemTitle>
          <ItemDescription>The most compact size available.</ItemDescription>
        </ItemContent>
      </Item>
    </Stack>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Item variant="outline">
      <ItemMedia variant="icon">
        <Icon name="shield-check" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Security Alert</ItemTitle>
        <ItemDescription>New login detected from unknown device.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">Review</Button>
      </ItemActions>
    </Item>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <Stack gap="lg">
      <Item variant="outline">
        <ItemMedia>
          <Avatar size="lg">
            <AvatarImage src={evilrabbitAvatar} alt="Evil Rabbit" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Evil Rabbit</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm" shape="icon" aria-label="Invite">
            <Icon name="plus" />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia>
          <AvatarGroup>
            <Avatar>
              <AvatarImage src={shadcnAvatar} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src={maxleiterAvatar} alt="@maxleiter" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src={evilrabbitAvatar} alt="@evilrabbit" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>No Team Members</ItemTitle>
          <ItemDescription>Invite your team to collaborate on this project.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">Invite</Button>
        </ItemActions>
      </Item>
    </Stack>
  ),
};

export const WithImage: Story = {
  render: () => (
    <ItemGroup>
      {MUSIC.map((song) => (
        <Item key={song.title} variant="outline" render={<a href="#item-song" />} role="listitem">
          <ItemMedia variant="image">
            <img
              src={SONG_COVERS[song.title]}
              alt={song.title}
              width={32}
              height={32}
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>
              {song.title} -{' '}
              <span style={{ color: 'var(--role-description-color)' }}>{song.album}</span>
            </ItemTitle>
            <ItemDescription>{song.artist}</ItemDescription>
          </ItemContent>
          <ItemContent style={{ flex: 'none', textAlign: 'center' }}>
            <ItemDescription>{song.duration}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  ),
};

export const Group: Story = {
  render: () => (
    <ItemGroup>
      {PEOPLE.map((person) => (
        <Item key={person.username} variant="outline">
          <ItemMedia>
            <Avatar>
              <AvatarImage src={AVATARS[person.username]} alt={person.username} />
              <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{person.username}</ItemTitle>
            <ItemDescription>{person.email}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button variant="ghost" size="sm" shape="icon" aria-label={`Invite ${person.username}`}>
              <Icon name="plus" />
            </Button>
          </ItemActions>
        </Item>
      ))}
    </ItemGroup>
  ),
};

export const Header: Story = {
  parameters: { storyWidth: 'lg' },
  render: () => (
    <ItemGroup style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {MODELS.map((model) => (
        <Item key={model.name} variant="outline">
          <ItemHeader>
            <img
              src={model.image}
              alt={model.name}
              width={128}
              height={128}
              style={{ aspectRatio: '1', width: '100%', objectFit: 'cover', borderRadius: 'var(--radius-surface-sm)' }}
            />
          </ItemHeader>
          <ItemContent>
            <ItemTitle>{model.name}</ItemTitle>
            <ItemDescription>{model.description}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </ItemGroup>
  ),
};

export const Link: Story = {
  render: () => (
    <Stack gap="lg">
      <Item render={<a href="#item-docs" />}>
        <ItemContent>
          <ItemTitle>Visit our documentation</ItemTitle>
          <ItemDescription>Learn how to get started with our components.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Icon name="chevron-right" />
        </ItemActions>
      </Item>
      <Item variant="outline" render={<a href="#item-external" target="_blank" rel="noopener noreferrer" />}>
        <ItemContent>
          <ItemTitle>External resource</ItemTitle>
          <ItemDescription>Opens in a new tab with security attributes.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Icon name="external-link" />
        </ItemActions>
      </Item>
    </Stack>
  ),
};

function TriggerDemo(): React.JSX.Element {
  // The trigger covers the row, so a click anywhere opens it;
  // the action buttons sit above the cover and act on their own.
  const [lastAction, setLastAction] = React.useState('None yet');
  return (
    <Stack gap="lg">
      <ItemGroup>
        {PEOPLE.map((person) => (
          <Item key={person.username} variant="outline">
            <ItemMedia>
              <Avatar>
                <AvatarImage src={AVATARS[person.username]} alt="" />
                <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                <ItemTrigger onClick={() => setLastAction(`Opened ${person.username}`)}>
                  {person.username}
                </ItemTrigger>
              </ItemTitle>
              <ItemDescription>{person.email}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                variant="ghost"
                size="sm"
                shape="icon"
                aria-label={`Copy ${person.username}`}
                onClick={() => setLastAction(`Copied ${person.username}`)}
              >
                <Icon name="copy" />
              </Button>
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
      <ItemDescription>Last action: {lastAction}</ItemDescription>
    </Stack>
  );
}

/** Repo-specific: `ItemTrigger` is the row's primary action; it has no shadcn counterpart. */
export const WithTrigger: Story = {
  render: () => <TriggerDemo />,
};

export const DropdownItemLayout: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'An `Item` can be the content of a menu row. Use `bare` to drop the padding of the item, since the menu row already pads it.',
      },
    },
  },
  render: () => (
    <Flex justify="center">
      <DropdownMenu>
        <DropdownMenuTrigger variant="outline">
          Select
          <Icon name="chevron-down" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" size="xs">
          <DropdownMenuGroup>
            {PEOPLE.map((person) => (
              <DropdownMenuItem key={person.username}>
                <Item size="xs" bare>
                  <ItemMedia>
                    <Avatar size="sm">
                      <AvatarImage src={AVATARS[person.username]} alt="" />
                      <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{person.username}</ItemTitle>
                    <ItemDescription>{person.email}</ItemDescription>
                  </ItemContent>
                </Item>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Flex>
  ),
};
