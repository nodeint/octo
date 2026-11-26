import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AlertVariant } from '@workspace/ui';
import {
  Alert,
  AlertAction,
  AlertContent,
  AlertDescription,
  AlertTitle,
  Button,
  Icon,
  Stack,
} from '@workspace/ui';

const VARIANTS = [
  'default',
  'info',
  'success',
  'warning',
  'destructive',
] as const satisfies readonly AlertVariant[];

const meta = {
  title: 'Data Display/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: 448 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * The icon catalog has no circle-alert glyph, so the destructive stories use octagon-x.
 */

export const Demo: Story = {
  render: (args) => (
    <Stack gap="lg">
      <Alert {...args}>
        <Icon name="circle-check" />
        <AlertContent>
          <AlertTitle>Payment successful</AlertTitle>
          <AlertDescription>
            Your payment of $29.99 has been processed. A receipt has been sent to your email address.
          </AlertDescription>
        </AlertContent>
      </Alert>
      <Alert {...args}>
        <Icon name="info" />
        <AlertContent>
          <AlertTitle>New feature available</AlertTitle>
          <AlertDescription>
            We&apos;ve added dark mode support. You can enable it in your account settings.
          </AlertDescription>
        </AlertContent>
      </Alert>
    </Stack>
  ),
};

export const Basic: Story = {
  render: (args) => (
    <Alert {...args}>
      <Icon name="circle-check" />
      <AlertContent>
        <AlertTitle>Account updated successfully</AlertTitle>
        <AlertDescription>
          Your profile information has been saved. Changes will be reflected immediately.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args} variant="destructive">
      <Icon name="octagon-x" />
      <AlertContent>
        <AlertTitle>Payment failed</AlertTitle>
        <AlertDescription>
          Your payment could not be processed. Please check your payment method and try again.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <Stack gap="lg">
      <Alert {...args} variant="default">
        <Icon name="info" />
        <AlertContent>
          <AlertTitle>Default</AlertTitle>
          <AlertDescription>A neutral callout for general information.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert {...args} variant="info">
        <Icon name="info" />
        <AlertContent>
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>A new version is available.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert {...args} variant="success">
        <Icon name="circle-check" />
        <AlertContent>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Your changes have been saved.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert {...args} variant="warning">
        <Icon name="triangle-alert" />
        <AlertContent>
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Your storage is almost full.</AlertDescription>
        </AlertContent>
      </Alert>
      <Alert {...args} variant="destructive">
        <Icon name="octagon-x" />
        <AlertContent>
          <AlertTitle>Destructive</AlertTitle>
          <AlertDescription>Something went wrong. Please try again.</AlertDescription>
        </AlertContent>
      </Alert>
    </Stack>
  ),
};

export const Action: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertContent>
        <AlertTitle>Dark mode is now available</AlertTitle>
        <AlertDescription>Enable it under your profile settings to get started.</AlertDescription>
      </AlertContent>
      <AlertAction>
        <Button size="xs">Enable</Button>
      </AlertAction>
    </Alert>
  ),
};

export const CustomColors: Story = {
  name: 'Custom Colors',
  render: (args) => (
    <Alert {...args} tone="purple">
      <Icon name="triangle-alert" />
      <AlertContent>
        <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
        <AlertDescription>
          Renew now to avoid service interruption or upgrade to a paid plan to continue using the
          service.
        </AlertDescription>
      </AlertContent>
    </Alert>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <Stack dir="rtl" gap="lg">
      <Alert {...args}>
        <Icon name="circle-check" />
        <AlertContent>
          <AlertTitle>تم الدفع بنجاح</AlertTitle>
          <AlertDescription>
            تمت معالجة دفعتك البالغة 29.99 دولارًا. تم إرسال إيصال إلى عنوان بريدك الإلكتروني.
          </AlertDescription>
        </AlertContent>
      </Alert>
      <Alert {...args}>
        <Icon name="info" />
        <AlertContent>
          <AlertTitle>ميزة جديدة متاحة</AlertTitle>
          <AlertDescription>
            لقد أضفنا دعم الوضع الداكن. يمكنك تفعيله في إعدادات حسابك.
          </AlertDescription>
        </AlertContent>
      </Alert>
    </Stack>
  ),
};
