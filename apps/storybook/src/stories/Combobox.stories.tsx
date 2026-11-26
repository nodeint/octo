import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  Field,
  FieldLabel,
  Icon,
  InputGroupAddon,
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
  useComboboxAnchor,
} from '@workspace/ui';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const FRAMEWORKS = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'] as const;

const TIMEZONES = [
  {
    value: 'Americas',
    items: [
      '(GMT-5) New York',
      '(GMT-8) Los Angeles',
      '(GMT-6) Chicago',
      '(GMT-5) Toronto',
      '(GMT-8) Vancouver',
      '(GMT-3) São Paulo',
    ],
  },
  {
    value: 'Europe',
    items: [
      '(GMT+0) London',
      '(GMT+1) Paris',
      '(GMT+1) Berlin',
      '(GMT+1) Rome',
      '(GMT+1) Madrid',
      '(GMT+1) Amsterdam',
    ],
  },
  {
    value: 'Asia/Pacific',
    items: [
      '(GMT+9) Tokyo',
      '(GMT+8) Shanghai',
      '(GMT+8) Singapore',
      '(GMT+4) Dubai',
      '(GMT+11) Sydney',
      '(GMT+9) Seoul',
    ],
  },
] as const;

type Country = { code: string; value: string; label: string; continent: string };

const COUNTRIES: readonly Country[] = [
  { code: 'ar', value: 'argentina', label: 'Argentina', continent: 'South America' },
  { code: 'au', value: 'australia', label: 'Australia', continent: 'Oceania' },
  { code: 'br', value: 'brazil', label: 'Brazil', continent: 'South America' },
  { code: 'ca', value: 'canada', label: 'Canada', continent: 'North America' },
  { code: 'cn', value: 'china', label: 'China', continent: 'Asia' },
  { code: 'co', value: 'colombia', label: 'Colombia', continent: 'South America' },
  { code: 'eg', value: 'egypt', label: 'Egypt', continent: 'Africa' },
  { code: 'fr', value: 'france', label: 'France', continent: 'Europe' },
  { code: 'de', value: 'germany', label: 'Germany', continent: 'Europe' },
  { code: 'it', value: 'italy', label: 'Italy', continent: 'Europe' },
  { code: 'jp', value: 'japan', label: 'Japan', continent: 'Asia' },
  { code: 'ke', value: 'kenya', label: 'Kenya', continent: 'Africa' },
  { code: 'mx', value: 'mexico', label: 'Mexico', continent: 'North America' },
  { code: 'nz', value: 'new-zealand', label: 'New Zealand', continent: 'Oceania' },
  { code: 'ng', value: 'nigeria', label: 'Nigeria', continent: 'Africa' },
  { code: 'za', value: 'south-africa', label: 'South Africa', continent: 'Africa' },
  { code: 'kr', value: 'south-korea', label: 'South Korea', continent: 'Asia' },
  { code: 'gb', value: 'united-kingdom', label: 'United Kingdom', continent: 'Europe' },
  { code: 'us', value: 'united-states', label: 'United States', continent: 'North America' },
];

const CATEGORIES = ['technology', 'design', 'business', 'marketing', 'education', 'health'] as const;

const CATEGORY_LABELS_AR: Record<(typeof CATEGORIES)[number], string> = {
  technology: 'التكنولوجيا',
  design: 'التصميم',
  business: 'الأعمال',
  marketing: 'التسويق',
  education: 'التعليم',
  health: 'الصحة',
};

