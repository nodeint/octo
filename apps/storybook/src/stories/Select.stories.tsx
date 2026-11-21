import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SelectTriggerSize } from '@workspace/ui';
import {
  Inline,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui';

const SIZES = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly SelectTriggerSize[];

const FRUITS = ['Apple', 'Banana', 'Cherry'] as const;

const meta = {
  title: 'Form/Select',
  component: SelectTrigger,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    variant: { control: 'inline-radio', options: ['field', 'ghost'] },
    width: { control: 'inline-radio', options: ['hug', 'full'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SelectTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

function FruitSelect(args: React.ComponentProps<typeof SelectTrigger>): React.JSX.Element {
  return (
    <Select defaultValue="Apple">
      <SelectTrigger {...args}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {FRUITS.map((fruit) => (
          <SelectItem key={fruit} value={fruit}>
            {fruit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export const Playground: Story = {
  render: (args) => <FruitSelect {...args} />,
};

export const Sizes: Story = {
  render: (args) => (
    <Inline>
      {SIZES.map((size) => (
        <FruitSelect key={size} {...args} size={size} />
      ))}
    </Inline>
  ),
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
  render: (args) => <FruitSelect {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <FruitSelect {...args} />,
};
