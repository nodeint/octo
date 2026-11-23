// Deviations from the shadcn page: Vertical is omitted, and so is the `orientation` control. The Slider styles define
// only a horizontal track, and `orientation="vertical"` still renders horizontally (checked in the built Storybook).
// Range and Multiple Thumbs are omitted because `Slider` accepts a single `number` and renders one thumb, so the
// Controlled example uses one value. The RTL example uses a `dir="rtl"` wrapper instead of the shadcn translation
// helper.
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex, Label, Slider, Stack, Text } from '@workspace/ui';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const INITIAL_TEMPERATURE = 0.3;

const meta = {
  title: 'Form/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { defaultValue: 33, max: 100, step: 1 },
};

/** Focus lands on the range input inside the thumb; the thumb still shows the focus ring. */
export const Focused: Story = {
  args: { defaultValue: 33, max: 100, step: 1 },
  play: ({ canvasElement }) => {
    canvasElement.querySelector('input')?.focus({ focusVisible: true });
  },
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = React.useState(INITIAL_TEMPERATURE);

    return (
      <Stack gap="sm">
        <Flex justify="space-between" align="center" gap="sm">
          <Label htmlFor="slider-demo-temperature">Temperature</Label>
          <Text variant="description">{value}</Text>
        </Flex>
        <Slider
          id="slider-demo-temperature"
          value={value}
          onValueChange={(next) => {
            setValue(next);
          }}
          min={0}
          max={1}
          step={0.1}
        />
      </Stack>
    );
  },
};

export const Disabled: Story = {
  args: { defaultValue: 50, max: 100, step: 1, disabled: true },
};

export const Rtl: Story = {
  render: () => <Slider defaultValue={75} max={100} step={1} dir="rtl" />,
};
