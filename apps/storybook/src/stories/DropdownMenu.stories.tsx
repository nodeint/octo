import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonSize, ButtonVariant } from '@workspace/ui';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Icon,
} from '@workspace/ui';
import * as React from 'react';

const VARIANTS = ['default', 'outline', 'secondary', 'ghost'] as const satisfies readonly ButtonVariant[];

const SIZES = ['xs', 'sm', 'md', 'lg'] as const satisfies readonly ButtonSize[];

const meta = {
  title: 'Overlay/DropdownMenu',
  component: DropdownMenuTrigger,
  tags: ['autodocs'],
  args: { variant: 'outline', children: 'Open' },
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    size: { control: 'inline-radio', options: SIZES },
    shape: { control: 'inline-radio', options: ['default', 'icon'] },
  },
} satisfies Meta<typeof DropdownMenuTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * The icon catalog has no credit-card, bell, mail, message, wallet, share, sun, layout or shield glyph,
 * so these stories use the closest names it does have.
 */

export const Basic: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent size="xs">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuItem disabled>API</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Submenu: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent size="xs">
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Calendly</DropdownMenuItem>
                      <DropdownMenuItem>Slack</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Webhook</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Advanced...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const SeparatorInset: Story = {
  name: 'Separator Inset',
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent size="sm">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator inset />
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Shortcuts: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent size="xs">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const Icons: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent size="xs">
        <DropdownMenuItem>
          <Icon name="user" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="tag" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="settings" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Icon name="log-out" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

function CheckboxesDemo(args: React.ComponentProps<typeof DropdownMenuTrigger>): React.JSX.Element {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent size="xs">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar} disabled>
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const Checkboxes: Story = {
  render: (args) => <CheckboxesDemo {...args} />,
};

function CheckboxesIconsDemo(args: React.ComponentProps<typeof DropdownMenuTrigger>): React.JSX.Element {
  const [notifications, setNotifications] = React.useState({ email: true, sms: false, push: true });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent size="sm">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications.email}
            onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
          >
            <Icon name="inbox" />
            Email notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.sms}
            onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
          >
            <Icon name="sticky-note" />
            SMS notifications
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.push}
            onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
          >
            <Icon name="info" />
            Push notifications
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const CheckboxesIcons: Story = {
  name: 'Checkboxes Icons',
  args: { children: 'Notifications' },
  render: (args) => <CheckboxesIconsDemo {...args} />,
};

function RadioGroupDemo(args: React.ComponentProps<typeof DropdownMenuTrigger>): React.JSX.Element {
  const [position, setPosition] = React.useState('bottom');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent size="xs">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const RadioGroup: Story = {
  name: 'Radio Group',
  render: (args) => <RadioGroupDemo {...args} />,
};

function RadioIconsDemo(args: React.ComponentProps<typeof DropdownMenuTrigger>): React.JSX.Element {
  const [paymentMethod, setPaymentMethod] = React.useState('card');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent size="sm">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <DropdownMenuRadioItem value="card">
              <Icon name="tag" />
              Credit Card
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="paypal">
              <Icon name="box" />
              PayPal
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bank">
              <Icon name="building" />
              Bank Transfer
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const RadioIcons: Story = {
  name: 'Radio Icons',
  args: { children: 'Payment Method' },
  render: (args) => <RadioIconsDemo {...args} />,
};

export const Destructive: Story = {
  args: { children: 'Actions' },
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent size="xs">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name="pencil" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="external-link" />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <Icon name="trash" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const AvatarTrigger: Story = {
  name: 'Avatar',
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} variant="ghost" shape="icon" aria-label="Account menu">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" size="xs">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name="shield-check" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="tag" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="info" />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="log-out" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

function ComplexDemo(args: React.ComponentProps<typeof DropdownMenuTrigger>): React.JSX.Element {
  const [notifications, setNotifications] = React.useState({ email: true, sms: false, push: true });
  const [theme, setTheme] = React.useState('light');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} />
      <DropdownMenuContent size="sm">
        <DropdownMenuGroup>
          <DropdownMenuLabel>File</DropdownMenuLabel>
          <DropdownMenuItem>
            <Icon name="file" />
            New File
            <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="folder" />
            New Folder
            <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icon name="history" />
              Open Recent
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Icon name="code-2" />
                    Project Alpha
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="code-2" />
                    Project Beta
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Icon name="more-horizontal" />
                      More Projects
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Icon name="code-2" />
                          Project Gamma
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Icon name="code-2" />
                          Project Delta
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Icon name="search" />
                    Browse...
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icon name="clipboard" />
            Save
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="download" />
            Export
            <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={notifications.email}
            onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
          >
            <Icon name="eye" />
            Show Sidebar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={notifications.sms}
            onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
          >
            <Icon name="panel-left" />
            Show Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icon name="palette" />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem value="light">
                      <Icon name="sparkles" />
                      Light
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <Icon name="moon" />
                      Dark
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <Icon name="laptop" />
                      System
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <Icon name="user" />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="tag" />
            Billing
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Icon name="settings" />
              Settings
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Icon name="keyboard" />
                    Keyboard Shortcuts
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="globe" />
                    Language
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Icon name="info" />
                      Notifications
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Notification Types</DropdownMenuLabel>
                          <DropdownMenuCheckboxItem
                            checked={notifications.push}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                          >
                            <Icon name="info" />
                            Push Notifications
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem
                            checked={notifications.email}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                          >
                            <Icon name="inbox" />
                            Email Notifications
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Icon name="shield-check" />
                    Privacy & Security
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name="circle-help" />
            Help & Support
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="file-text" />
            Documentation
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">
            <Icon name="log-out" />
            Sign Out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const Complex: Story = {
  args: { children: 'Complex Menu' },
  render: (args) => <ComplexDemo {...args} />,
};

function RtlDemo(args: React.ComponentProps<typeof DropdownMenuTrigger>): React.JSX.Element {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);
  const [position, setPosition] = React.useState('bottom');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...args} dir="rtl" />
      <DropdownMenuContent align="end" dir="rtl" size="xs">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>الحساب</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent dir="rtl">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Icon name="user" />
                    الملف الشخصي
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="tag" />
                    الفوترة
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon name="settings" />
                    الإعدادات
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>الفريق</DropdownMenuLabel>
          <DropdownMenuItem>الفريق</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>دعوة المستخدمين</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent dir="rtl">
                <DropdownMenuItem>البريد الإلكتروني</DropdownMenuItem>
                <DropdownMenuItem>رسالة</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>المزيد</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent dir="rtl">
                      <DropdownMenuItem>تقويم</DropdownMenuItem>
                      <DropdownMenuItem>دردشة</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>خطاف ويب</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem>متقدم...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            فريق جديد
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>عرض</DropdownMenuLabel>
          <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
            شريط الحالة
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
            شريط النشاط
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
            اللوحة
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>الموضع</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">أعلى</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">أسفل</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">يمين</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="left">يسار</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive">تسجيل الخروج</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const Rtl: Story = {
  name: 'RTL',
  args: { children: 'افتح القائمة' },
  render: (args) => <RtlDemo {...args} />,
};
