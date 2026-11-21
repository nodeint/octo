import { cn } from '../../../lib/utils';
import { Box, type BoxProps } from '../box/Box';

type StackProps = BoxProps;

function Stack({ className, gap = 'sm', ...props }: StackProps): React.JSX.Element {
  return (
    <Box
      data-slot="stack"
      gap={gap}
      className={cn('layout-stack', className)}
      {...props}
    />
  );
}

export { Stack };
export type { StackProps };
