/**
 * Every user-facing string of the package. Strings that depend on a value are functions, so a
 * translation can reorder words. Swap this object (or its leaves) to localize.
 */
export const messages = {
  colorMode: {
    switchToLight: 'Switch to light theme',
    switchToDark: 'Switch to dark theme',
  },
  layout: {
    activityBar: 'Activity bar',
    leftSidebar: 'Primary sidebar',
    openNavigation: 'Open navigation menu',
    closeNavigation: 'Close navigation menu',
  },
  rightSidebar: {
    /** Used when the app does not name the sidebar; most apps put their assistant chat here. */
    defaultTitle: 'Chat',
    open: (title: string): string => `Open ${title}`,
    close: (title: string): string => `Close ${title}`,
    popOut: (title: string): string => `Pop ${title} out as a floating window`,
  },
  floatingPanel: {
    moreActions: 'More actions',
    resetRect: 'Reset position and size',
    dock: 'Dock to the right side',
    maximize: 'Maximize',
    restore: 'Restore previous size',
  },
} as const;
