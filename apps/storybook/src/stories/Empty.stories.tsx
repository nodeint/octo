import type { Meta, StoryObj } from '@storybook/react-vite';
import type { EmptyVariant } from '@workspace/ui';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  Icon,
  Input,
  InputGroup,
  InputGroupAddon,
  Kbd,
  Media,
  Stack,
} from '@workspace/ui';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/empty:
 * - Portraits are inline SVG data URIs, so the build has no network dependency.
 * - Outline and Background: the component has no border or tint utilities, so Outline uses `variant="default"`
 *   inside a dashed frame and Background sets a muted background through an inline style.
 * - The InputGroup example uses `Input` inside `InputGroup`, with the `/` hint as `Kbd`.
 * - The RTL story uses a `dir="rtl"` wrapper instead of the shadcn translation helper.
 */

const VARIANTS = ['default', 'plain'] as const satisfies readonly EmptyVariant[];

function portrait(letter: string, color: string): string {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">' +
    `<rect width="96" height="96" fill="${color}"/>` +
    `<text x="48" y="62" font-size="44" font-family="sans-serif" text-anchor="middle" fill="#fff">${letter}</text></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const meta = {
  title: 'Data Display/Empty',
  component: Empty,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS },
  },
} satisfies Meta<typeof Empty>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: (args) => (
    <Empty {...args}>
      <Media size="md">
        <Icon name="folder" />
      </Media>
      <EmptyHeader>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button variant="link" size="sm" render={<a href="#learn-more" />} nativeButton={false}>
        Learn More <Icon name="external-link" />
      </Button>
    </Empty>
  ),
};

export const Outline: Story = {
  render: () => (
    <div style={{ border: '1px dashed var(--border, currentColor)', borderRadius: '0.75rem' }}>
      <Empty variant="plain">
        <Media size="md">
          <Icon name="cloud" />
        </Media>
        <EmptyHeader>
          <EmptyTitle>Cloud Storage Empty</EmptyTitle>
          <EmptyDescription>Upload files to your cloud storage to access them anywhere.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Upload Files
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
};

export const AvatarMedia: Story = {
  name: 'Avatar',
  render: () => (
    <Empty>
      <Media>
        <Avatar size="lg">
          <AvatarImage src={portrait('L', '#6366f1')} alt="" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
      </Media>
      <EmptyHeader>
        <EmptyTitle>User Offline</EmptyTitle>
        <EmptyDescription>
          This user is currently offline. You can leave a message to notify them or try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Leave Message</Button>
      </EmptyContent>
    </Empty>
  ),
};

export const AvatarGroupMedia: Story = {
  name: 'Avatar Group',
  render: () => (
    <Empty>
      <Media>
        <AvatarGroup>
          <Avatar size="lg">
            <AvatarImage src={portrait('S', '#6366f1')} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src={portrait('M', '#f97316')} alt="@maxleiter" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src={portrait('E', '#10b981')} alt="@evilrabbit" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </AvatarGroup>
      </Media>
      <EmptyHeader>
        <EmptyTitle>No Team Members</EmptyTitle>
        <EmptyDescription>Invite your team to collaborate on this project.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <Icon name="plus" />
          Invite Members
        </Button>
      </EmptyContent>
    </Empty>
  ),
};

export const WithInputGroup: Story = {
  name: 'InputGroup',
  render: () => (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup>
          <InputGroupAddon>
            <Icon name="search" />
          </InputGroupAddon>
          <Input aria-label="Search pages" placeholder="Try searching for pages..." />
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <EmptyDescription>
          Need help? <a href="#support">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  ),
};

export const MediaVariants: Story = {
  name: 'Media Variants',
  render: () => (
    <Stack>
      <Empty>
        <EmptyHeader>
          <Media>
            <Icon name="inbox" />
          </Media>
          <EmptyTitle>Default media</EmptyTitle>
          <EmptyDescription>`default` leaves the media bare.</EmptyDescription>
        </EmptyHeader>
      </Empty>
      <Empty>
        <EmptyHeader>
          <Media size="md">
            <Icon name="inbox" />
          </Media>
          <EmptyTitle>Icon media</EmptyTitle>
          <EmptyDescription>`icon` frames the glyph in a tile.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Stack>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: () => (
    <Empty dir="rtl">
      <EmptyHeader>
        <Media size="md">
          <Icon name="folder" />
        </Media>
        <EmptyTitle>لا توجد مشاريع بعد</EmptyTitle>
        <EmptyDescription>لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <Button>إنشاء مشروع</Button>
          <Button variant="outline">استيراد مشروع</Button>
        </div>
      </EmptyContent>
    </Empty>
  ),
};
