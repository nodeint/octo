/**
 * Paint of a static surface (badge): a tone (which colors) and an emphasis (how they are painted).
 * `variant` is a preset name for one approved pair. A caller passes `variant`, or `tone` with `emphasis`.
 * The CSS sets live in styles/variants/.
 */
type SurfaceTone = 'neutral' | 'primary' | 'destructive' | 'success' | 'warning' | 'info'
type SurfaceEmphasis = 'solid' | 'soft' | 'outline'

type SurfaceVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning'
  | 'info'

/** The only exposed tone and emphasis pairs. Outline paints a fixed border, so only the neutral tone has it. */
type SurfaceAxes =
  | { tone: SurfaceTone, emphasis: 'solid' | 'soft' }
  | { tone: 'neutral', emphasis: 'outline' }

type SurfacePaint =
  | { variant?: SurfaceVariant, tone?: never, emphasis?: never }
  | ({ variant?: never } & SurfaceAxes)

interface ResolvedSurfacePaint {
  tone: SurfaceTone
  emphasis: SurfaceEmphasis
}

const SURFACE_PRESETS: Record<SurfaceVariant, SurfaceAxes> = {
  default: { tone: 'primary', emphasis: 'solid' },
  secondary: { tone: 'neutral', emphasis: 'soft' },
  destructive: { tone: 'destructive', emphasis: 'soft' },
  outline: { tone: 'neutral', emphasis: 'outline' },
  success: { tone: 'success', emphasis: 'soft' },
  warning: { tone: 'warning', emphasis: 'soft' },
  info: { tone: 'info', emphasis: 'soft' },
};

/** Resolve a surface preset or axis pair; `fallback` is the component's default preset. */
function resolveSurfacePaint(
  { variant, tone, emphasis }: { variant?: SurfaceVariant, tone?: SurfaceTone, emphasis?: SurfaceEmphasis },
  fallback: SurfaceVariant,
): ResolvedSurfacePaint {
  if (tone !== undefined && emphasis !== undefined) {
    return { tone, emphasis };
  }
  return SURFACE_PRESETS[variant ?? fallback];
}

export { resolveSurfacePaint };
export type { ResolvedSurfacePaint, SurfaceAxes, SurfaceEmphasis, SurfacePaint, SurfaceTone, SurfaceVariant };
