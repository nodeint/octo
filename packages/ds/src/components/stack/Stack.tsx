import { cn } from '../../lib/utils';
import { Box, type BoxProps } from '../box/Box';

type StackAlign = 'start' | 'center' | 'end';
type StackOrientation = 'vertical' | 'horizontal';

type StackProps = BoxProps & {
  /** The axis the children run along. Defaults to `vertical`. */
  orientation?: StackOrientation;
  /**
   * Alignment of the children along the cross axis. Defaults to `stretch` when vertical, `center` when
   * horizontal. */
  align?: StackAlign;
  /** Lets children wrap onto the next line when they do not fit. Defaults to `false`. */
  wrap?: boolean;
};

function Stack(
  { className, gap = 'sm', orientation = 'vertical', align, wrap, ...props }: StackProps,
): React.JSX.Element {
  return (
    <Box
      data-slot="stack"
      data-orientation={orientation}
      data-stack-align={align}
      data-stack-wrap={wrap ? '' : undefined}
      gap={gap}
      className={cn('stack', className)}
      {...props}
    />
  );
}

export { Stack };
export type { StackAlign, StackOrientation, StackProps };
