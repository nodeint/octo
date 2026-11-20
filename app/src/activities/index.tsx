import type { AppActivity } from '@workspace/ui';
import { LuFiles, LuNavigation, LuSearch, LuSettings } from 'react-icons/lu';

import { ExplorerView } from './explorer-view';
import { NavigationView } from './navigation-view';
import { SearchView } from './search-view';
import { SettingsView } from './settings-view';

export const activities: readonly AppActivity[] = [
  { id: 'navigation', title: 'Navigation', icon: <LuNavigation />, content: <NavigationView /> },
  { id: 'explorer', title: 'Explorer', icon: <LuFiles />, badge: 3, content: <ExplorerView /> },
  { id: 'search', title: 'Search', icon: <LuSearch />, content: <SearchView /> },
  { id: 'settings', title: 'Settings', icon: <LuSettings />, placement: 'bottom', content: <SettingsView /> },
];
