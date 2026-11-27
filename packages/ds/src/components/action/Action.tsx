import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { paintName } from '../../lib/paint';
import { resolveSurfacePaint, type SurfacePaint } from '../../lib/surface-paint';
import { cn } from '../../lib/utils';

type ActionSize = 'xs' | 'sm' | 'md' | 'lg';
type ActionShape = 'default' | 'icon';

type ActionProps = useRender.ComponentProps<'button'> & SurfacePaint & {
  /** The control height, inline padding, gap, radius and icon size step. Default `md`. */
  size?: ActionSize;
  /** `icon` is a square of the control height; it needs an `aria-label`. Default `default`. */
  shape?: ActionShape;
};

/**
 * A native `<button type="button">` styled only by the `action` recipe.
 *
 * Accessibility contract:
 * - content is phrasing content (text, an inline svg) with no interactive descendants;
 * - an icon-only action (`shape="icon"`) needs `aria-label`;
 * - a toggle-style action sets `aria-pressed`;
 * - it is `type="button"` by default, so it never submits a form by accident;
 * - disable it with native `disabled`. `aria-disabled` only paints the disabled state; it does not stop
 *   Enter or Space from running `onClick`.
 */
function Action({
  variant,
  tone,
  emphasis,
  size = 'md',
  shape = 'default',
  className,
  render,
  ...props
}: ActionProps): React.JSX.Element {
  return useRender({
    defaultTagName: 'button',
    props: mergeProps<'button'>(
      { type: 'button', className: cn('action', className) },
      props
    ),
    state: {
      'slot': 'action',
      'paint': paintName(resolveSurfacePaint({ variant, tone, emphasis }, 'primary')),
      'action-size': size,
      'shape': shape,
    },
    render,
  });
}

export { Action };
export type { ActionProps, ActionShape, ActionSize };
