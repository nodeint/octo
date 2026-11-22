import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AvatarSize } from '@workspace/ui';
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icon,
  Inline,
} from '@workspace/ui';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/avatar:
 * - Portraits are inline SVG data URIs instead of github.com images, so the build has no network dependency.
 * - Grayscale and badge colors use inline styles because stories do not use Tailwind classes.
 * - The RTL story uses a `dir="rtl"` wrapper instead of the shadcn translation helper.
 */

const SIZES = ['sm', 'md', 'lg'] as const satisfies readonly AvatarSize[];

function portrait(letter: string, color: string): string {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">' +
    `<rect width="96" height="96" fill="${color}"/>` +
    `<text x="48" y="62" font-size="44" font-family="sans-serif" text-anchor="middle" fill="#fff">${letter}</text></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const PEOPLE = {
  shadcn: { alt: '@shadcn', fallback: 'CN', src: portrait('S', '#6366f1') },
  maxleiter: { alt: '@maxleiter', fallback: 'LR', src: portrait('M', '#f97316') },
  evilrabbit: { alt: '@evilrabbit', fallback: 'ER', src: portrait('E', '#10b981') },
} as const;

const GRAYSCALE = { filter: 'grayscale(1)' } as const;
const ONLINE = { backgroundColor: 'var(--success, #16a34a)' } as const;

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

function Person({ person }: { person: (typeof PEOPLE)[keyof typeof PEOPLE] }) {
  return (
    <Avatar>
      <AvatarImage src={person.src} alt={person.alt} />
      <AvatarFallback>{person.fallback}</AvatarFallback>
    </Avatar>
  );
}

function People({ count }: { count?: React.ReactNode }) {
  return (
    <AvatarGroup style={GRAYSCALE}>
      <Person person={PEOPLE.shadcn} />
      <Person person={PEOPLE.maxleiter} />
      <Person person={PEOPLE.evilrabbit} />
      {count}
    </AvatarGroup>
  );
}

export const Demo: Story = {
  render: () => (
    <Inline gap="xl">
      <Avatar>
        <AvatarImage src={PEOPLE.shadcn.src} alt={PEOPLE.shadcn.alt} style={GRAYSCALE} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={PEOPLE.evilrabbit.src} alt={PEOPLE.evilrabbit.alt} />
        <AvatarFallback>ER</AvatarFallback>
        <AvatarBadge style={ONLINE} />
      </Avatar>
      <People count={<AvatarGroupCount>+3</AvatarGroupCount>} />
    </Inline>
  ),
};

export const Basic: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src={PEOPLE.shadcn.src} alt={PEOPLE.shadcn.alt} style={GRAYSCALE} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="" alt="" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const Badge: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src={PEOPLE.shadcn.src} alt={PEOPLE.shadcn.alt} />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge style={ONLINE} />
    </Avatar>
  ),
};

export const BadgeWithIcon: Story = {
  name: 'Badge with Icon',
  render: () => (
    <Avatar style={GRAYSCALE}>
      <AvatarImage src={PEOPLE.maxleiter.src} alt={PEOPLE.maxleiter.alt} />
      <AvatarFallback>PP</AvatarFallback>
      <AvatarBadge>
        <Icon name="plus" />
      </AvatarBadge>
    </Avatar>
  ),
};

export const Group: Story = {
  name: 'Avatar Group',
  render: () => <People />,
};

export const GroupCount: Story = {
  name: 'Avatar Group Count',
  render: () => <People count={<AvatarGroupCount>+3</AvatarGroupCount>} />,
};

export const GroupWithIcon: Story = {
  name: 'Avatar Group with Icon',
  render: () => (
    <People
      count={
        <AvatarGroupCount>
          <Icon name="plus" />
        </AvatarGroupCount>
      }
    />
  ),
};

export const Sizes: Story = {
  render: () => (
    <Inline gap="sm" style={GRAYSCALE}>
      {SIZES.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src={PEOPLE.shadcn.src} alt={PEOPLE.shadcn.alt} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
    </Inline>
  ),
};

export const Dropdown: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" shape="icon" aria-label="Account menu" />}>
        <Avatar>
          <AvatarImage src={PEOPLE.shadcn.src} alt="shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: () => (
    <div dir="rtl">
      <Inline gap="xl">
        <Avatar>
          <AvatarImage src={PEOPLE.shadcn.src} alt={PEOPLE.shadcn.alt} style={GRAYSCALE} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src={PEOPLE.evilrabbit.src} alt={PEOPLE.evilrabbit.alt} />
          <AvatarFallback>ER</AvatarFallback>
          <AvatarBadge style={ONLINE} />
        </Avatar>
        <People count={<AvatarGroupCount>+٣</AvatarGroupCount>} />
      </Inline>
    </div>
  ),
};
