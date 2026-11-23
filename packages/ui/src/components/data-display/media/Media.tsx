import { cn } from '../../../lib/utils';

type MediaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type MediaVariant = 'subtle' | 'plain';

function Media({
  className,
  size = 'md',
  variant = 'subtle',
  ...props
}: React.ComponentProps<'div'> & {
  /** xs to lg = a mark beside text, md is the default. xl = a hero mark that fills its box. */
  size?: MediaSize
  /** subtle = a tinted tile (default). plain = the mark alone in the primary color. */
  variant?: MediaVariant
}): React.JSX.Element {
  return (
    <div
      data-slot="media"
      data-size={size}
      data-media-size={size}
      data-variant={variant}
      className={cn('media-frame media', className)}
      {...props}
    />
  );
}

export { Media };
