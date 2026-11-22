import type { Decorator } from '@storybook/react-vite';

/** Fixed story widths. The centered layout wraps stories in a shrink-to-fit box, so a percentage collapses. */
export const STORY_WIDTHS = { sm: '13.5rem', md: '20rem', lg: '32rem' } as const;

export type StoryWidth = keyof typeof STORY_WIDTHS;

/** Wraps a story in a fixed-width box. Pick the width per story with `parameters: { storyWidth }` (default `sm`). */
export const storyWidthDecorator: Decorator = (Story, { parameters }) => {
  const width = STORY_WIDTHS[(parameters.storyWidth as StoryWidth | undefined) ?? 'sm'];

  return (
    <div style={{ width, maxWidth: '100vw' }}>
      <Story />
    </div>
  );
};
