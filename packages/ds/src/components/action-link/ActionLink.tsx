import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { paintName } from '../../lib/paint';
import type { SurfaceTone } from '../../lib/surface-paint';

type ActionLinkUnderline = 'none' | 'hover' | 'always';
type ActionLinkEmphasis = 'ghost' | 'ghost-subtle';

type ActionLinkProps = useRender.ComponentProps<'a'> & {
  /** The paint tone. Default `primary`. */
  tone?: SurfaceTone;
  /** `ghost` keeps the full text color; `ghost-subtle` rests subtle. Default `ghost`. */
  emphasis?: ActionLinkEmphasis;
  /** When the text is underlined. Default `hover`. */
  underline?: ActionLinkUnderline;
};

/**
 * A navigation link that shares `Action`'s paint but never draws a border or a background.
 * It renders an `<a>`; pass `render` to swap in a router link.
 *
 * Accessibility contract:
 * - content is phrasing content (text, an inline svg) with no interactive descendants;
 * - an icon-only link needs `aria-label`;
 * - set `href` for navigation;
 * - `aria-disabled="true"` only paints the disabled state and blocks the pointer; it does not stop
 *   Enter from following the link;
 * - it is meant for short labels: a link is `inline-flex`, so its label does not wrap.
 */
function ActionLink({
  tone = 'primary',
  emphasis = 'ghost',
  underline = 'hover',
  render,
  ...props
}: ActionLinkProps): React.JSX.Element {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>({}, props),
    state: {
      'slot': 'action-link',
      'paint': paintName({ tone, emphasis }),
      'link': underline,
    },
    render,
  });
}

export { ActionLink };
export type { ActionLinkEmphasis, ActionLinkProps, ActionLinkUnderline };
