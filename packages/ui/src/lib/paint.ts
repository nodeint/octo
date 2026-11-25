import type { ActionEmphasis, ActionTone } from './action-paint';
import type { SurfaceEmphasis, SurfaceTone } from './surface-paint';

/**
 * Name of a paint: the value of `data-paint`, which picks one block in styles/variants/.
 * The name is `{tone}-{emphasis}` (`base-outline`, `blue-surface`). `field` stands alone: it has one emphasis.
 * The type allows every pair; the blocks that exist are the ones in styles/variants/, one file per tone.
 */
type PaintName = 'field' | `${ActionTone | SurfaceTone}-${ActionEmphasis | SurfaceEmphasis | 'surface'}`;

/** The `data-paint` value of the field paint. */
const FIELD_PAINT: PaintName = 'field';

/** Join a resolved tone and emphasis into the `data-paint` value. */
function paintName(paint: {
  tone: ActionTone | SurfaceTone
  emphasis: ActionEmphasis | SurfaceEmphasis | 'surface'
}): PaintName {
  return `${paint.tone}-${paint.emphasis}`;
}

export { FIELD_PAINT, paintName };
export type { PaintName };
