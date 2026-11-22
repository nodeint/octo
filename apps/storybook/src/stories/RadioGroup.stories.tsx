// Deviation from the shadcn page: the RTL example uses a `dir="rtl"` wrapper instead of the shadcn translation helper.
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const DENSITIES = [
  { value: 'default', label: 'Default', description: 'Standard spacing for most use cases.' },
  { value: 'comfortable', label: 'Comfortable', description: 'More space between elements.' },
  { value: 'compact', label: 'Compact', description: 'Minimal spacing for dense layouts.' },
] as const;

const PLANS = [
  { value: 'plus', title: 'Plus', description: 'For individuals and small teams.' },
  { value: 'pro', title: 'Pro', description: 'For growing businesses.' },
  { value: 'enterprise', title: 'Enterprise', description: 'For large teams and enterprises.' },
] as const;

const BILLING = [
  { value: 'monthly', label: 'Monthly ($9.99/month)' },
  { value: 'yearly', label: 'Yearly ($99.99/year)' },
  { value: 'lifetime', label: 'Lifetime ($299.99)' },
] as const;

const NOTIFICATIONS = [
  { value: 'email', label: 'Email only' },
  { value: 'sms', label: 'SMS only' },
  { value: 'both', label: 'Both Email & SMS' },
] as const;

const RTL_DENSITIES = [
  { value: 'default', label: 'افتراضي', description: 'تباعد قياسي لمعظم حالات الاستخدام.' },
  { value: 'comfortable', label: 'مريح', description: 'مساحة أكبر بين العناصر.' },
  { value: 'compact', label: 'مضغوط', description: 'تباعد أدنى للتخطيطات الكثيفة.' },
] as const;

const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    readOnly: { control: 'boolean' },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { defaultValue: 'option-one' },
  render: (args) => (
    <RadioGroup {...args}>
      <Field orientation="horizontal">
        <RadioGroupItem value="option-one" id="radio-demo-1" />
        <Label htmlFor="radio-demo-1">Option One</Label>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option-two" id="radio-demo-2" />
        <Label htmlFor="radio-demo-2">Option Two</Label>
      </Field>
    </RadioGroup>
  ),
};

export const Description: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      {DENSITIES.map((item) => (
        <Field key={item.value} orientation="horizontal">
          <RadioGroupItem value={item.value} id={`radio-desc-${item.value}`} />
          <FieldContent>
            <FieldLabel htmlFor={`radio-desc-${item.value}`}>{item.label}</FieldLabel>
            <FieldDescription>{item.description}</FieldDescription>
          </FieldContent>
        </Field>
      ))}
    </RadioGroup>
  ),
};

export const ChoiceCard: Story = {
  render: () => (
    <RadioGroup defaultValue="plus">
      {PLANS.map((plan) => (
        <FieldLabel key={plan.value} htmlFor={`radio-plan-${plan.value}`}>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>{plan.title}</FieldTitle>
              <FieldDescription>{plan.description}</FieldDescription>
            </FieldContent>
            <RadioGroupItem value={plan.value} id={`radio-plan-${plan.value}`} />
          </Field>
        </FieldLabel>
      ))}
    </RadioGroup>
  ),
};

export const Fieldset: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend variant="label">Subscription Plan</FieldLegend>
      <FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
      <RadioGroup defaultValue="monthly">
        {BILLING.map((item) => (
          <Field key={item.value} orientation="horizontal">
            <RadioGroupItem value={item.value} id={`radio-plan-billing-${item.value}`} />
            <FieldLabel htmlFor={`radio-plan-billing-${item.value}`}>{item.label}</FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option2">
      <Field orientation="horizontal" data-disabled>
        <RadioGroupItem value="option1" id="radio-disabled-1" disabled />
        <FieldLabel htmlFor="radio-disabled-1">Disabled</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option2" id="radio-disabled-2" />
        <FieldLabel htmlFor="radio-disabled-2">Option 2</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="option3" id="radio-disabled-3" />
        <FieldLabel htmlFor="radio-disabled-3">Option 3</FieldLabel>
      </Field>
    </RadioGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend variant="label">Notification Preferences</FieldLegend>
      <FieldDescription>Choose how you want to receive notifications.</FieldDescription>
      <RadioGroup defaultValue="email">
        {NOTIFICATIONS.map((item) => (
          <Field key={item.value} orientation="horizontal" data-invalid>
            <RadioGroupItem value={item.value} id={`radio-invalid-${item.value}`} aria-invalid />
            <FieldLabel htmlFor={`radio-invalid-${item.value}`}>{item.label}</FieldLabel>
          </Field>
        ))}
      </RadioGroup>
    </FieldSet>
  ),
};

export const Rtl: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" dir="rtl">
      {RTL_DENSITIES.map((item) => (
        <Field key={item.value} orientation="horizontal">
          <RadioGroupItem value={item.value} id={`radio-rtl-${item.value}`} dir="rtl" />
          <FieldContent>
            <FieldLabel htmlFor={`radio-rtl-${item.value}`} dir="rtl">
              {item.label}
            </FieldLabel>
            <FieldDescription dir="rtl">{item.description}</FieldDescription>
          </FieldContent>
        </Field>
      ))}
    </RadioGroup>
  ),
};
