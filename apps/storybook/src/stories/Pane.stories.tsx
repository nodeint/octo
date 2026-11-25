import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, Button, Pane, PaneContent, PaneFooter, PaneHeader, ScrollArea, Text } from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

/** The pane gives its content no padding and no scroll: the page inside owns both. */
function Page({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <ScrollArea style={{ flex: 1, minHeight: 0 }}>
      <Box p="md">{children}</Box>
    </ScrollArea>
  );
}

const meta = {
  title: 'Layout/Pane',
  component: Pane,
  tags: ['autodocs'],
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Pane>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: (args) => (
    <Pane {...args} style={{ height: '16rem' }}>
      <PaneHeader><Text variant="title-sm">Details</Text></PaneHeader>
      <PaneContent>
        <Page><Text>Pane content fills the space between the header and the footer.</Text></Page>
      </PaneContent>
      <PaneFooter><Button size="sm">Save</Button></PaneFooter>
    </Pane>
  ),
};

export const ScrollingContent: Story = {
  parameters: { docs: { description: { story: 'Long content scrolls inside a `ScrollArea` while the header and footer stay put.' } } },
  render: () => (
    <Pane style={{ height: '16rem' }}>
      <PaneHeader><Text variant="title-sm">Activity</Text></PaneHeader>
      <PaneContent>
        <Page>
          {Array.from({ length: 20 }, (_, i) => (
            <Text as="p" key={i}>Entry {i + 1}</Text>
          ))}
        </Page>
      </PaneContent>
      <PaneFooter><Button size="sm" variant="outline">Close</Button></PaneFooter>
    </Pane>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Pane>
      <PaneContent>
        <Page><Text>A pane without a header or footer.</Text></Page>
      </PaneContent>
    </Pane>
  ),
};
