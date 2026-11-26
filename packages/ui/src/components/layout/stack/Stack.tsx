import { cn } from '../../../lib/utils';
import { Box, type BoxProps } from '../box/Box';

type StackAlign = 'start' | 'center' | 'end';

type StackProps = BoxProps & {
  /** Alignment of the children along the cross axis. Defaults to `stretch`. */
  align?: StackAlign;
};

function Stack({ className, gap = 'sm', align, ...props }: StackProps): React.JSX.Element {
  return (
    <Box
      data-slot="stack"
      data-stack-align={align}
      gap={gap}
      className={cn('stack', className)}
      {...props}
    />
  );
}

export { Stack };
export type { StackAlign, StackProps };
