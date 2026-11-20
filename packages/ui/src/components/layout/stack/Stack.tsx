import { cn } from '../../../lib/utils';
import { Box, type BoxProps } from '../box/Box';
import type { LayoutGap } from '../inline/Inline';

type StackProps = BoxProps & {
  /** The gap role between children. */
  gap?: LayoutGap;
};

function Stack({ className, gap = 'related', ...props }: StackProps): React.JSX.Element {
  return (
    <Box
      data-slot="stack"
      data-gap={gap}
      className={cn('layout-stack', className)}
      {...props}
    />
  );
}

export { Stack };
export type { StackProps };