const meta = {
  title: 'Form/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

function FrameworkItems(): React.JSX.Element {
  return (
    <ComboboxContent>
      <ComboboxEmpty>No items found.</ComboboxEmpty>
      <ComboboxList>
        {(item: string) => (
          <ComboboxItem key={item} value={item}>
            {item}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxContent>
  );
}

export const Basic: Story = {
  render: () => (
    <Combobox items={FRAMEWORKS}>
      <ComboboxInput placeholder="Select a framework" aria-label="Framework" />
      <FrameworkItems />
    </Combobox>
  ),
};

function MultipleExample(): React.JSX.Element {
  const anchor = useComboboxAnchor();
  return (
    <Combobox multiple autoHighlight items={FRAMEWORKS} defaultValue={[FRAMEWORKS[0]]}>
      <ComboboxChips ref={anchor}>
        <ComboboxValue>
          {(values: string[]) => (
            <React.Fragment>
              {values.map((value) => (
                <ComboboxChip key={value}>{value}</ComboboxChip>
              ))}
              <ComboboxChipsInput aria-label="Frameworks" />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
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

export const ClearButton: Story = {
  render: () => (
    <Combobox items={FRAMEWORKS} defaultValue={FRAMEWORKS[0]}>
      <ComboboxInput placeholder="Select a framework" aria-label="Framework" showClear />
      <FrameworkItems />
    </Combobox>
  ),
};

export const Groups: Story = {
  render: () => (
    <Combobox items={TIMEZONES}>
      <ComboboxInput placeholder="Select a timezone" aria-label="Timezone" />
      <ComboboxContent>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof TIMEZONES)[number], index: number) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
              {index < TIMEZONES.length - 1 && <ComboboxSeparator />}
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const CustomItems: Story = {
  render: () => (
    <Combobox items={COUNTRIES} itemToStringValue={(country: Country) => country.label}>
      <ComboboxInput placeholder="Search countries..." aria-label="Country" />
      <ComboboxContent>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(country: Country) => (
            <ComboboxItem key={country.code} value={country}>
              <Item size="xs" style={{ padding: 0 }}>
                <ItemContent>
                  <ItemTitle style={{ whiteSpace: 'nowrap' }}>{country.label}</ItemTitle>
                  <ItemDescription>
                    {country.continent} ({country.code})
                  </ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Combobox items={FRAMEWORKS}>
      <ComboboxInput placeholder="Select a framework" aria-label="Framework" aria-invalid="true" />
      <FrameworkItems />
    </Combobox>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Combobox items={FRAMEWORKS}>
      <ComboboxInput placeholder="Select a framework" aria-label="Framework" disabled />
      <FrameworkItems />
    </Combobox>
  ),
};

export const AutoHighlight: Story = {
  render: () => (
    <Combobox items={FRAMEWORKS} autoHighlight>
      <ComboboxInput placeholder="Select a framework" aria-label="Framework" />
      <FrameworkItems />
    </Combobox>
  ),
};

export const Popup: Story = {
  render: () => (
    <Combobox items={COUNTRIES} defaultValue={COUNTRIES[0]}>
      <ComboboxTrigger>
        <ComboboxValue />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput showTrigger={false} placeholder="Search" aria-label="Search countries" />
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(country: Country) => (
            <ComboboxItem key={country.code} value={country}>
              {country.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const WithInputGroup: Story = {
  name: 'Input Group',
  render: () => (
    <Combobox items={TIMEZONES}>
      <ComboboxInput placeholder="Select a timezone" aria-label="Timezone">
        <InputGroupAddon>
          <Icon name="globe" />
        </InputGroupAddon>
      </ComboboxInput>
      <ComboboxContent alignOffset={-28} style={{ width: '15rem' }}>
        <ComboboxEmpty>No timezones found.</ComboboxEmpty>
        <ComboboxList>
          {(group: (typeof TIMEZONES)[number]) => (
            <ComboboxGroup key={group.value} items={group.items}>
              <ComboboxLabel>{group.value}</ComboboxLabel>
              <ComboboxCollection>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxCollection>
            </ComboboxGroup>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

function RtlExample(): React.JSX.Element {
  const anchor = useComboboxAnchor();
  return (
    <Field dir="rtl">
      <FieldLabel>الفئات</FieldLabel>
      <Combobox
        multiple
        autoHighlight
        items={CATEGORIES}
        defaultValue={[CATEGORIES[0]]}
        itemToStringValue={(item: (typeof CATEGORIES)[number]) => CATEGORY_LABELS_AR[item]}
      >
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(values: (typeof CATEGORIES)[number][]) => (
              <React.Fragment>
                {values.map((value) => (
                  <ComboboxChip key={value}>{CATEGORY_LABELS_AR[value]}</ComboboxChip>
                ))}
                <ComboboxChipsInput placeholder="أضف فئات" aria-label="الفئات" />
              </React.Fragment>
            )}
          </ComboboxValue>
        </ComboboxChips>
        <ComboboxContent anchor={anchor} dir="rtl">
          <ComboboxEmpty>لم يتم العثور على فئات.</ComboboxEmpty>
          <ComboboxList>
            {(item: (typeof CATEGORIES)[number]) => (
              <ComboboxItem key={item} value={item}>
                {CATEGORY_LABELS_AR[item]}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  );
}

export const Rtl: Story = {
  name: 'RTL',
  render: () => <RtlExample />,
};
