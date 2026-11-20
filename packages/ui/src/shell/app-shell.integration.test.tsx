// @vitest-environment happy-dom
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { expect, test, vi } from 'vitest';

import { AppProvider } from '../provider';
import { system } from '../theme';
import { AppShell } from './app-shell';

test('mounts client shell geometry using layout spacing supplied by the DOM', async () => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  const originalStyle = document.documentElement.style.cssText;
  document.documentElement.style.fontSize = '16px';
  // Happy DOM has no cascade-layer support; supply the browser's resolved CSS value at the DOM boundary.
  const variable = system.token.var('spacing.layout.space.lg').slice('var('.length, -1);
  document.documentElement.style.setProperty(variable, '1rem');
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);
  try {
    await act(async () => {
      root.render(
        <AppProvider>
          <AppShell title="Workspace"><input aria-label="Workspace content" /></AppShell>
        </AppProvider>,
      );
      await Promise.resolve();
    });
    expect(container.querySelector('input[aria-label="Workspace content"]')?.tagName).toBe('INPUT');
  } finally {
    await act(async () => {
      root.unmount();
      await Promise.resolve();
    });
    container.remove();
    document.documentElement.style.cssText = originalStyle;
    vi.unstubAllGlobals();
  }
});
