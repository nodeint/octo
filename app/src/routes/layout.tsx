import { AppShell } from '@workspace/ui';
import { Outlet } from 'react-router';

import { activities } from '../activities';

export default function Layout(): React.ReactElement {
  return (
    <AppShell title="Octo" activities={activities}>
      <Outlet />
    </AppShell>
  );
}
