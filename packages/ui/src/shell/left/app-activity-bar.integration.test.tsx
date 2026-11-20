// @vitest-environment happy-dom
import { Flex } from '@chakra-ui/react';
import { act, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { AppProvider } from '../../provider';
import type { AppActivity } from './app-activity';
import { AppActivityBar } from './app-activity-bar';
import { AppActivityProvider } from './app-activity-provider';
import { AppSidebarBody } from './app-sidebar-body';

let container: HTMLDivElement;
let root: Root;

async function flushReact(update: () => void): Promise<void> {
  await act(async () => {
    update();
    await Promise.resolve();
  });
}

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await flushReact(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

function ActivityFixture(): React.ReactElement {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activities: readonly AppActivity[] = [
    { id: 'files', title: 'Files', icon: <span />, content: <input defaultValue="draft" /> },
    { id: 'settings', title: 'Settings', icon: <span />, content: <span />, placement: 'bottom' },
  ];
  return (
    <AppProvider>
      <AppActivityProvider activeId={activeId} onSelect={setActiveId} canCollapse>
        <Flex>
          <AppActivityBar activities={activities} />
          <AppSidebarBody activities={activities} />
        </Flex>
      </AppActivityProvider>
    </AppProvider>
  );
}

function requireTab(id: string): HTMLButtonElement {
  const tab = container.querySelector<HTMLButtonElement>(`[role="tab"][data-value="${id}"]`);
  if (!tab) {
    throw new Error(`Missing activity tab ${id}`);
  }
  return tab;
}

test('keeps a collapsed rail reachable while Chakra handles keyboard selection and deselection', async () => {
  await flushReact(() => root.render(<ActivityFixture />));
  const files = requireTab('files');
  const settings = requireTab('settings');
  expect(files.tabIndex).toBe(0);
  expect(settings.tabIndex).toBe(-1);
  expect(files.getAttribute('aria-selected')).toBe('false');

  await flushReact(() => files.focus());
  await flushReact(() => files.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true })));
  await vi.waitFor(async () => {
    await flushReact(() => undefined);
    expect(settings.getAttribute('aria-selected')).toBe('true');
  });
  expect(document.activeElement).toBe(settings);

  await flushReact(() => settings.click());
  expect(settings.getAttribute('aria-selected')).toBe('false');
  expect(settings.tabIndex).toBe(0);
  await flushReact(() => settings.blur());
  expect(files.tabIndex).toBe(0);
  expect(settings.tabIndex).toBe(-1);
});
