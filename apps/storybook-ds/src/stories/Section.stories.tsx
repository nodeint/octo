import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SectionBodyWidth } from '@workspace/ds/components';
import {
  Card,
  CardHeader,
  CardHeaderContent,
  CardTitle,
  Section,
  SectionBody,
  SectionDescription,
  SectionFooter,
  SectionHeader,
  SectionHeaderAction,
  SectionHeaderContent,
  SectionHeaderMedia,
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
type WidthStory = StoryObj<React.ComponentProps<typeof Section> & { width: SectionBodyWidth }>;

export const Demo: Story = {
  render: (args) => (
    <Section {...args}>
      <SectionHeader>
        <SectionHeaderContent>
          <SectionTitle>Profile</SectionTitle>
          <SectionDescription>Update how others see you.</SectionDescription>
        </SectionHeaderContent>
      </SectionHeader>
      <SectionBody>
        <label>
          Name
          <input id="section-name" defaultValue="Ada Lovelace" />
        </label>
      </SectionBody>
    </Section>
  ),
};

export const WithHeaderMedia: Story = {
  render: () => (
    <Section>
      <SectionHeader>
        <SectionHeaderMedia size="lg">A</SectionHeaderMedia>
        <SectionHeaderContent>
          <SectionTitle>Members</SectionTitle>
          <SectionDescription>People with access to this project.</SectionDescription>
        </SectionHeaderContent>
        <SectionHeaderAction><button type="button">Invite</button></SectionHeaderAction>
      </SectionHeader>
    </Section>
  ),
};

export const NestedInSmallCardHeader: Story = {
  render: () => (
    <Card size="sm">
      <CardHeader>
        <CardHeaderContent>
          <CardTitle>Small card</CardTitle>
          <Section>
            <SectionHeader>
              <SectionHeaderContent>
                <SectionTitle>Nested section</SectionTitle>
                <SectionDescription>Renders md type: title-sm role and a two-line clamp.</SectionDescription>
              </SectionHeaderContent>
            </SectionHeader>
          </Section>
        </CardHeaderContent>
      </CardHeader>
    </Card>
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
      <SectionBody>
        <span>3 members</span>
      </SectionBody>
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
      <SectionBody width={width}>
        <input aria-label="Input in section content" defaultValue={width} />
      </SectionBody>
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
          <SectionBody width={width}>
            <input aria-label={`Input in ${width} width`} defaultValue={width} />
          </SectionBody>
        </Section>
      ))}
    </div>
  ),
};

export const WithFooter: Story = {
  parameters: {
    storyWidth: 'lg',
    docs: { description: { story: '`SectionFooter` is a full-width action row; `align="end"` puts the actions at the section edge.' } },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {([undefined, 'end'] as const).map((align) => (
        <Section
          key={align ?? 'start'}
          style={{ '--content-width': '16rem', outline: '1px dashed currentColor' } as React.CSSProperties}
        >
          <SectionHeader>
            <SectionHeaderContent><SectionTitle>align={align ?? 'start (default)'}</SectionTitle></SectionHeaderContent>
          </SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <SectionBody>
              <input aria-label={`Input in ${align ?? 'start'} footer section`} defaultValue="Ada Lovelace" />
            </SectionBody>
            <SectionFooter align={align}>
              <button type="button">Cancel</button>
              <button type="button">Save</button>
            </SectionFooter>
          </div>
        </Section>
      ))}
    </div>
  ),
};
