import type { Decorator } from '@storybook/react-vite';

/** Fixed story widths. The centered layout wraps stories in a shrink-to-fit box, so a percentage collapses. */
const STORY_WIDTHS = { sm: '13.5rem', md: '20rem', lg: '32rem' } as const;

type StoryWidth = keyof typeof STORY_WIDTHS;

function isStoryWidth(value: unknown): value is StoryWidth {
  return typeof value === 'string' && value in STORY_WIDTHS;
}

/** Wraps a story in a fixed-width box. Pick the width per story with `parameters: { storyWidth }` (default `sm`). */
export const storyWidthDecorator: Decorator = (Story, { parameters }) => {
  const requested: unknown = parameters.storyWidth;
  const width = STORY_WIDTHS[isStoryWidth(requested) ? requested : 'sm'];

  return (
    <div style={{ width, maxWidth: '100vw' }}>
      <Story />
    </div>
  );
};
