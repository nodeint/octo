import { defineSlotRecipe, type SystemStyleObject } from '@chakra-ui/react';
import { slotRecipes } from '@chakra-ui/react/theme';

const floatingPanelBase = slotRecipes.floatingPanel.base;
const content = floatingPanelBase?.content;
if (!floatingPanelBase || !content) {
  throw new Error('Panel requires the base styles of Chakra FloatingPanel.');
}

// Docked regions are always present, so they do not need an opening animation.
const { _open: openingAnimation, ...contentStyles } = content;
const base: Record<'root' | 'header' | 'title' | 'actions' | 'body', SystemStyleObject> = {
  root: {
    ...contentStyles,
    h: 'full',
    minW: 'appShell.none',
    minH: 'appShell.none',
    border: 'sm',
    borderColor: 'border',
  },
  header: { ...floatingPanelBase.header },
  title: { ...floatingPanelBase.title, minW: 'appShell.none' },
  actions: { display: 'flex', alignItems: 'center', flex: 'none', gap: 'layout.gap.2xs' },
  body: { ...floatingPanelBase.body, minH: 'appShell.none' },
};

/** FloatingPanel's visual structure, adapted to a region inside the workspace. */
export const panelSlotRecipe = defineSlotRecipe({
  className: 'panel',
  slots: ['root', 'header', 'title', 'actions', 'body'],
  base,
});
