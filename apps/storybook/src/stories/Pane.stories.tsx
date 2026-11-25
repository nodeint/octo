import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Pane, PaneBody, PaneFooter, PaneHeader, PaneSeparator, Text } from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

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
      <PaneBody><Text>The body takes the space between the header and the footer.</Text></PaneBody>
      <PaneFooter><Button size="sm">Save</Button></PaneFooter>
    </Pane>
  ),
};

export const ScrollingBody: Story = {
  parameters: { docs: { description: { story: 'Long content scrolls inside the body while the header and footer stay put.' } } },
  render: () => (
    <Pane style={{ height: '16rem' }}>
      <PaneBody>
        {Array.from({ length: 20 }, (_, i) => (
          <Text as="p" key={i}>Entry {i + 1}</Text>
        ))}
      </PaneBody>
    </Pane>
  ),
};

export const Painted: Story = {
  parameters: { docs: { description: { story: '`tone` with `emphasis` replace the glass sidebar surface.' } } },
  render: () => (
    <Pane tone="info" emphasis="soft" style={{ height: '8rem' }}>
      <Text>A pane painted with the info tone, soft emphasis.</Text>
    </Pane>
  ),
};

export const WithSeparators: Story = {
  parameters: { docs: { description: { story: 'A `PaneSeparator` bleeds to the edges; the body pads the side next to it.' } } },
  render: () => (
    <Pane style={{ height: '16rem' }}>
      <PaneHeader><Text variant="title-sm">Activity</Text></PaneHeader>
      <PaneSeparator />
      <PaneBody>
        {Array.from({ length: 20 }, (_, i) => (
          <Text as="p" key={i}>Entry {i + 1}</Text>
        ))}
      </PaneBody>
      <PaneSeparator />
      <PaneFooter><Button size="sm" variant="outline">Close</Button></PaneFooter>
    </Pane>
  ),
};
