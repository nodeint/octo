/**
 * Paint of a static surface (badge): a tone (which colors) and an emphasis (how they are painted).
 * `variant` is a preset name for one approved pair. A caller passes `variant`, or `tone` with `emphasis`.
 * The CSS sets live in styles/variants/.
 */
type SwatchTone =
  | 'orange'
  | 'yellow'
  | 'lime'
  | 'emerald'
  | 'cyan'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose'
  | 'slate'
  | 'gray'
  | 'neutral'
  | 'zinc'
  | 'stone'
  | 'mauve'
  | 'olive'
  | 'mist'
  | 'taupe'
type SurfaceTone = 'base' | 'primary' | 'destructive' | 'success' | 'warning' | 'info' | SwatchTone
type SurfaceEmphasis = 'solid' | 'soft' | 'plain' | 'plain-subtle' | 'outline'

type SurfaceVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'plain'
  | 'subtle'
  | 'success'
  | 'warning'
  | 'info'

/** The exposed tone and emphasis pairs: every emphasis takes every tone. */
type SurfaceAxes = { tone: SurfaceTone, emphasis: SurfaceEmphasis }

type SurfacePaint =
  | { variant?: SurfaceVariant, tone?: never, emphasis?: never }
  | ({ variant?: never } & SurfaceAxes)

interface ResolvedSurfacePaint {
  tone: SurfaceTone
  emphasis: SurfaceEmphasis
}

const SURFACE_PRESETS: Record<SurfaceVariant, SurfaceAxes> = {
  default: { tone: 'primary', emphasis: 'solid' },
  secondary: { tone: 'base', emphasis: 'soft' },
  destructive: { tone: 'destructive', emphasis: 'soft' },
  outline: { tone: 'base', emphasis: 'outline' },
  plain: { tone: 'base', emphasis: 'plain' },
  subtle: { tone: 'base', emphasis: 'plain-subtle' },
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
export type {
  SurfaceAxes,
  SurfaceEmphasis,
  SurfacePaint,
  SurfaceTone,
  SurfaceVariant,
  SwatchTone,
};
