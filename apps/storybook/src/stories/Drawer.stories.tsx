import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Input,
  Label,
} from '@workspace/ui';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/sheet:
 * - Form rows use inline styles for spacing because stories do not use Tailwind classes.
 * - The Side story caps the top and bottom drawers with an inline `maxHeight` style.
 * - The RTL story uses a `dir="rtl"` wrapper instead of the shadcn translation helper.
 */

const meta = {
  title: 'Overlay/Drawer',
  component: Drawer,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const PARAGRAPHS = Array.from({ length: 10 }, (_, index) => ({ id: index, text: LOREM }));

const FORM_STYLE = { display: 'grid', gap: '1.5rem', padding: '0 1rem' } as const;
const FIELD_STYLE = { display: 'grid', gap: '0.75rem' } as const;

export const Demo: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <div style={FORM_STYLE}>
          <div style={FIELD_STYLE}>
            <Label htmlFor="drawer-demo-name">Name</Label>
            <Input id="drawer-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div style={FIELD_STYLE}>
            <Label htmlFor="drawer-demo-username">Username</Label>
            <Input id="drawer-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
          <Button type="submit">Save changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
};

export const Side: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Drawer key={side} side={side} {...args}>
          <DrawerTrigger render={<Button variant="outline" />}>
            {side.charAt(0).toUpperCase() + side.slice(1)}
          </DrawerTrigger>
          <DrawerContent style={side === 'top' || side === 'bottom' ? { maxHeight: '50vh' } : undefined}>
            <DrawerHeader>
              <DrawerTitle>Edit profile</DrawerTitle>
              <DrawerDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </DrawerDescription>
            </DrawerHeader>
            <div style={{ overflowY: 'auto', padding: '0 1rem' }}>
              {PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.id} style={{ marginBottom: '0.5rem' }}>
                  {paragraph.text}
                </p>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
              <Button type="submit">Save changes</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  ),
};

export const NoCloseButton: Story = {
  name: 'No Close Button',
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger render={<Button variant="outline" />}>Open Drawer</DrawerTrigger>
      <DrawerContent showCloseButton={false}>
        <DrawerHeader>
          <DrawerTitle>No Close Button</DrawerTitle>
          <DrawerDescription>
            This drawer doesn&apos;t have a close button in the top-right corner. Click outside to close.
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <div dir="rtl">
      <Drawer side="left" {...args}>
        <DrawerTrigger render={<Button variant="outline" />}>فتح</DrawerTrigger>
        <DrawerContent dir="rtl">
          <DrawerHeader>
            <DrawerTitle>تعديل الملف الشخصي</DrawerTitle>
            <DrawerDescription>
              قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء.
            </DrawerDescription>
          </DrawerHeader>
          <div style={FORM_STYLE}>
            <div style={FIELD_STYLE}>
              <Label htmlFor="drawer-rtl-name">الاسم</Label>
              <Input id="drawer-rtl-name" defaultValue="بيدرو دوارتي" />
            </div>
            <div style={FIELD_STYLE}>
              <Label htmlFor="drawer-rtl-username">اسم المستخدم</Label>
              <Input id="drawer-rtl-username" defaultValue="@peduarte" />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button variant="outline" />}>إغلاق</DrawerClose>
            <Button type="submit">حفظ التغييرات</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  ),
};
