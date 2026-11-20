import { cn } from '../../../lib/utils';

type InsetSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** A side takes a step, or `0` to clear the padding that `size` or an axis would give it. */
type InsetSide = InsetSize | '0';

type InsetProps = React.ComponentProps<'div'> & {
  /** The padding step on every side. Defaults to `md` when no side prop is set. */
  size?: InsetSize;
  /** The inline axis, both start and end. Wins over `size`. */
  x?: InsetSide;
  /** The block axis, both top and bottom. Wins over `size`. */
  y?: InsetSide;
  /** The block start side. Wins over `y` and `size`. */
  t?: InsetSide;
  /** The block end side. Wins over `y` and `size`. */
  b?: InsetSide;
  /** The inline start side. Wins over `x` and `size`. */
  s?: InsetSide;
  /** The inline end side. Wins over `x` and `size`. */
  e?: InsetSide;
};

function Inset({ className, size, x, y, t, b, s, e, ...props }: InsetProps): React.JSX.Element {
  const hasSide = [x, y, t, b, s, e].some((side) => side !== undefined);
  const baseSize = size ?? (hasSide ? undefined : 'md');
  return (
    <div
      data-slot="inset"
      data-size={baseSize}
      data-x={x}
      data-y={y}
      data-t={t}
      data-b={b}
      data-s={s}
      data-e={e}
      className={cn('layout-inset', className)}
      {...props}
    />
  );
}

export { Inset };
export type { InsetProps, InsetSide, InsetSize };
