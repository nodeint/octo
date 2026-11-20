import { cn } from '../../../lib/utils';

type MediaSize = 'md' | 'xl';
type MediaVariant = 'subtle' | 'plain';

function Media({
  className,
  size = 'md',
  variant = 'subtle',
  ...props
}: React.ComponentProps<'div'> & {
  /** md = a small mark beside text (default). xl = a hero mark that fills its box. */
  size?: MediaSize
  /** subtle = a tinted tile (default). plain = the mark alone in the primary color. */
  variant?: MediaVariant
}): React.JSX.Element {
  return (
    <div
      data-slot="media"
      data-size={size}
      data-variant={variant}
      className={cn('media', className)}
      {...props}
    />
  );
}

export { Media };
