import '@workspace/ui/styles.css';

import type { Decorator, Preview } from '@storybook/react-vite';

import { APPEARANCE_AXES, DEFAULT_OPTION, INITIAL_APPEARANCE } from './appearance';

/** Reflects the globals on `<html>`; the toolbar that edits them lives in manager.tsx. */
const withAppearance: Decorator = (Story, context) => {
  const root = document.documentElement;
  for (const axis of APPEARANCE_AXES) {
    const value: unknown = context.globals[axis.key];
    if (axis.dataset === null) {
      root.classList.toggle('dark', value === 'dark');
    } else if (typeof value === 'string' && value !== DEFAULT_OPTION) {
      root.dataset[axis.dataset] = value;
    } else {
      delete root.dataset[axis.dataset];
    }
  }
  return <Story />;
};

/** Under the Storybook Vitest plugin, compare each story with its reference screenshot. */
const matchScreenshot: NonNullable<Preview['afterEach']> = async (context) => {
  if (import.meta.env.MODE !== 'test') return;
  const { expect } = await import('vitest');
  const { page } = await import('vitest/browser');
  const canvas = context.canvasElement;
  // The canvas fills the viewport; shrink it so the reference image holds only the story.
  canvas.style.width = 'fit-content';
  canvas.style.height = 'fit-content';
  try {
    await expect.element(page.elementLocator(canvas)).toMatchScreenshot(context.id);
  } finally {
    canvas.style.removeProperty('width');
    canvas.style.removeProperty('height');
  }
};

const preview: Preview = {
  decorators: [withAppearance],
  afterEach: matchScreenshot,
  initialGlobals: INITIAL_APPEARANCE,
  parameters: { layout: 'centered' },
};

export default preview;
