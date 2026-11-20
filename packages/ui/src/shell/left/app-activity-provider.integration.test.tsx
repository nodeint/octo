import { Flex } from '@chakra-ui/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test } from 'vitest';

import { AppProvider } from '../../provider';
import type { AppActivity } from './app-activity';
import { AppActivityBar } from './app-activity-bar';
import { AppActivityProvider } from './app-activity-provider';
import { AppSidebarBody } from './app-sidebar-body';

function readAttribute(tag: string | undefined, name: string): string {
  if (tag === undefined) {
    throw new Error(`Missing element for ${name} attribute`);
  }
  const match = new RegExp(`${name}="([^"]*)"`).exec(tag);
  if (!match) {
    throw new Error(`Missing ${name} attribute in ${tag}`);
  }
  return match[1];
}

test('links grouped activity tabs to mounted sidebar panels through their shared context', () => {
  const activities: readonly AppActivity[] = [
    { id: 'files', title: 'Files', icon: <span />, content: <input defaultValue="draft" /> },
    { id: 'settings', title: 'Settings', icon: <span />, content: <input defaultValue="preferences" />, placement: 'bottom' },
  ];
  const html = renderToStaticMarkup(
    <AppProvider>
      <AppActivityProvider activeId="files" onSelect={() => undefined} canCollapse>
        <Flex>
          <AppActivityBar activities={activities} />
          <AppSidebarBody activities={activities} />
        </Flex>
      </AppActivityProvider>
    </AppProvider>,
  );
  const tabTags = html.match(/<button\b[^>]*role="tab"[^>]*>/g) ?? [];
  const panelTags = html.match(/<div\b[^>]*role="tabpanel"[^>]*>/g) ?? [];

  expect(html.match(/role="tablist"/g)).toHaveLength(1);
  expect(tabTags).toHaveLength(2);
  expect(panelTags).toHaveLength(2);
  expect(readAttribute(tabTags[0], 'aria-controls')).toBe(readAttribute(panelTags[0], 'id'));
  expect(panelTags.map((tag) => readAttribute(tag, 'aria-labelledby'))).toEqual(
    tabTags.map((tag) => readAttribute(tag, 'id')),
  );
  expect(panelTags[0]).not.toContain('hidden=""');
  expect(panelTags[1]).toContain('hidden=""');
  expect(html).toContain('value="draft"');
  expect(html).toContain('value="preferences"');
});
