import { cn } from '../../../lib/utils';
import { Box, type BoxProps } from '../box/Box';

type InlineProps = BoxProps;

function Inline({ className, gap = 'sm', ...props }: InlineProps): React.JSX.Element {
  return (
    <Box
      data-slot="inline"
      gap={gap}
      className={cn('layout-inline', className)}
      {...props}
    />
  );
}

export { Inline };
export type { InlineProps };
