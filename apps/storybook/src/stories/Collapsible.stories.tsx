/*
 * Deviations from the shadcn examples:
 * - Icons come from the `@workspace/ui` catalog (`chevron-down`, `plus`, `minus`, `folder`, `file`) instead of lucide.
 * - Settings Panel uses a plain `Box` surface instead of Card, and `Inline` instead of grid utility classes.
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

function DetailRow({ title, value }: { title: string; value: string }): React.JSX.Element {
  return (
    <Box radius="sm" border="thin" style={{ padding: '0.5rem 1rem' }}>
      <Text as="p" variant="label">{title}</Text>
      <Text as="p" variant="description">{value}</Text>
    </Box>
  );
}

function OrderDemo({ dir, texts }: { dir?: 'rtl'; texts: Record<string, string> }): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} dir={dir}>
      <Stack>
        <Flex align="center" justify="space-between" px="md">
          <Text as="h4" variant="title-sm">{texts.order}</Text>
          <CollapsibleTrigger render={<Button variant="ghost" shape="icon" size="sm" aria-label="Toggle details" />}>
            <Icon name="chevron-down" />
          </CollapsibleTrigger>
        </Flex>
        <Flex radius="sm" border="thin" justify="space-between" px="md" py="sm">
          <Text variant="description">{texts.status}</Text>
          <Text variant="label">{texts.shipped}</Text>
        </Flex>
        <CollapsibleContent>
          <Stack>
            <DetailRow title={texts.address} value="100 Market St, San Francisco" />
            <DetailRow title={texts.items} value={texts.itemsValue} />
          </Stack>
        </CollapsibleContent>
      </Stack>
    </Collapsible>
  );
}

export const Demo: Story = {
  render: () => (
    <OrderDemo
      texts={{
        order: 'Order #4189',
        status: 'Status',
        shipped: 'Shipped',
        address: 'Shipping address',
        items: 'Items',
        itemsValue: '2x Studio Headphones',
      }}
    />
  ),
};

export const Basic: Story = {
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger render={<Button variant="ghost" style={{ width: '100%' }} />}>
        Product details
        <Icon name="chevron-down" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Stack style={{ padding: '0.625rem', paddingBlockStart: 0, alignItems: 'flex-start' }}>
          <Text>This panel can be expanded or collapsed to reveal additional content.</Text>
          <Button size="xs">Learn More</Button>
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
      <Box radius="md" border="thin" style={{ padding: '1rem' }}>
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
    <OrderDemo
      dir="rtl"
      texts={{
        order: 'الطلب #4189',
        status: 'الحالة',
        shipped: 'تم الشحن',
        address: 'عنوان الشحن',
        items: 'العناصر',
        itemsValue: '2x سماعات الاستوديو',
      }}
    />
  ),
};
