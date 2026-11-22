import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SectionContentWidth } from '@workspace/ui';
import {
  Button,
  Field,
  FieldLabel,
  Input,
  Section,
  SectionAction,
  SectionContent,
  SectionDescription,
  SectionHeader,
  SectionTitle,
  Text,
} from '@workspace/ui';
import type * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Layout/Section',
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
        <SectionTitle>Profile</SectionTitle>
        <SectionDescription>Update how others see you.</SectionDescription>
      </SectionHeader>
      <SectionContent>
        <Field>
          <FieldLabel htmlFor="section-name">Name</FieldLabel>
          <Input id="section-name" defaultValue="Ada Lovelace" />
        </Field>
      </SectionContent>
    </Section>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Section>
      <SectionHeader>
        <SectionTitle>Members</SectionTitle>
        <SectionDescription>People with access to this project.</SectionDescription>
        <SectionAction><Button size="sm">Invite</Button></SectionAction>
      </SectionHeader>
      <SectionContent>
        <Text>3 members</Text>
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
      <SectionHeader><SectionTitle>Width</SectionTitle></SectionHeader>
      <SectionContent width={width}>
        <Input aria-label="Input in section content" defaultValue={width} />
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
          <SectionHeader><SectionTitle>width="{width}"</SectionTitle></SectionHeader>
          <SectionContent width={width}>
            <Input aria-label={`Input in ${width} width`} defaultValue={width} />
          </SectionContent>
        </Section>
      ))}
    </div>
  ),
};
