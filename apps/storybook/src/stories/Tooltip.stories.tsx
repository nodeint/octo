import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Icon, Kbd, Tooltip, TooltipContent, TooltipTrigger } from '@workspace/ui';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/tooltip:
 * - The icon catalog has no save glyph, so the keyboard shortcut story uses the `download` icon.
 * - The disabled trigger wrapper uses an inline style instead of Tailwind classes.
 * - The RTL story passes `dir="rtl"` to each `TooltipContent` (it renders in a portal) and uses fixed Arabic
 *   strings instead of the shadcn translation helper.
 */

const meta = {
  title: 'Overlay/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

const SIDES = ['left', 'top', 'bottom', 'right'] as const;

export const Demo: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger render={<Button variant="outline" />}>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const Side: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      {SIDES.map((side) => (
        <Tooltip key={side} {...args}>
          <TooltipTrigger render={<Button variant="outline" />}>
            {side.charAt(0).toUpperCase() + side.slice(1)}
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

export const WithKeyboardShortcut: Story = {
  name: 'With Keyboard Shortcut',
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger render={<Button variant="outline" size="sm" shape="icon" aria-label="Save" />}>
        <Icon name="download" />
      </TooltipTrigger>
      <TooltipContent>
        Save Changes <Kbd>S</Kbd>
      </TooltipContent>
    </Tooltip>
  ),
};

export const DisabledButton: Story = {
  name: 'Disabled Button',
  render: (args) => (
    <Tooltip {...args}>
      <TooltipTrigger render={<span style={{ display: 'inline-block', width: 'fit-content' }} />}>
        <Button variant="outline" disabled>
          Disabled
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This feature is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  ),
};

const RTL_SIDES = [
  ['left', 'يسار'],
  ['top', 'أعلى'],
  ['bottom', 'أسفل'],
  ['right', 'يمين'],
  ['inline-start', 'بداية السطر'],
  ['inline-end', 'نهاية السطر'],
] as const;

export const Rtl: Story = {
  name: 'RTL',
  render: (args) => (
    <div dir="rtl" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
      {RTL_SIDES.map(([side, label]) => (
        <Tooltip key={side} {...args}>
          <TooltipTrigger render={<Button variant="outline" />}>{label}</TooltipTrigger>
          <TooltipContent side={side} dir="rtl">
            إضافة إلى المكتبة
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};
