/**
 * Paint of an action control: a tone (which colors) and an emphasis (how they are painted).
 * `variant` is a preset name for one approved pair. A caller passes `variant`, or `tone` with `emphasis`.
 * The CSS sets live in styles/variants/.
 */
type ActionTone = 'base' | 'primary' | 'destructive'
type ActionEmphasis = 'solid' | 'soft' | 'outline' | 'ghost' | 'link' | 'muted'

type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'muted'
  | 'destructive'
  | 'link'
type ToggleVariant = 'ghost' | 'outline'
type ToggleEmphasis = ToggleVariant

/** The only exposed tone and emphasis pairs. */
type ButtonAxes =
  | { tone: 'primary', emphasis: 'solid' | 'link' }
  | { tone: 'base', emphasis: 'soft' | 'outline' | 'ghost' | 'muted' }
  | { tone: 'destructive', emphasis: 'soft' }

type ButtonPaint =
  | { variant?: ButtonVariant, tone?: never, emphasis?: never }
  | ({ variant?: never } & ButtonAxes)

type TogglePaint =
  | { variant?: ToggleVariant, emphasis?: never }
  | { variant?: never, emphasis: ToggleEmphasis }

interface LoosePaint {
  variant?: ButtonVariant
  tone?: ActionTone
  emphasis?: ActionEmphasis
}

interface ResolvedPaint {
  tone: ActionTone
  emphasis: ActionEmphasis
}

const BUTTON_PRESETS: Record<ButtonVariant, ButtonAxes> = {
  default: { tone: 'primary', emphasis: 'solid' },
  secondary: { tone: 'base', emphasis: 'soft' },
  outline: { tone: 'base', emphasis: 'outline' },
  ghost: { tone: 'base', emphasis: 'ghost' },
  muted: { tone: 'base', emphasis: 'muted' },
  destructive: { tone: 'destructive', emphasis: 'soft' },
  link: { tone: 'primary', emphasis: 'link' },
};

/** Resolve a button preset or axis pair; `fallback` is the component's default preset. */
function resolveButtonPaint(
  { variant, tone, emphasis }: { variant?: ButtonVariant, tone?: ActionTone, emphasis?: ActionEmphasis },
  fallback: ButtonVariant,
): ResolvedPaint {
  if (tone !== undefined && emphasis !== undefined) {
    return { tone, emphasis };
  }
  return BUTTON_PRESETS[variant ?? fallback];
}

/** Resolve a toggle preset or emphasis; tone is always base. */
function resolveTogglePaint(
  { variant, emphasis }: { variant?: ToggleVariant, emphasis?: ToggleEmphasis },
  fallback: ToggleVariant,
): ResolvedPaint {
  return { tone: 'base', emphasis: emphasis ?? variant ?? fallback };
}

/** Apply a forwarder's default preset unless the caller chose a preset or an axis pair. */
function withDefaultVariant<P extends { variant?: ButtonVariant, tone?: ActionTone }>(
  props: P,
  fallback: ButtonVariant,
): P {
  return props.tone === undefined ? { ...props, variant: props.variant ?? fallback } : props;
}

function hasAxes(paint: LoosePaint): paint is ButtonAxes & { variant?: undefined } {
  return paint.tone !== undefined && paint.emphasis !== undefined;
}

/** Narrow loose destructured paint props back to the exclusive preset-or-axes type. */
function toButtonPaint(paint: LoosePaint, fallback: ButtonVariant): ButtonPaint {
  return hasAxes(paint) ? paint : { variant: paint.variant ?? fallback };
}

/** Omit that keeps each member of a union, so the preset or axes choice survives. */
type OmitFromUnion<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export { resolveButtonPaint, resolveTogglePaint, toButtonPaint, withDefaultVariant };
export type {
  ActionEmphasis,
  ActionTone,
  ButtonPaint,
  ButtonVariant,
  OmitFromUnion,
  ToggleEmphasis,
  TogglePaint,
  ToggleVariant,
};
