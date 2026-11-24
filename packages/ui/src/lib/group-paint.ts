/**
 * Paint of a group: a group's `variant` is a preset name for one tone and emphasis pair.
 * The group root carries `data-tone` and `data-emphasis`, and styles/recipes/group.css hands the resulting
 * --variant-* slots to the actions and fields inside as --group-*. The CSS sets live in styles/variants/.
 */
type GroupVariant = 'outline' | 'secondary' | 'ghost'
type GroupFieldVariant = GroupVariant | 'field'

interface GroupPaint {
  tone: 'base' | 'field'
  emphasis: 'soft' | 'outline' | 'ghost' | 'field'
}

const GROUP_PRESETS: Record<GroupFieldVariant, GroupPaint> = {
  outline: { tone: 'base', emphasis: 'outline' },
  secondary: { tone: 'base', emphasis: 'soft' },
  ghost: { tone: 'base', emphasis: 'ghost' },
  field: { tone: 'field', emphasis: 'field' },
};

/** Resolve a group variant preset to the tone and emphasis its root carries. */
function resolveGroupPaint(variant: GroupFieldVariant): GroupPaint {
  return GROUP_PRESETS[variant];
}

export { resolveGroupPaint };
export type { GroupFieldVariant, GroupVariant };
