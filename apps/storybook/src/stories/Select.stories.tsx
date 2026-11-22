import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Switch,
} from '@workspace/ui';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const FRUITS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Grapes', value: 'grapes' },
  { label: 'Pineapple', value: 'pineapple' },
] as const;

const VEGETABLES = [
  { label: 'Carrot', value: 'carrot' },
  { label: 'Broccoli', value: 'broccoli' },
  { label: 'Spinach', value: 'spinach' },
] as const;

const TIMEZONES = [
  {
    label: 'North America',
    items: [
      { label: 'Eastern Standard Time (EST)', value: 'est' },
      { label: 'Central Standard Time (CST)', value: 'cst' },
      { label: 'Mountain Standard Time (MST)', value: 'mst' },
      { label: 'Pacific Standard Time (PST)', value: 'pst' },
      { label: 'Alaska Standard Time (AKST)', value: 'akst' },
      { label: 'Hawaii Standard Time (HST)', value: 'hst' },
    ],
  },
  {
    label: 'Europe & Africa',
    items: [
      { label: 'Greenwich Mean Time (GMT)', value: 'gmt' },
      { label: 'Central European Time (CET)', value: 'cet' },
      { label: 'Eastern European Time (EET)', value: 'eet' },
      { label: 'Western European Summer Time (WEST)', value: 'west' },
      { label: 'Central Africa Time (CAT)', value: 'cat' },
      { label: 'East Africa Time (EAT)', value: 'eat' },
    ],
  },
  {
    label: 'Asia',
    items: [
      { label: 'Moscow Time (MSK)', value: 'msk' },
      { label: 'India Standard Time (IST)', value: 'ist' },
      { label: 'China Standard Time (CST)', value: 'cst_china' },
      { label: 'Japan Standard Time (JST)', value: 'jst' },
      { label: 'Korea Standard Time (KST)', value: 'kst' },
      { label: 'Indonesia Central Standard Time (WITA)', value: 'ist_indonesia' },
    ],
  },
  {
    label: 'Australia & Pacific',
    items: [
      { label: 'Australian Western Standard Time (AWST)', value: 'awst' },
      { label: 'Australian Central Standard Time (ACST)', value: 'acst' },
      { label: 'Australian Eastern Standard Time (AEST)', value: 'aest' },
      { label: 'New Zealand Standard Time (NZST)', value: 'nzst' },
      { label: 'Fiji Time (FJT)', value: 'fjt' },
    ],
  },
  {
    label: 'South America',
    items: [
      { label: 'Argentina Time (ART)', value: 'art' },
      { label: 'Bolivia Time (BOT)', value: 'bot' },
      { label: 'Brasilia Time (BRT)', value: 'brt' },
      { label: 'Chile Standard Time (CLT)', value: 'clt' },
    ],
  },
] as const;

const RTL_LANGUAGES = [
  { label: 'الإنجليزية', value: 'en' },
  { label: 'العربية', value: 'ar' },
  { label: 'العبرية', value: 'he' },
] as const;

const meta = {
  title: 'Form/Select',
  component: SelectTrigger,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['field', 'ghost'] },
    width: { control: 'inline-radio', options: ['hug', 'full'] },
    disabled: { control: 'boolean' },
  },
  args: { width: 'full' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof SelectTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: (args) => (
    <Select items={FRUITS}>
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {FRUITS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};



export const AlignItem: Story = {
  parameters: { storyWidth: 'md' },
  render: function AlignItemDemo(args: React.ComponentProps<typeof SelectTrigger>): React.JSX.Element {
    const [alignItemWithTrigger, setAlignItemWithTrigger] = React.useState(true);

    return (
      <FieldGroup>
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="select-align-item">Align Item</FieldLabel>
            <FieldDescription>Toggle to align the item with the trigger.</FieldDescription>
          </FieldContent>
          <Switch
            id="select-align-item"
            checked={alignItemWithTrigger}
            onCheckedChange={setAlignItemWithTrigger}
          />
        </Field>
        <Field>
          <Select items={FRUITS} defaultValue="banana">
            <SelectTrigger {...args}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={alignItemWithTrigger}>
              <SelectGroup>
                {FRUITS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>
    );
  },
};

export const Groups: Story = {
  render: (args) => (
    <Select>
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {FRUITS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          {VEGETABLES.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Scrollable: Story = {
  parameters: { storyWidth: 'md' },
  render: (args) => (
    <Select>
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        {TIMEZONES.map((region) => (
          <SelectGroup key={region.label}>
            <SelectLabel>{region.label}</SelectLabel>
            {region.items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select disabled>
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {FRUITS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const DisabledItem: Story = {
  name: 'Disabled Item',
  render: (args) => (
    <Select>
      <SelectTrigger {...args}>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {FRUITS.map((item) => (
            <SelectItem key={item.value} value={item.value} disabled={item.value === 'grapes'}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

export const Invalid: Story = {
  render: (args) => (
    <Field data-invalid>
      <FieldLabel htmlFor="select-invalid">Fruit</FieldLabel>
      <Select items={FRUITS}>
        <SelectTrigger {...args} id="select-invalid" aria-invalid>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {FRUITS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldError>Please select a fruit.</FieldError>
    </Field>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <Select items={RTL_LANGUAGES} defaultValue="ar">
      <SelectTrigger {...args} dir="rtl">
        <SelectValue placeholder="اختر لغة" />
      </SelectTrigger>
      <SelectContent dir="rtl">
        <SelectGroup>
          <SelectLabel>اللغات</SelectLabel>
          {RTL_LANGUAGES.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
