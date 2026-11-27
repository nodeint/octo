import { paintName, resolveSurfacePaint, type SurfacePaint, type SurfaceVariant } from '@workspace/ds';

import { cn } from '../../../lib/utils';

type MediaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fill';
type MediaVariant = SurfaceVariant
/** What the media holds: `image` fills the step and clips its img; `default` hugs its content. */
type MediaRatio = '1:1' | '4:3' | '3:4' | '16:9' | '9:16'
type MediaKind = 'default' | 'image'

type MediaProps = React.ComponentProps<'div'> & SurfacePaint & {
  /**
   * xs to lg = a mark beside text. Without a size the media takes the step its parent hands down.
   * xl = a hero mark that fills its box. fill = as wide as its container and square.
   */
  size?: MediaSize
  kind?: MediaKind
  /** Width to height. Anything but 1:1 keeps the step as the width and lets the height follow. */
  ratio?: MediaRatio
}

function Media({
  className,
  size = 'md',
  kind,
  ratio = '1:1',
  variant,
  tone,
  emphasis,
  ...props
}: MediaProps): React.JSX.Element {
  const paint = resolveSurfacePaint({ variant, tone, emphasis }, 'secondary');
  return (
    <div
      data-slot="media"
      data-media-size={size}
      data-media-kind={kind}
      data-media-ratio={ratio}
      data-paint={paintName(paint)}
      className={cn('media', className)}
      {...props}
    />
  );
}

export { Media };
export type { MediaKind, MediaProps, MediaRatio, MediaSize, MediaVariant };
