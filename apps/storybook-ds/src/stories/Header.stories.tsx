import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Action,
  Card,
  CardContent,
  CardHeader,
  CardHeaderContent,
  Header,
  HeaderAction,
  HeaderContent,
  HeaderDescription,
  HeaderMedia,
  HeaderTitle,
} from '@workspace/ds/components';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['md', 'sm'] },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

const noGapStyle: React.CSSProperties & Record<'--header-gap', string> = { '--header-gap': '0' };
const wideGapStyle: React.CSSProperties & Record<'--header-gap', string> = { '--header-gap': '2rem' };

const LONG_TEXT =
  'A long description that keeps going so it runs past several lines and shows how the header clamps its text at ' +
  'the line count of its own size, however deeply it is nested inside other headers on the page.';

export const Demo: Story = {
  render: (args) => (
    <Header {...args}>
      <HeaderMedia size="lg">A</HeaderMedia>
      <HeaderContent>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderDescription>Description</HeaderDescription>
      </HeaderContent>
      <HeaderAction><Action>Edit</Action></HeaderAction>
    </Header>
  ),
};

export const MediaWithoutActions: Story = {
  render: (args) => (
    <Header {...args}>
      <HeaderMedia size="lg">A</HeaderMedia>
      <HeaderContent>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderDescription>Description</HeaderDescription>
      </HeaderContent>
    </Header>
  ),
};

export const Small: Story = {
  args: { size: 'sm' },
  render: (args) => (
    <Header {...args}>
      <HeaderContent>
        <HeaderTitle>Scheduled reports</HeaderTitle>
        <HeaderDescription>Weekly snapshots. No more manual exports.</HeaderDescription>
      </HeaderContent>
    </Header>
  ),
};

type FillHeaderProps = React.ComponentProps<typeof Header> & { actions: boolean };

function FillHeader({ actions, ...args }: FillHeaderProps): React.JSX.Element {
  return (
    <Header {...args}>
      <HeaderMedia size="fill">A</HeaderMedia>
      <HeaderContent>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderDescription>Description</HeaderDescription>
      </HeaderContent>
      {actions ? <HeaderAction><Action>Edit</Action></HeaderAction> : null}
    </Header>
  );
}

export const FillMedia: Story = {
  render: (args) => <FillHeader {...args} actions />,
};

export const FillMediaWithoutActions: Story = {
  render: (args) => <FillHeader {...args} actions={false} />,
};

export const FillMediaNoGap: Story = {
  render: (args) => <FillHeader {...args} actions style={noGapStyle} />,
};

export const FillMediaNoGapWithoutActions: Story = {
  render: (args) => <FillHeader {...args} actions={false} style={noGapStyle} />,
};

export const GapOverride: Story = {
  render: (args) => (
    <Header {...args} style={wideGapStyle}>
      <HeaderMedia size="lg">A</HeaderMedia>
      <HeaderContent>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderDescription>Description</HeaderDescription>
      </HeaderContent>
      <HeaderAction><Action>Edit</Action></HeaderAction>
    </Header>
  ),
};

export const NarrowWrapping: Story = {
  parameters: { storyWidth: 'sm' },
  render: (args) => (
    <Header {...args}>
      <HeaderMedia size="xl">A</HeaderMedia>
      <HeaderContent>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderDescription>Description stays visible</HeaderDescription>
      </HeaderContent>
      <HeaderAction><Action>Edit</Action><Action>More</Action></HeaderAction>
    </Header>
  ),
};

export const PartialContent: Story = {
  render: (args) => (
    <Header {...args}>
      <HeaderContent>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderDescription>Description</HeaderDescription>
      </HeaderContent>
    </Header>
  ),
};

export const PartialWithAction: Story = {
  render: (args) => (
    <Header {...args}>
      <HeaderContent>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderDescription>Description</HeaderDescription>
      </HeaderContent>
      <HeaderAction><Action>Edit</Action></HeaderAction>
    </Header>
  ),
};

export const TextOutsideHeader: Story = {
  render: () => (
    <div>
      <HeaderTitle>Title outside a header</HeaderTitle>
      <HeaderDescription>{LONG_TEXT}</HeaderDescription>
    </div>
  ),
};

export const NestedSizes: Story = {
  render: () => (
    <Header size="sm">
      <HeaderContent>
        <HeaderTitle>Outer small header</HeaderTitle>
        <HeaderDescription>{LONG_TEXT} {LONG_TEXT}</HeaderDescription>
        <Header size="md">
          <HeaderContent>
            <HeaderTitle>Inner medium header</HeaderTitle>
            <HeaderDescription>{LONG_TEXT}</HeaderDescription>
          </HeaderContent>
        </Header>
      </HeaderContent>
    </Header>
  ),
};

export const NestedInSmallCard: Story = {
  render: () => (
    <Card size="sm">
      <CardHeader>
        <CardHeaderContent>
          <Header>
            <HeaderContent>
              <HeaderTitle>Standalone header</HeaderTitle>
              <HeaderDescription>{LONG_TEXT}</HeaderDescription>
            </HeaderContent>
          </Header>
        </CardHeaderContent>
      </CardHeader>
      <CardContent>
        <p>The header keeps the medium type inside a small card header.</p>
      </CardContent>
    </Card>
  ),
};
