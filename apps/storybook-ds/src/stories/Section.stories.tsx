import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SectionContentWidth } from '@workspace/ds/components';
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionHeaderAction,
  SectionHeaderContent,
  SectionTitle,
} from '@workspace/ds/components';
import type * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Components/Section',
  component: Section,
  tags: ['autodocs'],
  parameters: { storyWidth: 'lg' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;
type WidthStory = StoryObj<React.ComponentProps<typeof Section> & { width: SectionContentWidth }>;

export const Demo: Story = {
  render: (args) => (
    <Section {...args}>
      <SectionHeader>
        <SectionHeaderContent>
          <SectionTitle>Profile</SectionTitle>
          <SectionDescription>Update how others see you.</SectionDescription>
        </SectionHeaderContent>
      </SectionHeader>
      <SectionContent>
        <label>
          Name
          <input id="section-name" defaultValue="Ada Lovelace" />
        </label>
      </SectionContent>
    </Section>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Section>
      <SectionHeader>
        <SectionHeaderContent>
          <SectionTitle>Members</SectionTitle>
          <SectionDescription>People with access to this project.</SectionDescription>
        </SectionHeaderContent>
        <SectionHeaderAction><button type="button">Invite</button></SectionHeaderAction>
      </SectionHeader>
      <SectionContent>
        <span>3 members</span>
      </SectionContent>
    </Section>
  ),
};

export const Width: WidthStory = {
  args: { width: 'content' },
  argTypes: { width: { control: 'inline-radio', options: ['content', 'full'] } },
  parameters: {
    docs: { description: { story: 'Use the `width` control to switch the section content between `content` and `full`.' } },
  },
  render: ({ width, ...args }) => (
    <Section {...args}>
      <SectionHeader><SectionHeaderContent><SectionTitle>Width</SectionTitle></SectionHeaderContent></SectionHeader>
      <SectionContent width={width}>
        <input aria-label="Input in section content" defaultValue={width} />
      </SectionContent>
    </Section>
  ),
};

export const ContentWidth: Story = {
  parameters: {
    storyWidth: 'lg',
    docs: { description: { story: '`width="content"` stops at the content width; `full` fills the section.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {(['content', 'full'] as const).map((width) => (
        <Section key={width}>
          <SectionHeader>
            <SectionHeaderContent><SectionTitle>width="{width}"</SectionTitle></SectionHeaderContent>
          </SectionHeader>
          <SectionContent width={width}>
            <input aria-label={`Input in ${width} width`} defaultValue={width} />
          </SectionContent>
        </Section>
      ))}
    </div>
  ),
};
