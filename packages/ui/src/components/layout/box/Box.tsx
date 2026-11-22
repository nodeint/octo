type BoxRadius = 'xs' | 'sm' | 'md' | 'lg';
type BoxSurface = 'background' | 'card' | 'muted' | 'popover' | 'sidebar' | 'accent';
type BoxBorder = 'thin' | 'thick';
type BoxShadow = 'none' | 'sm' | 'md' | 'lg';
type BoxGap = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

type BoxProps = React.ComponentProps<'div'> & {
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

function Box({ radius, surface, border, shadow, gap, ...props }: BoxProps): React.JSX.Element {
  return (
    <div
      data-slot="box"
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
export type { BoxBorder, BoxGap, BoxProps, BoxRadius, BoxShadow, BoxSurface };
