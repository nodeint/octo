import { paintName } from '../../../lib/paint';
import type { SurfaceAxes } from '../../../lib/surface-paint';
import { cn } from '../../../lib/utils';

type BoxRadius = 'xs' | 'sm' | 'md' | 'lg';
type BoxSurface = 'background' | 'card' | 'muted' | 'popover' | 'sidebar' | 'accent';
type BoxBorder = 'thin' | 'thick';
type BoxShadow = 'none' | 'sm' | 'md' | 'lg';
type BoxGap = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

type BoxPadding = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * A side or axis takes a step, `0` to clear the padding that `p` or an axis would give it,
 * or `inset` to pad with the surrounding container's `--inset`.
 */
type BoxPaddingSide = BoxPadding | '0' | 'inset';

/**
 * Which sides cancel the padding of the surrounding container (`--inset`).
 * `x`, `y` and `all` take both sides of an axis or every side; `top`, `bottom`, `start` and `end` take one side
 * (block start, block end, inline start, inline end).
 */
type BoxBleed = 'x' | 'y' | 'all' | 'top' | 'bottom' | 'start' | 'end';

/** Without `tone` and `emphasis` the box is not painted; with both it takes the paint of that pair. */
type BoxPaint = SurfaceAxes | { tone?: never, emphasis?: never }

type BoxProps = React.ComponentProps<'div'> & BoxPaint & {
  /**
   * Extends the box to the edges of the container that pads it, by a negative margin of `--inset`.
   * The container declares `--inset` with the same value as its padding; without one the bleed is 0.
   * The box does not pad itself again; give it its own padding to keep content aligned.
   */
  bleed?: BoxBleed;
  /** The corner radius step. */
  radius?: BoxRadius;
  /** The background token. Also sets `--surface` for descendants. */
  surface?: BoxSurface;
  /** The edge ring width, drawn in the edge color. */
  border?: BoxBorder;
  /** The elevation step; `none` clears an inherited elevation. */
  shadow?: BoxShadow;
  /** The space between children. Takes effect on a flex or grid box, such as Stack, Inline and Grid. */
  gap?: BoxGap;
  /**
   * The padding step on every side. Also sets `--inset` for descendants, so a Box `bleed` inside cancels it.
   * `inset` pads with the `--inset` of the surrounding container (0 when none declares one) and leaves it unchanged,
   * so a box that bleeds to the container edge can keep its content aligned: `<Box bleed="x" px="inset">`.
   */
  p?: BoxPadding | 'inset';
  /** The inline axis, both start and end. Wins over `p`. */
  px?: BoxPaddingSide;
  /** The block axis, both top and bottom. Wins over `p`. */
  py?: BoxPaddingSide;
  /** The block start side. Wins over `py` and `p`. */
  pt?: BoxPaddingSide;
  /** The block end side. Wins over `py` and `p`. */
  pb?: BoxPaddingSide;
  /** The inline start side. Wins over `px` and `p`. */
  ps?: BoxPaddingSide;
  /** The inline end side. Wins over `px` and `p`. */
  pe?: BoxPaddingSide;
};

function Box({
  tone,
  emphasis,
  bleed,
  radius,
  surface,
  border,
  shadow,
  gap,
  p,
  px,
  py,
  pt,
  pb,
  ps,
  pe,
  className,
  ...props
}: BoxProps): React.JSX.Element {
  const paint = tone === undefined ? undefined : paintName({ tone, emphasis });
  return (
    <div
      data-slot="box"
      className={cn('box', className)}
      data-paint={paint}
      data-box-paint={paint === undefined ? undefined : ''}
      data-box-bleed={bleed}
      data-box-radius={radius}
      data-box-surface={surface}
      data-box-border={border}
      data-box-shadow={shadow}
      data-box-gap={gap}
      data-box-p={p}
      data-box-px={px}
      data-box-py={py}
      data-box-pt={pt}
      data-box-pb={pb}
      data-box-ps={ps}
      data-box-pe={pe}
      {...props}
    />
  );
}

export { Box };
export type {
  BoxBleed,
  BoxBorder,
  BoxGap,
  BoxPadding,
  BoxPaddingSide,
  BoxPaint,
  BoxProps,
  BoxRadius,
  BoxShadow,
  BoxSurface,
};
