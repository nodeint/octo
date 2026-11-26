import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderContent,
  CardTitle,
  Icon,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@workspace/ui';

import { storyWidthDecorator } from '../story-width';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/tabs:
 * - Cards use the library `CardContent` without a muted-text class because stories do not use Tailwind classes.
 * - The Icons story uses the `app-window` and `code-2` catalog icons.
 * - The RTL story uses a `dir="rtl"` wrapper instead of the shadcn translation helper.
 */

const meta = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  decorators: [storyWidthDecorator],
  parameters: { storyWidth: 'lg' },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const SECTIONS = [
  {
    value: 'overview',
    title: 'Overview',
    description:
      'View your key metrics and recent project activity. Track progress across all your active projects.',
    content: 'You have 12 active projects and 3 pending tasks.',
  },
  {
    value: 'analytics',
    title: 'Analytics',
    description:
      'Track performance and user engagement metrics. Monitor trends and identify growth opportunities.',
    content: 'Page views are up 25% compared to last month.',
  },
  {
    value: 'reports',
    title: 'Reports',
    description:
      'Generate and download your detailed reports. Export data in multiple formats for analysis.',
    content: 'You have 5 reports ready and available to export.',
  },
  {
    value: 'settings',
    title: 'Settings',
    description:
      'Manage your account preferences and options. Customize your experience to fit your needs.',
    content: 'Configure notifications, security, and themes.',
  },
] as const;

export const Demo: Story = {
  render: (args) => (
    <Tabs defaultValue="overview" {...args}>
      <TabsList>
        {SECTIONS.map((section) => (
          <TabsTrigger key={section.value} value={section.value}>
            {section.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {SECTIONS.map((section) => (
        <TabsContent key={section.value} value={section.value}>
          <Card>
            <CardHeader>
              <CardHeaderContent>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeaderContent>
            </CardHeader>
            <CardContent>{section.content}</CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const Line: Story = {
  render: (args) => (
    <Tabs defaultValue="overview" {...args}>
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: (args) => (
    <Tabs defaultValue="account" orientation="vertical" {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Tabs defaultValue="home" {...args}>
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="settings" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

export const Icons: Story = {
  render: (args) => (
    <Tabs defaultValue="preview" {...args}>
      <TabsList>
        <TabsTrigger value="preview">
          <Icon name="app-window" />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <Icon name="code-2" />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <div dir="rtl">
      <Tabs defaultValue="overview" {...args}>
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardHeaderContent>
                <CardTitle>نظرة عامة</CardTitle>
                <CardDescription>عرض المقاييس الرئيسية ونشاط المشروع الأخير.</CardDescription>
              </CardHeaderContent>
            </CardHeader>
            <CardContent>لديك 12 مشروعًا نشطًا و3 مهام معلقة.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardHeaderContent>
                <CardTitle>التحليلات</CardTitle>
                <CardDescription>تتبع الأداء ومقاييس تفاعل المستخدمين.</CardDescription>
              </CardHeaderContent>
            </CardHeader>
            <CardContent>ارتفعت مشاهدات الصفحة بنسبة 25٪ مقارنة بالشهر الماضي.</CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardHeaderContent>
                <CardTitle>التقارير</CardTitle>
                <CardDescription>أنشئ تقاريرك التفصيلية وقم بتنزيلها.</CardDescription>
              </CardHeaderContent>
            </CardHeader>
            <CardContent>لديك 5 تقارير جاهزة للتصدير.</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ),
};
