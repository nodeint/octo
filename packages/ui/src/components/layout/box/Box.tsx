type BoxRadius = 'sm' | 'md' | 'lg';
type BoxSurface = 'background' | 'card' | 'muted' | 'popover' | 'sidebar' | 'accent';
type BoxBorder = 'thin' | 'thick';
type BoxShadow = 'none' | 'sm' | 'md' | 'lg';

type BoxProps = React.ComponentProps<'div'> & {
  /** The corner radius step. */
  radius?: BoxRadius;
  /** The background token. Also sets `--surface` for descendants. */
  surface?: BoxSurface;
  /** The edge ring width, drawn in the edge color. */
  border?: BoxBorder;
  /** The elevation step; `none` clears an inherited elevation. */
  shadow?: BoxShadow;
};

function Box({ radius, surface, border, shadow, ...props }: BoxProps): React.JSX.Element {
  return (
    <div
      data-slot="box"
      data-box-radius={radius}
      data-box-surface={surface}
      data-box-border={border}
      data-box-shadow={shadow}
      {...props}
    />
  );
}

export { Box };
export type { BoxBorder, BoxProps, BoxRadius, BoxShadow, BoxSurface };
