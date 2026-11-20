import type { LayoutStorage } from 'react-resizable-panels';

/** `localStorage` does not exist during server rendering, so reads and writes become no-ops there. */
export const layoutStorage: LayoutStorage = {
  getItem: (key) => (typeof window === 'undefined' ? null : window.localStorage.getItem(key)),
  setItem: (key, value) => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(key, value);
  },
};
