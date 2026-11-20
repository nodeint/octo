import { cn } from '../../../lib/utils';

type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type SkeletonProps = React.ComponentProps<'div'> & {
  /** A full-width block as tall as a control of this size. Omitted, the block takes the height its parent gives it. */
  size?: SkeletonSize
}

function Skeleton({ className, size, ...props }: SkeletonProps): React.JSX.Element {
  return (
    <div
      data-slot="skeleton"
      data-size={size}
      className={cn('skeleton', className)}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonSize };
