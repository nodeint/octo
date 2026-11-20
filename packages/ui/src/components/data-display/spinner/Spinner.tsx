import { cn } from '../../../lib/utils';
import { Icon } from '../../typography/icon/Icon';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>): React.JSX.Element {
  return (
    <Icon
      name="loader-2"
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn('spinner', className)}
      {...props}
    />
  );
}

export { Spinner };
