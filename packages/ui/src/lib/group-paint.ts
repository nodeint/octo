/**
 * Paint of a group: a group's `variant` is a preset name for one paint.
 * The group root carries `data-paint`, and styles/recipes/group.css hands the resulting
 * --variant-* slots to the actions and fields inside as --group-*. The CSS sets live in styles/variants/.
 */
import { FIELD_PAINT, type PaintName } from './paint';

type GroupVariant = 'outline' | 'secondary' | 'ghost'
type GroupFieldVariant = GroupVariant | 'field'

const GROUP_PRESETS: Record<GroupFieldVariant, PaintName> = {
  outline: 'base-outline',
  secondary: 'base-soft',
  ghost: 'base-ghost',
  field: FIELD_PAINT,
};

/** Resolve a group variant preset to the `data-paint` value its root carries. */
function resolveGroupPaint(variant: GroupFieldVariant): PaintName {
  return GROUP_PRESETS[variant];
}

export { resolveGroupPaint };
export type { GroupFieldVariant, GroupVariant };
