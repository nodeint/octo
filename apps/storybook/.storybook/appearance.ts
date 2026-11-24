/** The default option removes the `data-appearance-*` attribute. */
export const DEFAULT_OPTION = 'default';

export type AppearanceAxis = {
  /** Storybook global that holds the selected value. */
  readonly key: string;
  readonly label: string;
  /** Property on `document.documentElement.dataset`; `null` for the theme, which is a class. */
  readonly dataset: string | null;
  readonly options: readonly string[];
};

export const APPEARANCE_AXES = [
  { key: 'theme', label: 'Theme', dataset: null, options: ['light', 'dark'] },
  {
    key: 'primary',
    label: 'Primary',
    dataset: 'appearancePrimary',
    options: [
      DEFAULT_OPTION, 'teal', 'blue', 'indigo', 'violet', 'purple', 'rose',
      'pink', 'orange', 'green', 'emerald', 'cyan', 'sky',
    ],
  },
  {
    key: 'base',
    label: 'Base',
    dataset: 'appearanceBase',
    options: [
      DEFAULT_OPTION, 'slate', 'gray', 'neutral', 'zinc', 'stone', 'mauve', 'olive', 'mist', 'taupe',
    ],
  },
  {
    key: 'font',
    label: 'Font',
    dataset: 'appearanceFont',
    options: [DEFAULT_OPTION, 'system-ui', 'georgia', 'menlo'],
  },
  {
    key: 'glass',
    label: 'Glass',
    dataset: 'appearanceGlass',
    options: [DEFAULT_OPTION, 'soft', 'strong', 'off'],
  },
] as const satisfies readonly AppearanceAxis[];

export const INITIAL_APPEARANCE: Readonly<Record<string, string>> = {
  theme: 'light',
  primary: DEFAULT_OPTION,
  base: DEFAULT_OPTION,
  font: DEFAULT_OPTION,
  glass: DEFAULT_OPTION,
};
