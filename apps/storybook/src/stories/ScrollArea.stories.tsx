/*
 * Deviation from the shadcn examples: Horizontal uses inline colored tiles instead of remote photos,
 * so the build has no network dependency.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box, ScrollArea, Separator, Text } from '@workspace/ui';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const TAG_COUNT = 50;
const TAGS = Array.from({ length: TAG_COUNT }, (_, i) => `v1.2.0-beta.${TAG_COUNT - i}`);

const meta = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    scrollbar: { control: 'inline-radio', options: ['auto', 'hidden'] },
    anchor: { control: 'inline-radio', options: ['auto', 'none'] },
    maxHeight: { control: 'select', options: [undefined, 'sm', 'md', 'lg', 'xl'] },
  },
  parameters: { storyWidth: 'sm' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

function TagList({ title }: { title: string }): React.JSX.Element {
  return (
    <div style={{ padding: '1rem' }}>
      <Text as="h4" variant="label" style={{ marginBlockEnd: '1rem' }}>{title}</Text>
      {TAGS.map((tag) => (
        <React.Fragment key={tag}>
          <Text as="div">{tag}</Text>
          <Separator style={{ marginBlock: '0.5rem' }} />
        </React.Fragment>
      ))}
    </div>
  );
}

export const Demo: Story = {
  render: (args) => (
    <Box radius="md" border="thin" style={{ height: '18rem' }}>
      <ScrollArea {...args} style={{ height: '100%' }}>
        <TagList title="Tags" />
      </ScrollArea>
    </Box>
  ),
};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  parameters: { storyWidth: 'lg' },
  render: (args) => (
    <Box radius="md" border="thin">
      <ScrollArea {...args}>
        <div style={{ display: 'flex', width: 'max-content', gap: '1rem', padding: '1rem' }}>
          {['Ornella Binni', 'Tom Byrom', 'Vladimir Malyavko', 'Jane Doe', 'John Roe'].map((artist, index) => (
            <figure key={artist} style={{ margin: 0, flexShrink: 0 }}>
              <Box
                radius="sm"
                surface={index === 0 ? 'muted' : 'accent'}
                style={{ width: '7.5rem', aspectRatio: '3 / 4' }}
              />
              <Text as="figcaption" variant="caption" style={{ paddingBlockStart: '0.5rem' }}>
                Photo by {artist}
              </Text>
            </figure>
          ))}
        </div>
      </ScrollArea>
    </Box>
  ),
};

export const Rtl: Story = {
  render: () => (
    <Box radius="md" border="thin" style={{ height: '18rem' }}>
      <ScrollArea dir="rtl" style={{ height: '100%' }}>
        <TagList title="العلامات" />
      </ScrollArea>
    </Box>
  ),
};
