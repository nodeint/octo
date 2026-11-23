import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AttachmentOrientation, AttachmentSize, AttachmentState } from '@workspace/ui';
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Icon,
  Spinner,
  Stack,
} from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/attachment:
 * - Images are inline SVG data URIs instead of remote photos, so the build has no network dependency.
 * - Icons come from the `@workspace/ui` catalog: `code-2` for a code file, `history` for a clock,
 *   `triangle-alert` for a warning file, `file-spreadsheet` for a table.
 * - The Sizes story passes `md`, the component's name for shadcn's `default`.
 */

const STATES = ['idle', 'uploading', 'processing', 'error', 'done'] as const satisfies readonly AttachmentState[];
const SIZES = ['md', 'sm', 'xs'] as const satisfies readonly AttachmentSize[];
const ORIENTATIONS = ['horizontal', 'vertical'] as const satisfies readonly AttachmentOrientation[];

function swatch(from: string, to: string): string {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="450" height="300" viewBox="0 0 450 300">' +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/>` +
    `<stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="450" height="300" fill="url(#g)"/></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const IMAGES = [
  { name: 'workspace.png', meta: 'PNG · 820 KB', src: swatch('#6366f1', '#22d3ee'), alt: 'Workspace' },
  { name: 'desk-reference.jpg', meta: 'JPG · 1.1 MB', src: swatch('#f97316', '#facc15'), alt: 'Desk' },
  { name: 'office-reference.jpg', meta: 'JPG · 940 KB', src: swatch('#10b981', '#3b82f6'), alt: 'Office' },
] as const;

const meta = {
  title: 'Data Display/Attachment',
  component: Attachment,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'select', options: STATES },
    size: { control: 'inline-radio', options: SIZES },
    orientation: { control: 'inline-radio', options: ORIENTATIONS },
  },
  parameters: { storyWidth: 'lg' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Attachment>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => (
    <Stack gap="md">
      <AttachmentGroup>
        {IMAGES.map((image) => (
          <Attachment key={image.name} orientation="vertical">
            <AttachmentMedia variant="image">
              <img src={image.src} alt={image.alt} />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>{image.name}</AttachmentTitle>
              <AttachmentDescription>{image.meta}</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
        ))}
      </AttachmentGroup>
      <Attachment state="uploading">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
          <AttachmentDescription>Uploading · 64%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancel upload">
            <Icon name="x" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment>
        <AttachmentMedia>
          <Icon name="code-2" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
          <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove message-renderer.tsx">
            <Icon name="x" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </Stack>
  ),
};

export const Image: Story = {
  render: () => (
    <AttachmentGroup>
      {IMAGES.map((image) => (
        <Attachment key={image.name} orientation="vertical">
          <AttachmentMedia variant="image">
            <img src={image.src} alt={image.alt} />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{image.name}</AttachmentTitle>
            <AttachmentDescription>{image.meta}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction variant="ghost"  aria-label={`Remove ${image.name}`}>
              <Icon name="x" />
            </AttachmentAction>
          </AttachmentActions>
          <AttachmentTrigger render={<a href={image.src} target="_blank" rel="noreferrer" aria-label={`Open ${image.name}`} />} />
        </Attachment>
      ))}
    </AttachmentGroup>
  ),
};

export const States: Story = {
  render: () => (
    <Stack gap="sm">
      <Attachment state="idle">
        <AttachmentMedia>
          <Icon name="history" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>selected-file.pdf</AttachmentTitle>
          <AttachmentDescription>Ready to upload</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove selected-file.pdf">
            <Icon name="x" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="uploading">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>design-system.zip</AttachmentTitle>
          <AttachmentDescription>Uploading · 64%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancel upload">
            <Icon name="x" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="processing">
        <AttachmentMedia>
          <Icon name="file-text" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>market-research.pdf</AttachmentTitle>
          <AttachmentDescription>Processing document</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove market-research.pdf">
            <Icon name="x" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="error">
        <AttachmentMedia>
          <Icon name="triangle-alert" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>financial-model.xlsx</AttachmentTitle>
          <AttachmentDescription>Upload failed. Try again.</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Retry upload">
            <Icon name="refresh-cw" />
          </AttachmentAction>
          <AttachmentAction aria-label="Remove financial-model.xlsx">
            <Icon name="x" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="done">
        <AttachmentMedia>
          <Icon name="check" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>uploaded-report.pdf</AttachmentTitle>
          <AttachmentDescription>Uploaded · 1.8 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove uploaded-report.pdf">
            <Icon name="x" />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="md">
      <Attachment size="md">
        <AttachmentMedia>
          <Icon name="file-text" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Default attachment</AttachmentTitle>
          <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment size="sm">
        <AttachmentMedia>
          <Icon name="file-text" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Small attachment</AttachmentTitle>
          <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
      <Attachment size="xs">
        <AttachmentMedia>
          <Icon name="file-text" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>Extra small attachment</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
    </Stack>
  ),
};

const GROUP_ITEMS = [
  { name: 'briefing-notes.pdf', meta: 'PDF · 1.4 MB', icon: 'file-text' },
  { name: 'workspace.png', meta: 'PNG · 820 KB', src: IMAGES[0].src },
  { name: 'customers.csv', meta: 'CSV · 18 KB', icon: 'file-spreadsheet' },
  { name: 'renderer.tsx', meta: 'TSX · 12 KB', icon: 'code-2' },
] as const;

export const Group: Story = {
  render: () => (
    <AttachmentGroup>
      {GROUP_ITEMS.map((item) => (
        <Attachment key={item.name} style={{ width: '16rem' }}>
          {'src' in item ? (
            <AttachmentMedia variant="image">
              <img src={item.src} alt={item.name} />
            </AttachmentMedia>
          ) : (
            <AttachmentMedia>
              <Icon name={item.icon} />
            </AttachmentMedia>
          )}
          <AttachmentContent>
            <AttachmentTitle>{item.name}</AttachmentTitle>
            <AttachmentDescription>{item.meta}</AttachmentDescription>
          </AttachmentContent>
          <AttachmentActions>
            <AttachmentAction aria-label={`Remove ${item.name}`}>
              <Icon name="x" />
            </AttachmentAction>
          </AttachmentActions>
        </Attachment>
      ))}
    </AttachmentGroup>
  ),
};

export const Trigger: Story = {
  render: () => (
    <Dialog>
      <Attachment>
        <AttachmentMedia>
          <Icon name="search" />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>research-summary.pdf</AttachmentTitle>
          <AttachmentDescription>Open preview dialog</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Copy link">
            <Icon name="copy" />
          </AttachmentAction>
          <AttachmentAction aria-label="Remove research-summary.pdf">
            <Icon name="x" />
          </AttachmentAction>
        </AttachmentActions>
        <DialogTrigger render={<AttachmentTrigger aria-label="Preview research-summary.pdf" />} />
      </Attachment>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>research-summary.pdf</DialogTitle>
          <DialogDescription>
            The attachment trigger fills the card and opens the dialog, while the actions stay independently
            clickable above it.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

export const Playground: Story = {
  args: { state: 'done', size: 'md', orientation: 'horizontal' },
  render: (args) => (
    <Attachment {...args}>
      <AttachmentMedia>
        <Icon name="file-text" />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>quarterly-report.pdf</AttachmentTitle>
        <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <Button variant="ghost" size="xs">
          Open
        </Button>
      </AttachmentActions>
    </Attachment>
  ),
};
