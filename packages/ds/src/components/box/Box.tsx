import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';

import { paintName } from '../../lib/paint';
import { resolveSurfacePaint, type SurfacePaint } from '../../lib/surface-paint';
import { cn } from '../../lib/utils';

/** A corner step; `0` squares the corner, including one that `radius` or a side would round. */
type BoxRadius = 'xs' | 'sm' | 'md' | 'lg' | '0';
type BoxBorderSide = 'top' | 'right' | 'bottom' | 'left';

/** The border width step; `0` removes the border, including the paint's ring. */
type BoxBorderWidth = '0' | 'thin' | 'thick';
type BoxBorderType = 'solid' | 'dashed' | 'dotted';

/** `true` draws every edge; a side draws that one edge. Without it the box draws the paint's own ring. */
type BoxBordered = true | BoxBorderSide;
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

/** A step of the box size scale (`--box-w-*` on width, `--box-h-*` on height), or `full` for 100%. */
type BoxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';

/**
 * Without `variant`, `tone` and `emphasis` the box is not painted. `variant` takes the paint of one preset pair;
 * `tone` with `emphasis` takes the paint of that pair.
 */
type BoxPaint = SurfacePaint

type BoxBleedWithoutWidth = 'x' | 'all';

/**
 * `width` and a bleed over the inline axis (`x`, `all`) ask for different widths, so the types allow only one of them.
 */
type BoxBleedWidth =
  | { bleed?: Exclude<BoxBleed, BoxBleedWithoutWidth>; width?: BoxSize }
  | { bleed?: BoxBleed; width?: undefined };

type BoxBaseProps = useRender.ComponentProps<'div'> & BoxPaint & {
  /**
   * Extends the box to the edges of the container that pads it, by a negative margin of `--inset`.
   * The container declares `--inset` with the same value as its padding; without one the bleed is 0.
   * The box does not pad itself again; give it its own padding to keep content aligned.
   */
  bleed?: BoxBleed;
  /** The height, a step of the `--box-h-*` scale or `full`. */
  height?: BoxSize;
  /** The corner radius step on every corner. */
  radius?: BoxRadius;
  /** The block start side: its two corners. Wins over `radius`. */
  radiusTop?: BoxRadius;
  /** The block end side: its two corners. Wins over `radius`. */
  radiusBottom?: BoxRadius;
  /** The inline start side: its two corners. Wins over `radius`. */
  radiusStart?: BoxRadius;
  /** The inline end side: its two corners. Wins over `radius`. */
  radiusEnd?: BoxRadius;
  /** The block start, inline start corner. Wins over a side and `radius`. */
  radiusTopStart?: BoxRadius;
  /** The block start, inline end corner. Wins over a side and `radius`. */
  radiusTopEnd?: BoxRadius;
  /** The block end, inline start corner. Wins over a side and `radius`. */
  radiusBottomStart?: BoxRadius;
  /** The block end, inline end corner. Wins over a side and `radius`. */
  radiusBottomEnd?: BoxRadius;
  /** The background token. Also sets `--surface` for descendants. */
  /** The elevation step; `none` clears an inherited elevation. */
  shadow?: BoxShadow;
  /** The space between children. Takes effect on a flex or grid box, such as Stack and Grid. */
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
  /** The edge ring, drawn in the paint's border color (the base border color when unpainted). */
  bordered?: BoxBordered;
  /** The border width. Also sets the width of the paint's ring. Default `thin`. */
  borderWidth?: BoxBorderWidth;
  /** The border style; it applies to `bordered`, since the paint's ring is always solid. Default `solid`. */
  borderType?: BoxBorderType;
};

type BoxProps = BoxBaseProps & BoxBleedWidth;

function Box({
  variant,
  tone,
  emphasis,
  bleed,
  width,
  height,
  radius,
  radiusTop,
  radiusBottom,
  radiusStart,
  radiusEnd,
  radiusTopStart,
  radiusTopEnd,
  radiusBottomStart,
  radiusBottomEnd,
  shadow,
  gap,
  p,
  px,
  py,
  pt,
  pb,
  ps,
  pe,
  bordered,
  borderWidth,
  borderType,
  className,
  render,
  ...props
}: BoxProps): React.JSX.Element {
  const paint = variant === undefined && tone === undefined
    ? undefined
    : paintName(resolveSurfacePaint({ variant, tone, emphasis }, 'primary'));
  return useRender({
    defaultTagName: 'div',
    props: mergeProps<'div'>(
      {
        className: cn('box', className),
      } as React.ComponentProps<'div'>,
      props
    ),
    state: {
      'paint': paint,
      'box-bleed': bleed,
      'box-width': width,
      'box-height': height,
      'box-radius': radius,
      'box-radius-top': radiusTop,
      'box-radius-bottom': radiusBottom,
      'box-radius-start': radiusStart,
      'box-radius-end': radiusEnd,
      'box-radius-top-start': radiusTopStart,
      'box-radius-top-end': radiusTopEnd,
      'box-radius-bottom-start': radiusBottomStart,
      'box-radius-bottom-end': radiusBottomEnd,
      'box-shadow': shadow,
      'box-gap': gap,
      'box-p': p,
      'box-px': px,
      'box-py': py,
      'box-pt': pt,
      'box-pb': pb,
      'box-ps': ps,
      'box-pe': pe,
      'box-bordered': bordered === true ? 'all' : bordered,
      'box-border-width': borderWidth,
      'box-border-type': borderType,
    },
    render,
  });
}

export { Box };
export type {
  BoxBleed,
  BoxBordered,
  BoxBorderSide,
  BoxBorderType,
  BoxBorderWidth,
  BoxGap,
  BoxPadding,
  BoxPaddingSide,
  BoxPaint,
  BoxProps,
  BoxRadius,
  BoxShadow,
  BoxSize,
};
