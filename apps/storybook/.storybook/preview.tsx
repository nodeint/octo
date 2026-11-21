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

const preview: Preview = {
  decorators: [withAppearance],
  initialGlobals: INITIAL_APPEARANCE,
  parameters: { layout: 'centered' },
};

export default preview;
