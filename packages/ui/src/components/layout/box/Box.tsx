type BoxRadius = 'xs' | 'sm' | 'md' | 'lg';
type BoxSurface = 'background' | 'card' | 'muted' | 'popover' | 'sidebar' | 'accent';
type BoxBorder = 'thin' | 'thick';
type BoxShadow = 'none' | 'sm' | 'md' | 'lg';
type BoxGap = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/** Which sides cancel the padding of the surrounding container (`--inset`). */
type BoxBleed = 'x' | 'y' | 'all';

type BoxProps = React.ComponentProps<'div'> & {
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
};

function Box({
  bleed,
  radius,
  surface,
  border,
  shadow,
  gap,
  ...props
}: BoxProps): React.JSX.Element {
  return (
    <div
      data-slot="box"
      data-box-bleed={bleed}
      data-box-radius={radius}
      data-box-surface={surface}
      data-box-border={border}
      data-box-shadow={shadow}
      data-box-gap={gap}
      {...props}
    />
  );
}

export { Box };
export type { BoxBleed, BoxBorder, BoxGap, BoxProps, BoxRadius, BoxShadow, BoxSurface };
