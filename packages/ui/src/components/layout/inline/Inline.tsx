import { cn } from '../../../lib/utils';
import { Box, type BoxProps } from '../box/Box';

type InlineAlign = 'start' | 'center' | 'end';

type InlineProps = BoxProps & {
  /** Alignment of the children along the cross axis. Defaults to `center`. */
  align?: InlineAlign;
};

function Inline({ className, gap = 'sm', align, ...props }: InlineProps): React.JSX.Element {
  return (
    <Box
      data-slot="inline"
      data-inline-align={align}
      gap={gap}
      className={cn('layout-inline', className)}
      {...props}
    />
  );
}

export { Inline };
export type { InlineAlign, InlineProps };
