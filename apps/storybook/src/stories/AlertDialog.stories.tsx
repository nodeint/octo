import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Icon,
  Media,
  Stack,
} from '@workspace/ui';

const meta = {
  title: 'Overlay/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * The icon catalog has no bluetooth or circle-fading-plus glyph, so the media stories use
 * info and upload instead.
 */

export const Basic: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="outline">Show Dialog</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Small: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="outline">Show Dialog</Button>} />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to allow the USB accessory to connect to this device?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
          <AlertDialogAction>Allow</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const WithMedia: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="outline">Share Project</Button>} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Media size="lg">
            <Icon name="upload" />
          </Media>
          <AlertDialogTitle>Share this project?</AlertDialogTitle>
          <AlertDialogDescription>
            Anyone with the link will be able to view and edit this project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Share</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const SmallWithMedia: Story = {
  name: 'Small with Media',
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="outline">Show Dialog</Button>} />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <Media size="lg">
            <Icon name="info" />
          </Media>
          <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to allow the USB accessory to connect to this device?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
          <AlertDialogAction>Allow</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Destructive: Story = {
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger render={<Button variant="destructive">Delete Chat</Button>} />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <Media size="lg">
            <Icon name="trash" />
          </Media>
          <AlertDialogTitle>Delete chat?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this chat conversation. View <a href="#">Settings</a> to
            delete any memories saved during this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <Stack dir="rtl" gap="lg">
      <AlertDialog {...args}>
        <AlertDialogTrigger render={<Button variant="outline">إظهار الحوار</Button>} />
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
            <AlertDialogDescription>
              لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك نهائيًا من خوادمنا.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction>متابعة</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog {...args}>
        <AlertDialogTrigger render={<Button variant="outline">إظهار الحوار (صغير)</Button>} />
        <AlertDialogContent size="sm" dir="rtl">
          <AlertDialogHeader>
            <Media size="lg">
              <Icon name="info" />
            </Media>
            <AlertDialogTitle>السماح للملحق بالاتصال؟</AlertDialogTitle>
            <AlertDialogDescription>
              هل تريد السماح لملحق USB بالاتصال بهذا الجهاز؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>عدم السماح</AlertDialogCancel>
            <AlertDialogAction>السماح</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Stack>
  ),
};
