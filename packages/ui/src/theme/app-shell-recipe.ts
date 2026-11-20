import { defineSlotRecipe } from '@chakra-ui/react';

/** Every visual decision of the app shell lives here so the look changes in one place. */
export const appShellSlotRecipe = defineSlotRecipe({
  className: 'app-shell',
  slots: [
    'root',
    'header',
    'content',
    'workspace',
    'block',
    'activityBar',
    'sidebarBody',
    'resizeHandle',
    'toolbar',
    'toolbarTitle',
    'launcher',
  ],
  base: {
    root: { display: 'flex', flexDirection: 'column', h: '100vh', overflow: 'hidden', bg: 'bg.muted' },
    header: { flex: 'none', display: 'flex', alignItems: 'center', gap: '3', h: '14', px: '4' },
    content: { flex: '1', minH: '0', px: '1.5', pb: '1.5' },
    workspace: { flex: '1', minW: '0', h: 'full' },
    block: { h: 'full', bg: 'bg', borderWidth: '1px', borderRadius: 'lg', overflow: 'auto' },
    activityBar: { flex: 'none', w: '12', h: 'full', bg: 'bg.subtle', overflowY: 'auto' },
    sidebarBody: { flex: '1', minW: '0', p: '3', overflow: 'auto' },
    // A transparent gap between two blocks; a centered line shows on hover and while dragging.
    resizeHandle: {
      flex: 'none',
      w: '1.5',
      position: 'relative',
      _after: {
        content: '""',
        position: 'absolute',
        insetY: '0',
        left: '50%',
        w: '2px',
        transform: 'translateX(-50%)',
        bg: 'transparent',
        transition: 'background 0.1s',
      },
      _hover: { _after: { bg: 'colorPalette.solid' } },
      '&[data-separator="active"]': { _after: { bg: 'colorPalette.solid' } },
    },
    toolbar: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '1',
      px: '3',
      py: '1.5',
      borderBottomWidth: '1px',
    },
    toolbarTitle: { flex: '1', minW: '0', truncate: true, fontWeight: 'semibold', textStyle: 'sm' },
    launcher: { position: 'fixed', right: '4', bottom: '4', zIndex: 'overlay', rounded: 'full', shadow: 'lg' },
  },
});
