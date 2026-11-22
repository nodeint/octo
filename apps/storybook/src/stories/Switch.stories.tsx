// Deviations from the shadcn page: the RTL example uses a `dir="rtl"` wrapper instead of the shadcn translation
// helper, and the Size example uses this component's `md` size where shadcn names it `default`.
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
  Switch,
} from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Form/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'sm'] },
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: { 'aria-label': 'Toggle' },
};

export const Description: Story = {
  render: () => (
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel htmlFor="switch-focus-mode">Share across devices</FieldLabel>
        <FieldDescription>Focus is shared across devices, and turns off when you leave the app.</FieldDescription>
      </FieldContent>
      <Switch id="switch-focus-mode" />
    </Field>
  ),
};

export const ChoiceCard: Story = {
  render: () => (
    <FieldGroup>
      <FieldLabel htmlFor="switch-share">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>Focus is shared across devices, and turns off when you leave the app.</FieldDescription>
          </FieldContent>
          <Switch id="switch-share" />
        </Field>
      </FieldLabel>
      <FieldLabel htmlFor="switch-notifications">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Enable notifications</FieldTitle>
            <FieldDescription>Receive notifications when focus mode is enabled or disabled.</FieldDescription>
          </FieldContent>
          <Switch id="switch-notifications" defaultChecked />
        </Field>
      </FieldLabel>
    </FieldGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field orientation="horizontal" data-disabled>
      <Switch id="switch-disabled" disabled />
      <FieldLabel htmlFor="switch-disabled">Disabled</FieldLabel>
    </Field>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field orientation="horizontal" data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-terms">Accept terms and conditions</FieldLabel>
        <FieldDescription>You must accept the terms and conditions to continue.</FieldDescription>
      </FieldContent>
      <Switch id="switch-terms" aria-invalid />
    </Field>
  ),
};

export const Size: Story = {
  render: () => (
    <FieldGroup>
      <Field orientation="horizontal">
        <Switch id="switch-size-sm" size="sm" />
        <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="switch-size-md" size="md" />
        <FieldLabel htmlFor="switch-size-md">Default</FieldLabel>
      </Field>
    </FieldGroup>
  ),
};

export const Rtl: Story = {
  render: () => (
    <Field orientation="horizontal" dir="rtl">
      <FieldContent>
        <FieldLabel htmlFor="switch-focus-mode-rtl" dir="rtl">
          المشاركة عبر الأجهزة
        </FieldLabel>
        <FieldDescription dir="rtl">يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.</FieldDescription>
      </FieldContent>
      <Switch id="switch-focus-mode-rtl" dir="rtl" />
    </Field>
  ),
};
