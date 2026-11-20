/** One VS Code style activity: an icon in the activity bar plus the sidebar content it opens. */
export type AppActivity = {
  /** Stable across releases: the selected activity is saved by this id. */
  readonly id: string;
  /** The tooltip and the accessible name of the icon. */
  readonly title: string;
  readonly icon: React.ReactNode;
  /** A count shown on the icon; hidden when zero or absent. */
  readonly badge?: number;
  /** `bottom` groups the icon under a spacer, like Accounts and Settings in VS Code. */
  readonly placement?: 'top' | 'bottom';
  readonly content: React.ReactNode;
};
