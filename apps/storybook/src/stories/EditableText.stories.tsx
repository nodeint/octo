import type { Meta, StoryObj } from '@storybook/react-vite';
import { EditableText, Stack } from '@workspace/ui';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const VARIANTS = ['title-md', 'title-sm', 'body'] as const;

/** Keeps the committed text in state so an edit sticks, as a host screen would. */
function Editable(props: Omit<React.ComponentProps<typeof EditableText>, 'onValueCommit'>): React.JSX.Element {
  const [value, setValue] = React.useState(props.value);

  // A change to the `value` control replaces the text; an edit committed in the story stays until then.
  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return <EditableText {...props} value={value} onValueCommit={setValue} />;
}

const meta = {
  title: 'Form/EditableText',
  component: EditableText,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS },
    editTrigger: { control: 'inline-radio', options: ['button', 'double-click'] },
    showEditButton: { control: 'boolean' },
    value: { control: 'text' },
    label: { control: 'text' },
  },
  args: { value: 'Quarterly report', label: 'Rename document', onValueCommit: () => undefined },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof EditableText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: (args) => <Editable {...args} />,
};

export const Variants: Story = {
  render: (args) => (
    <Stack gap="md">
      {VARIANTS.map((variant) => (
        <Editable key={variant} {...args} variant={variant} value={`Variant ${variant}`} />
      ))}
    </Stack>
  ),
};

export const DoubleClick: Story = {
  args: { editTrigger: 'double-click', showEditButton: false, value: 'Double-click to rename' },
  render: (args) => <Editable {...args} />,
};

export const DoubleClickWithButton: Story = {
  args: { editTrigger: 'double-click', showEditButton: true, value: 'Double-click or use the pencil' },
  render: (args) => <Editable {...args} />,
};

export const LongValue: Story = {
  args: {
    value: 'A very long document title that does not fit in the available width and is truncated',
  },
  render: (args) => <Editable {...args} />,
};
