// @vitest-environment happy-dom
import { Splitter } from '@chakra-ui/react';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { AppProvider } from '../../provider';
import { AppWorkspace } from './app-workspace';
import { savePanelSizes } from './panel-sizes';

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
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 1000, 800));
  localStorage.clear();
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await flushReact(() => root.unmount());
  container.remove();
  localStorage.clear();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

async function renderWorkspace(hasLeftSidebar: boolean, hasRightSidebar: boolean): Promise<void> {
  await flushReact(() => root.render(
    <AppProvider>
      <AppWorkspace
        hasLeftSidebar={hasLeftSidebar}
        hasRightSidebar={hasRightSidebar}
        renderLeft={() => <input aria-label="Sidebar draft" defaultValue="" />}
        renderMain={() => <input aria-label="Main draft" defaultValue="" />}
        renderRight={() => <span />}
        renderHandle={(id) => <Splitter.ResizeTrigger id={id} />}
      />
    </AppProvider>,
  ));
}

function requireInput(label: string): HTMLInputElement {
  const input = container.querySelector<HTMLInputElement>(`input[aria-label="${label}"]`);
  if (!input) {
    throw new Error(`Missing input ${label}`);
  }
  return input;
}

test('preserves existing workspace drafts when sidebars are docked or removed', async () => {
  await renderWorkspace(true, false);
  requireInput('Main draft').value = 'unsaved main';
  requireInput('Sidebar draft').value = 'unsaved sidebar';
  await renderWorkspace(true, true);
  expect(requireInput('Main draft').value).toBe('unsaved main');
  expect(requireInput('Sidebar draft').value).toBe('unsaved sidebar');
  await renderWorkspace(true, false);
  expect(requireInput('Main draft').value).toBe('unsaved main');
  expect(requireInput('Sidebar draft').value).toBe('unsaved sidebar');
  await renderWorkspace(false, false);
  expect(requireInput('Main draft').value).toBe('unsaved main');
});

test('restores saved panel proportions after the panel set changes', async () => {
  savePanelSizes(['left-sidebar', 'main'], [30, 70]);
  savePanelSizes(['left-sidebar', 'main', 'right-sidebar'], [25, 50, 25]);
  await renderWorkspace(true, false);
  await renderWorkspace(true, true);
  await vi.waitFor(async () => {
    await flushReact(() => undefined);
    const panel = container.querySelector<HTMLElement>('[data-part="panel"][data-id="right-sidebar"]');
    expect(Number(panel?.style.flexGrow)).toBe(25);
  });
  await renderWorkspace(true, false);
  await vi.waitFor(async () => {
    await flushReact(() => undefined);
    const panel = container.querySelector<HTMLElement>('[data-part="panel"][data-id="main"]');
    expect(Number(panel?.style.flexGrow)).toBe(70);
  });
});
