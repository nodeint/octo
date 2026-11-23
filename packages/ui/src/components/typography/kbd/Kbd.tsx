import { cn } from '../../../lib/utils';

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>): React.JSX.Element {
  return (
    <kbd
      data-slot="kbd"
      className={cn('chip', 'kbd', className)}
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn('kbd-group', className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
