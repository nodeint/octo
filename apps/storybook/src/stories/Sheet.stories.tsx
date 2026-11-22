import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@workspace/ui';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/sheet:
 * - Form rows use inline styles for spacing because stories do not use Tailwind classes.
 * - The Side story caps the top and bottom sheets with an inline `maxHeight` style.
 * - The RTL story uses a `dir="rtl"` wrapper instead of the shadcn translation helper.
 */

const meta = {
  title: 'Overlay/Sheet',
  component: Sheet,
  tags: ['autodocs'],
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

const PARAGRAPHS = Array.from({ length: 10 }, (_, index) => ({ id: index, text: LOREM }));

const FORM_STYLE = { display: 'grid', gap: '1.5rem', padding: '0 1rem' } as const;
const FIELD_STYLE = { display: 'grid', gap: '0.75rem' } as const;

export const Demo: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div style={FORM_STYLE}>
          <div style={FIELD_STYLE}>
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div style={FIELD_STYLE}>
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Side: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Sheet key={side} {...args}>
          <SheetTrigger render={<Button variant="outline" />}>
            {side.charAt(0).toUpperCase() + side.slice(1)}
          </SheetTrigger>
          <SheetContent side={side} style={side === 'top' || side === 'bottom' ? { maxHeight: '50vh' } : undefined}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re done.
              </SheetDescription>
            </SheetHeader>
            <div style={{ overflowY: 'auto', padding: '0 1rem' }}>
              {PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.id} style={{ marginBottom: '0.5rem' }}>
                  {paragraph.text}
                </p>
              ))}
            </div>
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

export const NoCloseButton: Story = {
  name: 'No Close Button',
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger render={<Button variant="outline" />}>Open Sheet</SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle>No Close Button</SheetTitle>
          <SheetDescription>
            This sheet doesn&apos;t have a close button in the top-right corner. Click outside to close.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <div dir="rtl">
      <Sheet {...args}>
        <SheetTrigger render={<Button variant="outline" />}>فتح</SheetTrigger>
        <SheetContent dir="rtl" side="left">
          <SheetHeader>
            <SheetTitle>تعديل الملف الشخصي</SheetTitle>
            <SheetDescription>
              قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء.
            </SheetDescription>
          </SheetHeader>
          <div style={FORM_STYLE}>
            <div style={FIELD_STYLE}>
              <Label htmlFor="sheet-rtl-name">الاسم</Label>
              <Input id="sheet-rtl-name" defaultValue="بيدرو دوارتي" />
            </div>
            <div style={FIELD_STYLE}>
              <Label htmlFor="sheet-rtl-username">اسم المستخدم</Label>
              <Input id="sheet-rtl-username" defaultValue="@peduarte" />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">حفظ التغييرات</Button>
            <SheetClose render={<Button variant="outline" />}>إغلاق</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  ),
};
