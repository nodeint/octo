import { AppShell } from '@workspace/ui';
import { Outlet } from 'react-router';

import { AppNav } from '../layout/app-nav';

export default function Layout(): React.ReactElement {
  return (
    <AppShell title="Octo" leftSidebar={<AppNav />}>
      <Outlet />
    </AppShell>
  );
}
