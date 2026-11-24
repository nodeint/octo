import { resolveSurfacePaint, type SurfacePaint, type SurfaceVariant } from '../../../lib/surface-paint';
import { cn } from '../../../lib/utils';

type MediaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type MediaVariant = SurfaceVariant

type MediaProps = React.ComponentProps<'div'> & SurfacePaint & {
  /** xs to lg = a mark beside text, md is the default. xl = a hero mark that fills its box. */
  size?: MediaSize
}

function Media({
  className,
  size = 'md',
  variant,
  tone,
  emphasis,
  ...props
}: MediaProps): React.JSX.Element {
  const paint = resolveSurfacePaint({ variant, tone, emphasis }, 'secondary');
  return (
    <div
      data-slot="media"
      data-size={size}
      data-media-size={size}
      data-tone={paint.tone}
      data-emphasis={paint.emphasis}
      className={cn('media-frame media', className)}
      {...props}
    />
  );
}

export { Media };
export type { MediaProps, MediaSize, MediaVariant };
