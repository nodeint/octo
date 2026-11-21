import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from '@workspace/ui';
import * as React from 'react';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Grape', 'Mango'] as const;

const meta = {
  title: 'Form/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Combobox items={FRUITS}>
      <ComboboxInput placeholder="Pick a fruit" aria-label="Fruit" />
      <ComboboxContent>
        <ComboboxEmpty>No fruit found.</ComboboxEmpty>
        <ComboboxList>
          {(fruit: string) => (
            <ComboboxItem key={fruit} value={fruit}>
              {fruit}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const WithClear: Story = {
  render: () => (
    <Combobox items={FRUITS} defaultValue="Banana">
      <ComboboxInput placeholder="Pick a fruit" aria-label="Fruit" showClear />
      <ComboboxContent>
        <ComboboxEmpty>No fruit found.</ComboboxEmpty>
        <ComboboxList>
          {(fruit: string) => (
            <ComboboxItem key={fruit} value={fruit}>
              {fruit}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Combobox items={FRUITS}>
      <ComboboxInput disabled placeholder="Disabled" aria-label="Fruit" />
    </Combobox>
  ),
};

function MultipleExample(): React.JSX.Element {
  const anchor = React.useRef<HTMLDivElement | null>(null);
  return (
    <Combobox items={FRUITS} multiple defaultValue={['Apple', 'Mango']}>
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(selected: string[]) => (
            <>
              {selected.map((fruit) => (
                <ComboboxChip key={fruit}>{fruit}</ComboboxChip>
              ))}
              <ComboboxChipsInput placeholder="Add fruit" aria-label="Fruits" />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No fruit found.</ComboboxEmpty>
        <ComboboxList>
          {(fruit: string) => (
            <ComboboxItem key={fruit} value={fruit}>
              {fruit}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export const Multiple: Story = {
  render: () => <MultipleExample />,
};
