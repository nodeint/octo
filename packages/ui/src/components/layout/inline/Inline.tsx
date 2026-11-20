import { cn } from '../../../lib/utils';
import { Box, type BoxProps } from '../box/Box';

type LayoutGap = 'tight' | 'related' | 'group' | 'section';

type InlineProps = BoxProps & {
  /** The gap role between children. */
  gap?: LayoutGap;
};

function Inline({ className, gap = 'related', ...props }: InlineProps): React.JSX.Element {
  return (
    <Box
      data-slot="inline"
      data-gap={gap}
      className={cn('layout-inline', className)}
      {...props}
    />
  );
}

export { Inline };
export type { InlineProps, LayoutGap };
