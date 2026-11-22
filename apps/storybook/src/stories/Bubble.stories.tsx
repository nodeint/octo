import type { Meta, StoryObj } from '@storybook/react-vite';
import type { BubbleAlign, BubbleVariant } from '@workspace/ui';
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Icon,
  Stack,
} from '@workspace/ui';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

/*
 * Deviations from https://ui.shadcn.com/docs/components/base/bubble:
 * - `@workspace/ui` has no `BubbleReactions`, so the Reactions, Tooltip and Popover examples, and the
 *   reactions inside Demo, Variants and Group, are omitted.
 * - The Ghost bubble in Variants holds plain text, because the library has no Markdown renderer.
 * - Button clicks in Links and Buttons update a status line instead of showing a toast.
 */

const VARIANTS = [
  'default',
  'secondary',
  'muted',
  'tinted',
  'outline',
  'ghost',
  'destructive',
] as const satisfies readonly BubbleVariant[];
const ALIGNS = ['start', 'end'] as const satisfies readonly BubbleAlign[];

const meta = {
  title: 'Data Display/Bubble',
  component: Bubble,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: VARIANTS },
    align: { control: 'inline-radio', options: ALIGNS },
  },
  parameters: { storyWidth: 'lg' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Bubble>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => (
    <Stack gap="xl">
      <Bubble align="end">
        <BubbleContent>Hey there! what&apos;s up?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble variant="muted">
          <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
        </Bubble>
        <Bubble variant="muted">
          <BubbleContent>
            I can group messages, switch sides, and keep the whole thread easy to scan.
          </BubbleContent>
        </Bubble>
      </BubbleGroup>
      <Bubble align="end">
        <BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>
          Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.
        </BubbleContent>
      </Bubble>
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack gap="xl">
      <Bubble>
        <BubbleContent>This is the default primary bubble.</BubbleContent>
      </Bubble>
      <Bubble variant="secondary" align="end">
        <BubbleContent>This is the secondary variant.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>This one is muted. It uses a lower emphasis color for the chat bubble.</BubbleContent>
      </Bubble>
      <Bubble variant="tinted" align="end">
        <BubbleContent>
          This one is tinted. The tint is a softer color derived from the primary color.
        </BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>We can also use an outlined variant.</BubbleContent>
      </Bubble>
      <Bubble variant="destructive" align="end">
        <BubbleContent>Or a destructive variant.</BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>
          Ghost bubbles work for assistant text and other content that should not be framed. They span the full
          width of the container.
        </BubbleContent>
      </Bubble>
    </Stack>
  ),
};

export const Alignment: Story = {
  render: () => (
    <Stack gap="xl">
      <Bubble variant="muted">
        <BubbleContent>This bubble is aligned to the start. This is the default alignment.</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>This bubble is aligned to the end. Use this for user messages.</BubbleContent>
      </Bubble>
    </Stack>
  ),
};

export const Group: Story = {
  name: 'Bubble Group',
  render: () => (
    <Stack gap="xl">
      <Bubble variant="muted">
        <BubbleContent>Can you tell me what&apos;s the issue?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        <Bubble align="end">
          <BubbleContent>You tell me!</BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>It worked yesterday. You broke it!</BubbleContent>
        </Bubble>
        <Bubble align="end">
          <BubbleContent>Find the bug and fix it.</BubbleContent>
        </Bubble>
      </BubbleGroup>
      <Bubble variant="muted">
        <BubbleContent>
          Want me to diff yesterday&apos;s you against today&apos;s you? It&apos;s a bit embarrassing.
        </BubbleContent>
      </Bubble>
    </Stack>
  ),
};

const CHOICES = ['I forgot my password', 'I need help with my subscription', 'Something else. Talk to a human.'] as const;

function Choices() {
  const [picked, setPicked] = React.useState<string>();

  return (
    <Stack gap="xl">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <BubbleGroup>
        {CHOICES.map((choice) => (
          <Bubble key={choice} variant="tinted" align="end">
            <BubbleContent
              render={
                <button
                  type="button"
                  onClick={() => {
                    setPicked(choice);
                  }}
                />
              }
            >
              {choice}
            </BubbleContent>
          </Bubble>
        ))}
      </BubbleGroup>
      <div role="status">{picked === undefined ? 'Pick an option.' : `You clicked: ${picked}`}</div>
    </Stack>
  );
}

export const LinksAndButtons: Story = {
  name: 'Links and Buttons',
  render: () => <Choices />,
};

const LONG_TEXT = [
  'The accessibility review found two focus states that were visually too subtle in dark mode.',
  'I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.',
  'The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.',
  'I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.',
];

export const ShowMore: Story = {
  name: 'Show More / Collapsible',
  render: () => (
    <Stack gap="xl">
      <Bubble variant="muted">
        <BubbleContent>How can I help you today?</BubbleContent>
      </Bubble>
      <Bubble variant="muted" align="end">
        <BubbleContent>
          <Collapsible>
            <div>{LONG_TEXT[0]}</div>
            <CollapsibleContent>
              {LONG_TEXT.slice(1).map((line) => (
                <div key={line}>{line}</div>
              ))}
            </CollapsibleContent>
            <CollapsibleTrigger render={<Button variant="link" size="sm" />}>
              Show more
              <Icon name="chevron-down" />
            </CollapsibleTrigger>
          </Collapsible>
        </BubbleContent>
      </Bubble>
    </Stack>
  ),
};

export const Playground: Story = {
  args: { variant: 'default', align: 'start' },
  render: (args) => (
    <Bubble {...args}>
      <BubbleContent>I checked the registry output and removed the stale route.</BubbleContent>
    </Bubble>
  ),
};
