import type { Meta, StoryObj } from '@storybook/react-vite';
import { HighlightedText } from '@workspace/ui';

const meta = {
  title: 'Typography/HighlightedText',
  component: HighlightedText,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    query: { control: 'text' },
  },
  args: {
    text: 'Highlight the matching part of this sentence',
    query: 'match',
  },
} satisfies Meta<typeof HighlightedText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {};

export const MultipleMatches: Story = {
  name: 'Multiple Matches',
  args: { text: 'banana bandana', query: 'an' },
};

export const NoMatch: Story = {
  name: 'No Match',
  args: { query: 'zzz' },
};

export const EmptyQuery: Story = {
  name: 'Empty Query',
  args: { query: '' },
};
