/**
 * Name of a paint: the value of `data-paint`, which picks one block in styles/variants/.
 * The name is `{tone}-{emphasis}` (`base-outline`, `blue-surface`). `field` stands alone: it has one emphasis.
 */
type PaintName = 'field';

/** The `data-paint` value of the field paint. Later phases widen `PaintName` with the other names. */
const FIELD_PAINT: PaintName = 'field';

export { FIELD_PAINT };
export type { PaintName };
