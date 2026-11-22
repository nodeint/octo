import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AlertVariant } from '@workspace/ui';
import {
  Alert,
  AlertAction,
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
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to your email address.
        </AlertDescription>
      </Alert>
      <Alert {...args}>
        <Icon name="info" />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support. You can enable it in your account settings.
        </AlertDescription>
      </Alert>
    </Stack>
  ),
};

export const Basic: Story = {
  render: (args) => (
    <Alert {...args}>
      <Icon name="circle-check" />
      <AlertTitle>Account updated successfully</AlertTitle>
      <AlertDescription>
        Your profile information has been saved. Changes will be reflected immediately.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args} variant="destructive">
      <Icon name="octagon-x" />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>
        Your payment could not be processed. Please check your payment method and try again.
      </AlertDescription>
    </Alert>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <Stack gap="lg">
      <Alert {...args} variant="default">
        <Icon name="info" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>A neutral callout for general information.</AlertDescription>
      </Alert>
      <Alert {...args} variant="info">
        <Icon name="info" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>A new version is available.</AlertDescription>
      </Alert>
      <Alert {...args} variant="success">
        <Icon name="circle-check" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
      <Alert {...args} variant="warning">
        <Icon name="triangle-alert" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Your storage is almost full.</AlertDescription>
      </Alert>
      <Alert {...args} variant="destructive">
        <Icon name="octagon-x" />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>Something went wrong. Please try again.</AlertDescription>
      </Alert>
    </Stack>
  ),
};

export const Action: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Dark mode is now available</AlertTitle>
      <AlertDescription>Enable it under your profile settings to get started.</AlertDescription>
      <AlertAction>
        <Button size="xs">Enable</Button>
      </AlertAction>
    </Alert>
  ),
};

export const CustomColors: Story = {
  name: 'Custom Colors',
  render: (args) => (
    <Alert
      {...args}
      style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a', color: '#78350f' }}
    >
      <Icon name="triangle-alert" />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription>
        Renew now to avoid service interruption or upgrade to a paid plan to continue using the
        service.
      </AlertDescription>
    </Alert>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <Stack dir="rtl" gap="lg">
      <Alert {...args}>
        <Icon name="circle-check" />
        <AlertTitle>تم الدفع بنجاح</AlertTitle>
        <AlertDescription>
          تمت معالجة دفعتك البالغة 29.99 دولارًا. تم إرسال إيصال إلى عنوان بريدك الإلكتروني.
        </AlertDescription>
      </Alert>
      <Alert {...args}>
        <Icon name="info" />
        <AlertTitle>ميزة جديدة متاحة</AlertTitle>
        <AlertDescription>
          لقد أضفنا دعم الوضع الداكن. يمكنك تفعيله في إعدادات حسابك.
        </AlertDescription>
      </Alert>
    </Stack>
  ),
};
