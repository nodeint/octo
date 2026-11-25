import { cn } from '../../../lib/utils';
import { Box, type BoxProps } from '../box/Box';

const GRID_COLUMN_COUNTS = { two: 2, three: 3, four: 4, five: 5, six: 6 } as const;

type GridColumns = 1 | (typeof GRID_COLUMN_COUNTS)[keyof typeof GRID_COLUMN_COUNTS];

type GridResponsiveColumns = {
  base?: GridColumns;
  sm?: GridColumns;
  md?: GridColumns;
  lg?: GridColumns;
};

type GridProps = BoxProps & {
  /** Equal columns, or a count per breakpoint. */
  columns?: GridColumns | GridResponsiveColumns;
};

function Grid({ className, columns = 1, gap = 'sm', ...props }: GridProps): React.JSX.Element {
  const responsive: GridResponsiveColumns = typeof columns === 'number' ? { base: columns } : columns;
  return (
    <Box
      data-slot="grid"
      gap={gap}
      data-columns={responsive.base}
      data-columns-sm={responsive.sm}
      data-columns-md={responsive.md}
      data-columns-lg={responsive.lg}
      className={cn('layout-grid', className)}
      {...props}
    />
  );
}

export { Grid, GRID_COLUMN_COUNTS };
export type { GridColumns, GridProps, GridResponsiveColumns };
