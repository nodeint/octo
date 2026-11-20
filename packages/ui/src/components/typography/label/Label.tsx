import { cn } from '../../../lib/utils';

function Label({ className, ...props }: React.ComponentProps<'label'>): React.JSX.Element {
  return (
    <label
      data-slot="label"
      className={cn('label', className)}
      {...props}
    />
  );
}

export { Label };
