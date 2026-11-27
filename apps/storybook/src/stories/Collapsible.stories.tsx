/*
 * Deviations from the shadcn examples:
 * - Icons come from the `@workspace/ui` catalog (`chevron-down`, `plus`, `minus`, `folder`, `file`) instead of lucide.
 * - Settings Panel uses a plain `Box` surface instead of Card, and `Stack` instead of grid utility classes.
 * - File Tree omits the Explorer/Outline Tabs header; Tabs is covered by its own story.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Field,
  FieldGroup,
  FieldLabel,
  Flex,
  Grid,
  Icon,
  Input,
  Stack,
  Text,
} from '@workspace/ui';
import * as React from 'react';

import { storyWidthDecorator } from '../story-width';

const meta = {
  title: 'Layout/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: { storyWidth: 'md' },
  decorators: [storyWidthDecorator],
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => (
    <Collapsible>
      <Stack>
        <Flex align="center" justify="space-between" px="md">
          <Text as="h4" variant="title-sm">Order #4189</Text>
          <CollapsibleTrigger render={<Button variant="ghost" shape="icon" size="sm" aria-label="Toggle details" />}>
            <Icon name="chevron-down" />
          </CollapsibleTrigger>
        </Flex>
        <Flex radius="sm" bordered justify="space-between" px="md" py="sm">
          <Text variant="description">Status</Text>
          <Text variant="label">Shipped</Text>
        </Flex>
        <CollapsibleContent>
          <Stack>
            <Box radius="sm" bordered px="md" py="sm">
              <Text as="p" variant="label">Shipping address</Text>
              <Text as="p" variant="description">100 Market St, San Francisco</Text>
            </Box>
            <Box radius="sm" bordered px="md" py="sm">
              <Text as="p" variant="label">Items</Text>
              <Text as="p" variant="description">2x Studio Headphones</Text>
            </Box>
          </Stack>
        </CollapsibleContent>
      </Stack>
    </Collapsible>
  ),
};

export const Basic: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger render={<Button variant="ghost" />}>
        Product details
        <Icon name="chevron-down" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Stack p="md" align='start'>
          <Text>This panel can be expanded or collapsed to reveal additional content.</Text>
          <Button variant='link'>Learn More</Button>
        </Stack>
      </CollapsibleContent>
    </Collapsible>
  ),
};

function Settings(): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const fields = (prefix: string): React.JSX.Element[] =>
    ['X', 'Y'].map((axis) => (
      <Field key={axis}>
        <FieldLabel htmlFor={`${prefix}-${axis}`} className="sr-only">Radius {axis}</FieldLabel>
        <Input id={`${prefix}-${axis}`} placeholder="0" defaultValue={0} />
      </Field>
    ));
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Box radius="md" bordered style={{ padding: '1rem' }}>
        <Stack>
          <Text variant="title-sm">Radius</Text>
          <Text variant="description">Set the corner radius of the element.</Text>
          <Flex align="flex-start" gap="sm">
            <FieldGroup style={{ flex: 1 }}>
              <Grid columns={2}>{fields('top')}</Grid>
              <CollapsibleContent>
                <Grid columns={2}>{fields('bottom')}</Grid>
              </CollapsibleContent>
            </FieldGroup>
            <CollapsibleTrigger render={<Button variant="outline" shape="icon" aria-label="Toggle more" />}>
              <Icon name={isOpen ? 'minus' : 'plus'} />
            </CollapsibleTrigger>
          </Flex>
        </Stack>
      </Box>
    </Collapsible>
  );
}

export const SettingsPanel: Story = {
  parameters: { storyWidth: 'lg' },
  render: () => <Settings />,
};

type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] };

const FILE_TREE: FileTreeItem[] = [
  {
    name: 'components',
    items: [
      { name: 'ui', items: [{ name: 'button.tsx' }, { name: 'card.tsx' }, { name: 'dialog.tsx' }] },
      { name: 'login-form.tsx' },
    ],
  },
  { name: 'lib', items: [{ name: 'utils.ts' }, { name: 'api.ts' }] },
  { name: 'app.tsx' },
  { name: 'package.json' },
];

function FileTreeNode({ item }: { item: FileTreeItem }): React.JSX.Element {
  if (!('items' in item)) {
    return (
      <Button variant="link" size="sm" style={{ justifyContent: 'flex-start' }}>
        <Icon name="file" />
        {item.name}
      </Button>
    );
  }
  return (
    <Collapsible>
      <CollapsibleTrigger render={<Button variant="ghost" size="sm" style={{ width: '100%', justifyContent: 'flex-start' }} />}>
        <Icon name="folder" />
        {item.name}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Stack gap="xxs" style={{ marginBlockStart: '0.25rem', marginInlineStart: '1.25rem' }}>
          {item.items.map((child) => (
            <FileTreeNode key={child.name} item={child} />
          ))}
        </Stack>
      </CollapsibleContent>
    </Collapsible>
  );
}

export const FileTree: Story = {
  render: () => (
    <Stack gap="xxs">
      {FILE_TREE.map((item) => (
        <FileTreeNode key={item.name} item={item} />
      ))}
    </Stack>
  ),
};

export const Rtl: Story = {
  render: () => (
    <Collapsible dir="rtl">
      <Stack>
        <Flex align="center" justify="space-between" px="md">
          <Text as="h4" variant="title-sm">الطلب #4189</Text>
          <CollapsibleTrigger render={<Button variant="ghost" shape="icon" size="sm" aria-label="Toggle details" />}>
            <Icon name="chevron-down" />
          </CollapsibleTrigger>
        </Flex>
        <Flex radius="sm" bordered justify="space-between" px="md" py="sm">
          <Text variant="description">الحالة</Text>
          <Text variant="label">تم الشحن</Text>
        </Flex>
        <CollapsibleContent>
          <Stack>
            <Box radius="sm" bordered px="md" py="sm">
              <Text as="p" variant="label">عنوان الشحن</Text>
              <Text as="p" variant="description">100 Market St, San Francisco</Text>
            </Box>
            <Box radius="sm" bordered px="md" py="sm">
              <Text as="p" variant="label">العناصر</Text>
              <Text as="p" variant="description">2x سماعات الاستوديو</Text>
            </Box>
          </Stack>
        </CollapsibleContent>
      </Stack>
    </Collapsible>
  ),
};
