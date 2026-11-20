import { Tabs, useTabs } from '@chakra-ui/react';

type AppActivityProviderProps = {
  readonly activeId: string | null;
  readonly onSelect: (id: string | null) => void;
  readonly canCollapse: boolean;
  readonly children: React.ReactElement;
};

/** Shares tab state and accessible IDs across the activity bar and its sidebar panels. */
export function AppActivityProvider({
  activeId,
  onSelect,
  canCollapse,
  children,
}: AppActivityProviderProps): React.ReactElement {
  const tabs = useTabs({
    orientation: 'vertical',
    value: activeId,
    deselectable: canCollapse,
    onValueChange: ({ value }) => onSelect(value),
  });

  return (
    <Tabs.RootProvider  variant="subtle" value={tabs} lazyMount={false} unmountOnExit={false} asChild>
      {children}
    </Tabs.RootProvider>
  );
}
