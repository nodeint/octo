import { useState } from 'react';

import { AppHeader } from './app-header';
import { AppMain } from './app-main';
import { AppSidebar } from './app-sidebar';

export type AppShellProps = {
  readonly title: string;
  /** Receives a callback that closes the mobile drawer; call it when the user navigates. */
  readonly renderNavigation: (onNavigate?: () => void) => React.ReactNode;
  readonly children: React.ReactNode;
};

export function AppShell({ title, renderNavigation, children }: AppShellProps): React.ReactElement {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <AppHeader title={title} onOpenSidebar={() => setIsSidebarOpen(true)} />
      <AppSidebar
        title={title}
        isOpen={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        renderNavigation={renderNavigation}
      />
      <AppMain>{children}</AppMain>
    </>
  );
}
