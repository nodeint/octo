import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Icon,
  Spinner,
  Stack,
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '@workspace/ui';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/trace:
 * - Icons come from the `@workspace/ui` catalog: `circle-check`, `triangle-alert`, `loader-2`, `square`
 *   (for the pending circle), `code-2` and `external-link`.
 * - The shadcn `CodeBlock` is not in `@workspace/ui`, so collapsible details use a `pre` element.
 * - The Sources example is omitted: it depends on the shadcn `sources` component.
 */

const meta = {
  title: 'Data Display/Trace',
  component: Trace,
  tags: ['autodocs'],
  parameters: { storyWidth: 'lg' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Trace>;

export default meta;

type Story = StoryObj<typeof meta>;

function Output({ children }: { children: string }) {
  return <pre style={{ margin: 0, fontSize: '0.75rem', whiteSpace: 'pre-wrap' }}>{children}</pre>;
}

function Step({ icon, title, children }: { icon: string; title: string; children?: React.ReactNode }) {
  return (
    <TraceLine>
      <TraceIcon>
        <Icon name={icon} />
      </TraceIcon>
      <TraceTitle>{title}</TraceTitle>
      {children}
    </TraceLine>
  );
}

export const Demo: Story = {
  render: () => (
    <Trace>
      <Step icon="search" title="Searched for minimumReleaseAge" />
      <Step icon="file-text" title="Read pnpm-workspace.yaml" />
      <Step icon="terminal" title="Ran pnpm install" />
    </Trace>
  ),
};

export const Line: Story = {
  name: 'Trace Line',
  render: () => (
    <Trace>
      <Step icon="workflow" title="Created branch fix/frozen-lockfile" />
    </Trace>
  ),
};

export const Status: Story = {
  render: () => (
    <Trace>
      <Step icon="circle-check" title="Ran pnpm install" />
      <TraceLine status="error">
        <TraceIcon>
          <Icon name="triangle-alert" />
        </TraceIcon>
        <TraceTitle>Failed to run pnpm lint</TraceTitle>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <Spinner />
        </TraceIcon>
        <TraceTitle>Running pnpm build</TraceTitle>
      </TraceLine>
      <TraceLine status="pending">
        <TraceIcon>
          <Icon name="square" />
        </TraceIcon>
        <TraceTitle>Run pnpm test</TraceTitle>
      </TraceLine>
    </Trace>
  ),
};

export const Description: Story = {
  render: () => (
    <Trace>
      <Step icon="pencil" title="Edited components/settings/notification-preferences-form.tsx">
        <TraceDescription>+48 −12</TraceDescription>
      </Step>
      <Step icon="terminal" title="Ran pnpm test">
        <TraceDescription>14s</TraceDescription>
      </Step>
      <Step icon="search" title="Searched for useChat">
        <TraceDescription>8 results</TraceDescription>
      </Step>
    </Trace>
  ),
};

type RowProps = {
  title: string;
  output: string;
  isDefaultOpen?: boolean;
  isOpen?: boolean;
  onOpenChange?: React.ComponentProps<typeof TraceCollapsible>['onOpenChange'];
};

function CollapsibleRow({ title, output, isDefaultOpen, isOpen, onOpenChange }: RowProps) {
  const state = isOpen !== undefined && onOpenChange ? { open: isOpen, onOpenChange } : { defaultOpen: isDefaultOpen };

  return (
    <TraceCollapsible {...state}>
      <TraceCollapsibleTrigger>
        <Step icon="terminal" title={title} />
      </TraceCollapsibleTrigger>
      <TraceCollapsibleContent>
        <Output>{output}</Output>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  );
}

export const Collapsible: Story = {
  render: () => <CollapsibleRow title="Ran node --version" output={'$ node --version\nv24.18.0'} />,
};

function OpenState() {
  const [open, setOpen] = React.useState(false);

  return (
    <Stack gap="md" style={{ alignItems: 'flex-start' }}>
      <CollapsibleRow isDefaultOpen title="Ran node --version" output={'$ node --version\nv24.18.0'} />
      <CollapsibleRow isOpen={open} onOpenChange={setOpen} title="Ran pnpm --version" output={'$ pnpm --version\n10.33.4'} />
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? 'Hide' : 'Show'} the pnpm output
      </Button>
    </Stack>
  );
}

export const OpenStateStory: Story = {
  name: 'Open State',
  render: () => <OpenState />,
};

export const Link: Story = {
  render: () => (
    <Trace>
      <a href="#link">
        <TraceLine>
          <TraceIcon>
            <Icon name="file-text" />
          </TraceIcon>
          <TraceTitle>Read apps/v4/lib/docs.ts</TraceTitle>
          <TraceIcon>
            <Icon name="chevron-right" />
          </TraceIcon>
        </TraceLine>
      </a>
      <a href="https://docs.astro.build/en/install-and-setup/" target="_blank" rel="noreferrer">
        <TraceLine>
          <TraceIcon>
            <Icon name="globe" />
          </TraceIcon>
          <TraceTitle>
            Install Astro | docs.astro.build
            <span className="sr-only"> (opens in a new tab)</span>
          </TraceTitle>
          <TraceIcon>
            <Icon name="external-link" />
          </TraceIcon>
        </TraceLine>
      </a>
    </Trace>
  ),
};

const RESULTS = [
  { title: 'Caching build outputs', url: 'https://nextjs.org/docs/app/guides/caching' },
  { title: 'Image optimization reference', url: 'https://nextjs.org/docs/app/api-reference/components/image' },
  { title: 'Deploy hooks and cache keys', url: 'https://vercel.com/docs/deploy-hooks' },
] as const;

export const DialogStory: Story = {
  name: 'Dialog',
  render: () => (
    <Trace>
      <Dialog>
        <DialogTrigger>
          <TraceLine>
            <TraceIcon>
              <Icon name="globe" />
            </TraceIcon>
            <TraceTitle>Searched the web for cache keys</TraceTitle>
            <TraceIcon>
              <Icon name="chevron-right" />
            </TraceIcon>
          </TraceLine>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Searched the web for cache keys</DialogTitle>
            <DialogDescription>Three results were used in the response.</DialogDescription>
          </DialogHeader>
          <Trace>
            {RESULTS.map((result) => (
              <a key={result.url} href={result.url} target="_blank" rel="noreferrer">
                <TraceLine>
                  <TraceIcon>
                    <Icon name="globe" />
                  </TraceIcon>
                  <TraceTitle>
                    {result.title}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </TraceTitle>
                  <TraceIcon>
                    <Icon name="external-link" />
                  </TraceIcon>
                </TraceLine>
              </a>
            ))}
          </Trace>
        </DialogContent>
      </Dialog>
    </Trace>
  ),
};

export const DrawerStory: Story = {
  name: 'Drawer',
  render: () => (
    <Trace>
      <Drawer>
        <DrawerTrigger>
          <TraceLine>
            <TraceIcon>
              <Icon name="folder" />
            </TraceIcon>
            <TraceTitle>Explored 4 files</TraceTitle>
            <TraceIcon>
              <Icon name="chevron-right" />
            </TraceIcon>
          </TraceLine>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Explored 4 files</DrawerTitle>
            <DrawerDescription>Files read while preparing the response.</DrawerDescription>
          </DrawerHeader>
          <ul style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <li>apps/v4/lib/docs.ts</li>
            <li>apps/v4/lib/components.ts</li>
            <li>apps/v4/next.config.mjs</li>
            <li>apps/v4/package.json</li>
          </ul>
        </DrawerContent>
      </Drawer>
    </Trace>
  ),
};

export const Group: Story = {
  render: () => (
    <Trace>
      <Step icon="search" title="Searched for minimumReleaseAge" />
      <Step icon="file-text" title="Read pnpm-workspace.yaml" />
      <Step icon="terminal" title="Ran pnpm install" />
    </Trace>
  ),
};
