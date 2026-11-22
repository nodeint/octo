import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  Icon,
} from '@workspace/ui';
import * as React from 'react';
import { storyWidthDecorator } from '../story-width';

const TRIGGER_STYLE = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  aspectRatio: '16 / 9',
  border: '1px dashed var(--border)',
  borderRadius: 'var(--radius-surface-md)',
  fontSize: '0.875rem',
} as const satisfies React.CSSProperties;

const meta = {
  title: 'Overlay/ContextMenu',
  component: ContextMenuTrigger,
  tags: ['autodocs'],
  decorators: [storyWidthDecorator],
  parameters: { storyWidth: 'md' },
} satisfies Meta<typeof ContextMenuTrigger>;

export default meta;

type Story = StoryObj<typeof meta>;

/*
 * The icon catalog has no clipboard-paste, archive or share glyph, so these stories use the closest
 * names it does have: clipboard for paste, external-link for share.
 */

function AreaTrigger({ label = 'Right click here', ...props }: React.ComponentProps<typeof ContextMenuTrigger> & { label?: string }): React.JSX.Element {
  return (
    <ContextMenuTrigger style={TRIGGER_STYLE} {...props}>
      {label}
    </ContextMenuTrigger>
  );
}

export const Basic: Story = {
  render: () => (
    <ContextMenu>
      <AreaTrigger />
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem disabled>Forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Submenu: Story = {
  render: () => (
    <ContextMenu>
      <AreaTrigger />
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuGroup>
              <ContextMenuItem>Save Page...</ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Shortcuts: Story = {
  render: () => (
    <ContextMenu>
      <AreaTrigger />
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Save As...
            <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Groups: Story = {
  render: () => (
    <ContextMenu>
      <AreaTrigger />
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>File</ContextMenuLabel>
          <ContextMenuItem>
            New File
            <ContextMenuShortcut>⌘N</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Open File
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Edit</ContextMenuLabel>
          <ContextMenuItem>
            Undo
            <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Redo
            <ContextMenuShortcut>⇧⌘Z</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            Cut
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Paste
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            Delete
            <ContextMenuShortcut>⌫</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Icons: Story = {
  render: () => (
    <ContextMenu>
      <AreaTrigger />
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <Icon name="copy" />
            Copy
          </ContextMenuItem>
          <ContextMenuItem>
            <Icon name="scissors" />
            Cut
          </ContextMenuItem>
          <ContextMenuItem>
            <Icon name="clipboard" />
            Paste
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <Icon name="trash" />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const Checkboxes: Story = {
  render: () => (
    <ContextMenu>
      <AreaTrigger />
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuCheckboxItem defaultChecked>Show Bookmarks Bar</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem defaultChecked>Show Developer Tools</ContextMenuCheckboxItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

function RadioDemo(): React.JSX.Element {
  const [user, setUser] = React.useState('pedro');
  const [theme, setTheme] = React.useState('light');

  return (
    <ContextMenu>
      <AreaTrigger />
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>People</ContextMenuLabel>
          <ContextMenuRadioGroup value={user} onValueChange={setUser}>
            <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>Theme</ContextMenuLabel>
          <ContextMenuRadioGroup value={theme} onValueChange={setTheme}>
            <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
            <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
            <ContextMenuRadioItem value="system">System</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const Radio: Story = {
  render: () => <RadioDemo />,
};

export const Destructive: Story = {
  render: () => (
    <ContextMenu>
      <AreaTrigger />
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>
            <Icon name="pencil" />
            Edit
          </ContextMenuItem>
          <ContextMenuItem>
            <Icon name="external-link" />
            Share
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem variant="destructive">
            <Icon name="trash" />
            Delete
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

const SIDES = ['top', 'right', 'bottom', 'left'] as const;

export const Sides: Story = {
  parameters: { storyWidth: 'lg' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
      {SIDES.map((side) => (
        <ContextMenu key={side}>
          <AreaTrigger label={`Right click (${side})`} />
          <ContextMenuContent side={side}>
            <ContextMenuGroup>
              <ContextMenuItem>Back</ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuItem>Reload</ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  ),
};

function RtlDemo(): React.JSX.Element {
  const [people, setPeople] = React.useState('pedro');

  return (
    <ContextMenu>
      <AreaTrigger label="انقر بزر الماوس الأيمن هنا" dir="rtl" />
      <ContextMenuContent dir="rtl">
        <ContextMenuGroup>
          <ContextMenuSub>
            <ContextMenuSubTrigger>التنقل</ContextMenuSubTrigger>
            <ContextMenuSubContent dir="rtl">
              <ContextMenuGroup>
                <ContextMenuItem>
                  <Icon name="arrow-left" />
                  رجوع
                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem disabled>
                  <Icon name="arrow-right" />
                  تقدم
                  <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <Icon name="refresh-cw" />
                  إعادة تحميل
                  <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSub>
            <ContextMenuSubTrigger>المزيد من الأدوات</ContextMenuSubTrigger>
            <ContextMenuSubContent dir="rtl">
              <ContextMenuGroup>
                <ContextMenuItem>حفظ الصفحة...</ContextMenuItem>
                <ContextMenuItem>إنشاء اختصار...</ContextMenuItem>
                <ContextMenuItem>تسمية النافذة...</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem>أدوات المطور</ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">حذف</ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuCheckboxItem defaultChecked>إظهار الإشارات المرجعية</ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>إظهار عناوين URL الكاملة</ContextMenuCheckboxItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuLabel>الأشخاص</ContextMenuLabel>
          <ContextMenuRadioGroup value={people} onValueChange={setPeople}>
            <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const Rtl: Story = {
  name: 'RTL',
  render: () => <RtlDemo />,
};
