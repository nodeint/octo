import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Slider,
  Switch,
  Textarea,
} from '@workspace/ui';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const MONTH_COUNT = 12;
const MONTH_DIGITS = 2;
const DEFAULT_PRICE = 200;

const DEPARTMENTS = [
  { label: 'Engineering', value: 'engineering' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
] as const;

const MONTHS = [
  { label: 'MM', value: null },
  ...Array.from({ length: MONTH_COUNT }, (_, index) => {
    const month = String(index + 1).padStart(MONTH_DIGITS, '0');
    return { label: month, value: month };
  }),
];

const YEARS = [
  { label: 'YYYY', value: null },
  ...Array.from({ length: 6 }, (_, index) => {
    const year = String(new Date().getFullYear() + index);
    return { label: year, value: year };
  }),
];

const PLANS = [
  { value: 'plus', title: 'Plus', description: 'For individuals and small teams.' },
  { value: 'pro', title: 'Pro', description: 'For growing businesses.' },
  { value: 'enterprise', title: 'Enterprise', description: 'For large teams and enterprises.' },
] as const;

const meta = {
  title: 'Form/Field',
  component: Field,
  tags: ['autodocs'],
  parameters: { storyWidth: 'lg' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => (
    <form>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Payment Method</FieldLegend>
          <FieldDescription>All transactions are secure and encrypted.</FieldDescription>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-demo-name">Name on Card</FieldLabel>
              <Input id="field-demo-name" placeholder="Evil Rabbit" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="field-demo-number">Card Number</FieldLabel>
              <Input id="field-demo-number" placeholder="1234 5678 9012 3456" required />
              <FieldDescription>Enter your 16-digit card number.</FieldDescription>
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <Field>
                <FieldLabel htmlFor="field-demo-month">Month</FieldLabel>
                <Select items={MONTHS}>
                  <SelectTrigger id="field-demo-month" width="full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {MONTHS.filter((item) => item.value !== null).map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="field-demo-year">Year</FieldLabel>
                <Select items={YEARS}>
                  <SelectTrigger id="field-demo-year" width="full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {YEARS.filter((item) => item.value !== null).map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="field-demo-cvv">CVV</FieldLabel>
                <Input id="field-demo-cvv" placeholder="123" required />
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
              <Checkbox id="field-demo-same-address" defaultChecked />
              <FieldLabel htmlFor="field-demo-same-address">
                Same as shipping address
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="field-demo-comments">Comments</FieldLabel>
              <Textarea id="field-demo-comments" placeholder="Add any additional comments" />
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

export const InputField: Story = {
  render: () => (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-input-username">Username</FieldLabel>
          <Input id="field-input-username" type="text" placeholder="Max Leiter" />
          <FieldDescription>Choose a unique username for your account.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="field-input-password">Password</FieldLabel>
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
          <Input id="field-input-password" type="password" placeholder="••••••••" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const TextareaField: Story = {
  render: () => (
    <FieldSet>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-textarea-feedback">Feedback</FieldLabel>
          <Textarea
            id="field-textarea-feedback"
            placeholder="Your feedback helps us improve..."
            rows={4}
          />
          <FieldDescription>Share your thoughts about our service.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};

export const SelectField: Story = {
  render: () => (
    <Field>
      <FieldLabel htmlFor="field-select-department">Department</FieldLabel>
      <Select items={DEPARTMENTS}>
        <SelectTrigger id="field-select-department" width="full">
          <SelectValue placeholder="Choose department" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {DEPARTMENTS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>Select your department or area of work.</FieldDescription>
    </Field>
  ),
};

export const SliderField: Story = {
  render: function SliderFieldDemo(): React.JSX.Element {
    const [value, setValue] = React.useState<number>(DEFAULT_PRICE);

    return (
      <Field>
        <FieldTitle>Price Range</FieldTitle>
        <FieldDescription>
          Set your budget range ($
          <strong>{value}</strong>
          ).
        </FieldDescription>
        <Slider
          value={value}
          onValueChange={(next) => setValue(next)}
          max={1000}
          min={0}
          step={10}
          aria-label="Price Range"
        />
      </Field>
    );
  },
};

export const Fieldset: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Address Information</FieldLegend>
      <FieldDescription>We need your address to deliver your order.</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-fieldset-street">Street Address</FieldLabel>
          <Input id="field-fieldset-street" type="text" placeholder="123 Main St" />
        </Field>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
          <Field>
            <FieldLabel htmlFor="field-fieldset-city">City</FieldLabel>
            <Input id="field-fieldset-city" type="text" placeholder="New York" />
          </Field>
          <Field>
            <FieldLabel htmlFor="field-fieldset-zip">Postal Code</FieldLabel>
            <Input id="field-fieldset-zip" type="text" placeholder="90502" />
          </Field>
        </div>
      </FieldGroup>
    </FieldSet>
  ),
};

export const CheckboxField: Story = {
  render: () => (
    <FieldGroup>
      <FieldSet>
        <FieldLegend variant="label">Show these items on the desktop</FieldLegend>
        <FieldDescription>Select the items you want to show on the desktop.</FieldDescription>
        <FieldGroup>
          <Field orientation="horizontal">
            <Checkbox id="field-checkbox-hard-disks" />
            <FieldLabel htmlFor="field-checkbox-hard-disks">Hard disks</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="field-checkbox-external-disks" />
            <FieldLabel htmlFor="field-checkbox-external-disks">External disks</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="field-checkbox-cds" />
            <FieldLabel htmlFor="field-checkbox-cds">CDs, DVDs, and iPods</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="field-checkbox-servers" />
            <FieldLabel htmlFor="field-checkbox-servers">Connected servers</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <Field orientation="horizontal">
        <Checkbox id="field-checkbox-sync" defaultChecked />
        <FieldContent>
          <FieldLabel htmlFor="field-checkbox-sync">Sync Desktop & Documents folders</FieldLabel>
          <FieldDescription>
            Your Desktop & Documents folders are being synced with iCloud Drive.
          </FieldDescription>
        </FieldContent>
      </Field>
    </FieldGroup>
  ),
};

export const RadioField: Story = {
  render: () => (
    <FieldSet>
      <FieldLegend>Subscription Plan</FieldLegend>
      <FieldDescription>Yearly and lifetime plans offer significant savings.</FieldDescription>
      <RadioGroup defaultValue="monthly">
        <Field orientation="horizontal">
          <RadioGroupItem value="monthly" id="field-radio-monthly" />
          <FieldLabel htmlFor="field-radio-monthly">Monthly ($9.99/month)</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="yearly" id="field-radio-yearly" />
          <FieldLabel htmlFor="field-radio-yearly">Yearly ($99.99/year)</FieldLabel>
        </Field>
        <Field orientation="horizontal">
          <RadioGroupItem value="lifetime" id="field-radio-lifetime" />
          <FieldLabel htmlFor="field-radio-lifetime">Lifetime ($299.99)</FieldLabel>
        </Field>
      </RadioGroup>
    </FieldSet>
  ),
};

export const SwitchField: Story = {
  render: () => (
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor="field-switch-2fa">Multi-factor authentication</FieldLabel>
        <FieldDescription>
          Enable multi-factor authentication. If you do not have a two-factor device, you can use a
          one-time code sent to your email.
        </FieldDescription>
      </FieldContent>
      <Switch id="field-switch-2fa" />
    </Field>
  ),
};

export const ChoiceCard: Story = {
  render: () => (
    <FieldGroup>
      <FieldSet>
        <FieldLegend variant="label">Compute Environment</FieldLegend>
        <FieldDescription>Select the compute environment for your cluster.</FieldDescription>
        <RadioGroup defaultValue="kubernetes">
          <FieldLabel htmlFor="field-choice-card-kubernetes">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Kubernetes</FieldTitle>
                <FieldDescription>Run GPU workloads on a K8s configured cluster.</FieldDescription>
              </FieldContent>
              <RadioGroupItem value="kubernetes" id="field-choice-card-kubernetes" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="field-choice-card-vm">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Virtual Machine</FieldTitle>
                <FieldDescription>
                  Access a VM configured cluster to run GPU workloads.
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem value="vm" id="field-choice-card-vm" />
            </Field>
          </FieldLabel>
        </RadioGroup>
      </FieldSet>
      <FieldSet>
        <FieldLegend variant="label">Plan</FieldLegend>
        <RadioGroup defaultValue="plus">
          {PLANS.map((plan) => (
            <FieldLabel key={plan.value} htmlFor={`field-choice-card-${plan.value}`}>
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>{plan.title}</FieldTitle>
                  <FieldDescription>{plan.description}</FieldDescription>
                </FieldContent>
                <RadioGroupItem value={plan.value} id={`field-choice-card-${plan.value}`} />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </FieldSet>
    </FieldGroup>
  ),
};

export const FieldGroupStory: Story = {
  name: 'Field Group',
  render: () => (
    <FieldGroup>
      <FieldSet>
        <FieldLegend variant="label">Responses</FieldLegend>
        <FieldDescription>
          Get notified when ChatGPT responds to requests that take time, like research or image
          generation.
        </FieldDescription>
        <FieldGroup data-slot="checkbox-group">
          <Field orientation="horizontal">
            <Checkbox id="field-group-push" defaultChecked disabled />
            <FieldLabel htmlFor="field-group-push">Push notifications</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
      <FieldSet>
        <FieldLegend variant="label">Tasks</FieldLegend>
        <FieldDescription>
          Get notified when tasks you&apos;ve created have updates.
        </FieldDescription>
        <FieldGroup data-slot="checkbox-group">
          <Field orientation="horizontal">
            <Checkbox id="field-group-tasks-push" />
            <FieldLabel htmlFor="field-group-tasks-push">Push notifications</FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="field-group-tasks-email" />
            <FieldLabel htmlFor="field-group-tasks-email">Email notifications</FieldLabel>
          </Field>
        </FieldGroup>
      </FieldSet>
    </FieldGroup>
  ),
};

export const ResponsiveLayout: Story = {
  parameters: { storyWidth: 'lg' },
  render: () => (
    <form>
      <FieldSet>
        <FieldLegend>Profile</FieldLegend>
        <FieldDescription>Fill in your profile information.</FieldDescription>
        <FieldSeparator />
        <FieldGroup>
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor="field-responsive-name">Name</FieldLabel>
              <FieldDescription>Provide your full name for identification.</FieldDescription>
            </FieldContent>
            <Input id="field-responsive-name" placeholder="Evil Rabbit" required />
          </Field>
          <FieldSeparator />
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor="field-responsive-message">Message</FieldLabel>
              <FieldDescription>
                You can write your message here. Keep it short, preferably under 100 characters.
              </FieldDescription>
            </FieldContent>
            <Textarea
              id="field-responsive-message"
              placeholder="Hello, world!"
              required
            />
          </Field>
          <FieldSeparator />
          <Field orientation="responsive">
            <Button type="submit">Submit</Button>
            <Button type="button" variant="outline">Cancel</Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  ),
};

export const Validation: Story = {
  render: () => (
    <Field data-invalid="true">
      <FieldLabel htmlFor="field-validation-email">Email</FieldLabel>
      <Input id="field-validation-email" type="email" aria-invalid defaultValue="not-an-email" />
      <FieldDescription>Enter the email associated with your account.</FieldDescription>
      <FieldError>Enter a valid email address.</FieldError>
    </Field>
  ),
};

export const FieldSeparatorWithText: Story = {
  name: 'Separator With Text',
  render: () => (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="field-separator-email">Email</FieldLabel>
        <Input id="field-separator-email" type="email" placeholder="m@example.com" />
      </Field>
      <FieldSeparator>Or continue with</FieldSeparator>
      <Field>
        <Button variant="outline" type="button">Continue with GitHub</Button>
      </Field>
    </FieldGroup>
  ),
};
