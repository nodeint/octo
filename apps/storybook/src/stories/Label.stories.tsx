import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Checkbox,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  Flex,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const MONTH_COUNT = 12;
const MONTH_DIGITS = 2;
const YEAR_COUNT = 6;

const MONTHS = Array.from({ length: MONTH_COUNT }, (_, index) => {
  const month = String(index + 1).padStart(MONTH_DIGITS, '0');
  return { label: month, value: month };
});

const YEARS = Array.from({ length: YEAR_COUNT }, (_, index) => {
  const year = String(new Date().getFullYear() + index);
  return { label: year, value: year };
});

const meta = {
  title: 'Typography/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: (args) => (
    <Flex gap="sm" align="center">
      <Checkbox id="label-terms" />
      <Label htmlFor="label-terms" {...args}>
        Accept terms and conditions
      </Label>
    </Flex>
  ),
};

export const LabelInField: Story = {
  name: 'Label in Field',
  parameters: {
    storyWidth: 'lg',
    docs: {
      description: {
        story: 'For form fields, use `Field` with `FieldLabel`, `FieldDescription`, and `FieldError`.',
      },
    },
  },
  decorators: [storyWidthDecorator],
  render: () => (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Payment Method</FieldLegend>
          <FieldDescription>All transactions are secure and encrypted.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="label-field-name">Name on Card</FieldLabel>
              <Input id="label-field-name" placeholder="Evil Rabbit" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="label-field-number">Card Number</FieldLabel>
              <Input id="label-field-number" placeholder="1234 5678 9012 3456" required />
              <FieldDescription>Enter your 16-digit card number.</FieldDescription>
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <Field>
                <FieldLabel htmlFor="label-field-month">Month</FieldLabel>
                <Select items={MONTHS}>
                  <SelectTrigger id="label-field-month" width="full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {MONTHS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="label-field-year">Year</FieldLabel>
                <Select items={YEARS}>
                  <SelectTrigger id="label-field-year" width="full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {YEARS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="label-field-cvv">CVV</FieldLabel>
                <Input id="label-field-cvv" placeholder="123" required />
              </Field>
            </div>
          </FieldGroup>
        </FieldSet>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend>Billing Address</FieldLegend>
          <FieldDescription>The billing address associated with your payment method.</FieldDescription>
          <FieldGroup>
            <Field orientation="horizontal">
              <Checkbox id="label-field-same-address" defaultChecked />
              <FieldLabel htmlFor="label-field-same-address">Same as shipping address</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="label-field-comments">Comments</FieldLabel>
              <Textarea id="label-field-comments" placeholder="Add any additional comments" />
            </Field>
          </FieldGroup>
        </FieldSet>
        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>
          <Button variant="outline" type="button">Cancel</Button>
        </Field>
      </FieldGroup>
    </form>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <Flex gap="sm" align="center" dir="rtl">
      <Checkbox id="label-terms-rtl" dir="rtl" />
      <Label htmlFor="label-terms-rtl" dir="rtl" {...args}>
        قبول الشروط والأحكام
      </Label>
    </Flex>
  ),
};
